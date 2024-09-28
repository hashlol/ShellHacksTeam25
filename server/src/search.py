import googleapiclient.discovery
from youtube_transcript_api import YouTubeTranscriptApi
import json
import tiktoken
import openai
import time
encoding = tiktoken.encoding_for_model('gpt-4')



class YouTubeSearcher:
    def __init__(self, api_key):
        self.api_key = api_key
        self.youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=self.api_key)

    def search_youtube(api_key, query):

        youtube = googleapiclient.discovery.build("youtube", "v3", developerKey=api_key)

        page_token = None

        while True:
            request = youtube.search().list(
                part="snippet",
                q=query,
                order="relevance",
                maxResults=5,  # Retrieve 20 results at a time
                type="video",    # Specify that we want video results
                videoDuration="long",
                pageToken=page_token
            )

            response = request.execute()

            if 'items' in response and len(response['items']) > 0:
                video_ids = [item['id']['videoId'] for item in response['items'] if 'videoId' in item['id']]
                for video_id in video_ids:
                    video_details = YouTubeSearcher.get_video_details(api_key, video_id)
                    if video_details and YouTubeSearcher.is_duration_less_than_three_hours(video_details['contentDetails']['duration']):
                        return video_details  # Return the first valid video found
                page_token = response.get('nextPageToken')  # Get the next page token
                if not page_token:  # Exit the loop if no more pages are available
                    break
            else:
                break  # Exit if no items are found

        return None  # No valid video found

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

    def is_duration_less_than_three_hours(duration):
        # Duration is in ISO 8601 format (e.g., PT1H30M)
        hours = 0
        minutes = 0

        # Extract hours and minutes from the duration
        if "H" in duration:
            hours = int(duration[2:duration.index("H")])
        if "M" in duration:
            minutes = int(duration[duration.index("H")+1:duration.index("M")]) if "H" in duration else int(duration[2:duration.index("M")])

        total_minutes = hours * 60 + minutes  # Convert total duration to minutes
        return total_minutes < 60  # Check if less than 180 minutes (3 hours)


class TranscriptProcessor:
    def __init__(self):
        self.encoding = tiktoken.encoding_for_model('gpt-4')

    def transform_data(original_data):
        # Removing 'duration' field from each dictionary
        new_data = [{key: value for key, value in entry.items() if key != 'duration'} for entry in original_data]
        return new_data

    def chunk_data(data, max_tokens=3500):  # Adjust to leave tokens for the prompt
        tokens = encoding.encode(data)
        chunks = []
        current_chunk = []

        for token in tokens:
            current_chunk.append(token)
            if len(current_chunk) >= max_tokens:
                chunks.append(encoding.decode(current_chunk))
                current_chunk = []

        # Add any remaining tokens as a final chunk
        if current_chunk:
            chunks.append(encoding.decode(current_chunk))

        return chunks
    
class OpenAIChat:
    def __init__(self, api_key):
        self.api_key = api_key
        openai.api_key = self.api_key
        self.conversation_history = []   
        
    def chat_with_openai(user_input):
        # Append user input to the conversation history
        conversation_history.append({"role": "user", "content": user_input})
        
        # Create a request with the full conversation history
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=conversation_history,
            max_tokens=2000  # Adjust as needed
        )
        
        # Get the model's reply
        assistant_reply = response['choices'][0]['message']['content']
        
        # Append the assistant's reply to the conversation history
        conversation_history.append({"role": "assistant", "content": assistant_reply})
        
        return assistant_reply



if __name__ == "__main__":
    youtube_api_key ="INSERT KEY"  # Replace with your actual API key
    query = "Linked List"  # Replace with your search term
    OpenAI = OpenAIChat('INSERT KEY')


    # Continuously search for a valid video less than 3 hours long


    first_video = YouTubeSearcher.search_youtube(youtube_api_key,query)
    
    
    if first_video:
        #print("First Video Title:", first_video['snippet']['title'])
        #print("Video ID:", first_video['id'])
        result = first_video['id']
        #print("Channel Title:", first_video['snippet']['channelTitle'])
        #print("Published At:", first_video['snippet']['publishedAt'])
        
        # Get the duration
        #duration = first_video['contentDetails']['duration']
        #print("Duration (ISO 8601):", duration)

        # Additional metadata
        #print("View Count:", first_video['statistics']['viewCount'] if 'statistics' in first_video else "N/A")
        #print("Like Count:", first_video['statistics']['likeCount'] if 'statistics' in first_video else "N/A")
    else:
        print("No video found that is less than 3 hours long.")

    transcript = YouTubeTranscriptApi.get_transcript(result)

    transformed_data = TranscriptProcessor.transform_data(transcript)

    json_output = json.dumps(transformed_data)
    

    chunks = TranscriptProcessor.chunk_data(json_output)

    conversation_history = []


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
    print("Assistant:", reply)


    json_string = '{"titles":[{"title":"Title 1","timestamp":"Time in seconds for the start of section","flashcards":[{"term":"Term 1.1","definition":"Definition of term 1.1"},{"term":"Term 1.2","definition":"Definition of term 1.2"}],"multiple_choice":{"question":"Question 1 for Title 1","choices":["Choice A","Choice B","Choice C","Choice D"],"answer":"Choice A"}},{"title":"Title 2","timestamp":"Time in seconds for the start of section","flashcards":[{"term":"Term 2.1","definition":"Definition of term 2.1"},{"term":"Term 2.2","definition":"Definition of term 2.2"},{"term":"Term 2.3","definition":"Definition of term 2.3"}],"multiple_choice":{"question":"Question 1 for Title 2","choices":["Choice A","Choice B","Choice C","Choice D"],"answer":"Choice A"}},{"title":"Title 3","timestamp":"Time in seconds for the start of section","flashcards":[{"term":"Term 3.1","definition":"Definition of term 3.1"}],"multiple_choice":{"question":"Question 1 for Title 3","choices":["Choice A","Choice B","Choice C","Choice D"],"answer":"Choice A"}}]}'


    user_input = f"Based on the data I have just provided, please identify and extract key sections from this video transcript. For each section, provide clear, descriptive titles along with precise timestamps (start and end times). Ensure that all relevant portions of the video are covered without skipping over significant content, and structure the sections logically for ease of navigation. Return only a title and its timestamps. Also for each sections provide 3 flashcards on the most important terms and 1 multiple choice question per title with 4 choices that are derrived from the transcipt provided. Follow this json format for the output {json_string} and return only the json"
    reply = OpenAIChat.chat_with_openai(user_input)
    print("Assistant:", reply)
    print(result)