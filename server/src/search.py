from flask import Flask, jsonify
import googleapiclient.discovery
from flask_cors import CORS 
from youtube_transcript_api import YouTubeTranscriptApi
import json
import tiktoken
import openai
import time

# Your existing classes remain unchanged

class YouTubeSearcher:
    def __init__(self, api_key):
        self.api_key = api_key
        self.youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=self.api_key)

    @staticmethod
    def search_youtube(api_key, query):
        youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=api_key)
        page_token = None

        while True:
            request = youtube.search().list(
                part="snippet",
                q=query,
                order="relevance",
                maxResults=5,
                type="video",
                videoDuration="long",
                pageToken=page_token
            )
            response = request.execute()

            if 'items' in response and len(response['items']) > 0:
                video_ids = [item['id']['videoId'] for item in response['items'] if 'videoId' in item['id']]
                for video_id in video_ids:
                    video_details = YouTubeSearcher.get_video_details(api_key, video_id)
                    if video_details and YouTubeSearcher.is_duration_less_than_three_hours(video_details['contentDetails']['duration']):
                        return video_details
                page_token = response.get('nextPageToken')
                if not page_token:
                    break
            else:
                break

        return None

    @staticmethod
    def get_video_details(api_key, video_id):
        youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=api_key)
        request = youtube.videos().list(
            part="snippet,contentDetails,statistics",
            id=video_id
        )
        response = request.execute()
        if 'items' in response and len(response['items']) > 0:
            return response['items'][0]
        else:
            return None

    @staticmethod
    def is_duration_less_than_three_hours(duration):
        hours = 0
        minutes = 0
        if "H" in duration:
            hours = int(duration[2:duration.index("H")])
        if "M" in duration:
            minutes = int(duration[duration.index("H")+1:duration.index("M")]) if "H" in duration else int(duration[2:duration.index("M")])
        total_minutes = hours * 60 + minutes
        return total_minutes < 180

class TranscriptProcessor:
    def __init__(self):
        self.encoding = tiktoken.encoding_for_model('gpt-4')

    @staticmethod
    def transform_data(original_data):
        new_data = [{key: value for key, value in entry.items() if key != 'duration'} for entry in original_data]
        return new_data

    def chunk_data(self, data, max_tokens=3500):  # Use `self.encoding` instead of undefined `encoding`
        tokens = self.encoding.encode(data)  # Correctly reference `self.encoding`
        chunks = []
        current_chunk = []
        for token in tokens:
            current_chunk.append(token)
            if len(current_chunk) >= max_tokens:
                chunks.append(self.encoding.decode(current_chunk))  # Use `self.encoding` to decode
                current_chunk = []
        if current_chunk:
            chunks.append(self.encoding.decode(current_chunk))
        return chunks

class OpenAIChat:
    def __init__(self, api_key):
        self.api_key = api_key
        openai.api_key = "sk-P-EbMoJJya9WUW9g4nhqXIJqgcTYf4vGafVZyWpuvkT3BlbkFJj3nErDunQszFVx5Gw5ymHWgdSOVl-LeBeU7bcgu_cA"
        self.conversation_history = []

    def chat_with_openai(self, user_input):
        self.conversation_history.append({"role": "user", "content": user_input})
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=self.conversation_history,
            max_tokens=2000
        )
        assistant_reply = response['choices'][0]['message']['content']
        self.conversation_history.append({"role": "assistant", "content": assistant_reply})
        return assistant_reply

# Create Flask app
app = Flask(__name__)
cors = CORS(app, origins=['*'])

@app.route('/getMetaData/<query>', methods=['GET'])
def getMetadata(query):
    youtube_api_key = "AIzaSyA7cxyNkxnmK7kEmz81mGT87VPUTkAY25U"
    query = query
    
    # Step 1: Search for YouTube video
    first_video = YouTubeSearcher.search_youtube(youtube_api_key, query)
    
    if first_video:
        video_id = first_video['id']
        
        # Step 2: Fetch transcript using video ID
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        
        # Step 3: Transform and process the transcript
        transformed_data = TranscriptProcessor.transform_data(transcript)
        json_output = json.dumps(transformed_data)
        
        # Step 4: Chunk data if necessary
        transcript_processor = TranscriptProcessor()  # Create an instance
        chunks = transcript_processor.chunk_data(json_output) 
        
        # Example conversation
    user_input = f"The total length of the content that I want to send you is too large to send in only one piece.For sending you that content, I will follow this rule:[START PART 1/{len(chunks)}]this is the content of the part 1 out of {len(chunks)} in total[END PART 1/{len(chunks)}]Then you just answer: \"Received part 1/{len(chunks)}\"And when I tell you \"ALL PARTS SENT\", then you can continue processing the data and answering my requests. The data I am going to send is the transcript of a educational youtube video with the timestamp in seconds."
    reply = OpenAIChat.chat_with_openai(user_input)
    print("Assistant:", reply)

    for i in range(len(chunks)):
        user_input = f"[START PART {i+1}/{len(chunks)}]{chunks[i]}[END PART {i+1}/{len(chunks)}]"
        
        while True:  # Loop until the chunk is successfully processed
            try:
                # Call the OpenAI API
                reply = OpenAIChat.chat_with_openai(user_input)
                print("Assistant:", reply)
                break  # If successful, break out of the loop
            except openai.error.RateLimitError:
                # Handle RateLimitError by waiting and retrying
                print(f"Rate limit exceeded. Waiting 1 second before retrying chunk {i+1}.")
                time.sleep(1)  # Wait for 1 second before retrying

            user_input = f"ALL PARTS SENT"
            reply = OpenAIChat.chat_with_openai(user_input)


            json_string = '{"titles":[{"title":"Title 1","timestamp":"Time in seconds for the start of section","flashcards":[{"term":"Term 1.1","definition":"Definition of term 1.1"},{"term":"Term 1.2","definition":"Definition of term 1.2"}],"multiple_choice":{"question":"Question 1 for Title 1","choices":["Choice A","Choice B","Choice C","Choice D"],"answer":"Choice A"}},{"title":"Title 2","timestamp":"Time in seconds for the start of section","flashcards":[{"term":"Term 2.1","definition":"Definition of term 2.1"},{"term":"Term 2.2","definition":"Definition of term 2.2"},{"term":"Term 2.3","definition":"Definition of term 2.3"}],"multiple_choice":{"question":"Question 1 for Title 2","choices":["Choice A","Choice B","Choice C","Choice D"],"answer":"Choice A"}},{"title":"Title 3","timestamp":"Time in seconds for the start of section","flashcards":[{"term":"Term 3.1","definition":"Definition of term 3.1"}],"multiple_choice":{"question":"Question 1 for Title 3","choices":["Choice A","Choice B","Choice C","Choice D"],"answer":"Choice A"}}]}'


            user_input = f"Based on the data I have just provided, please identify and extract key sections from this video transcript. For each section, provide clear, descriptive titles along with precise timestamps (start and end times). Ensure that all relevant portions of the video are covered without skipping over significant content, and structure the sections logically for ease of navigation. Return only a title and its timestamps. Also for each sections provide 3 flashcards on the most important terms and 1 multiple choice question per title with 4 choices that are derrived from the transcipt provided. Follow this json format for the output {json_string} and return only the json"
            reply = OpenAIChat.chat_with_openai(user_input)
            
            
        # Step 5: Send the JSON response with transcript chunks
        return jsonify({
            "videoId": video_id,
            "json": reply
        })
    else:
        print("first video", first_video)
        return jsonify({"error": "No video found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
