const ModuleBuilder = (data) => {
  // Ensure 'data' and 'data.json' exist
  if (!data || !data.json || !data.json.titles) {
    console.error("Invalid data format");
    return [];
  }
  const videoId = data.videoId;

  const { titles } = data.json;

  const cleanedData = titles.map((title, index) => {
    const startTime = parseInt(title.timestamp, 10);

    const nextTitle = titles[index + 1];

    const endTime = nextTitle ? parseInt(nextTitle.timestamp, 10) - 1 : null;

    return {
      videoId: videoId,
      title: title.title,
      startTime: startTime,
      endTime: endTime,
      flashcards: title.flashcards || [],
      question: title.question || "",
      correctAnswer: title.correctAnswer || "",
      choices: title.choices || [],
    };
  });

  return cleanedData;
};

export default ModuleBuilder;
