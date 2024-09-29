const QuizStorageService = {
  saveAnswer(questionId, multipleChoiceData, isCorrect) {
    const currentTime = new Date().toISOString();
    const storedData = this.getStoredData();

    let recommendedDate = new Date();

    if (isCorrect) {
      recommendedDate.setDate(recommendedDate.getDate() + 1); // 7 days later for correct answers
    } else {
      recommendedDate.setDate(recommendedDate.getDate() + 0); // 1 day later for incorrect answers
    }

    // Structure to save the full question and answer data
    storedData[questionId] = {
      question: multipleChoiceData.question, // Save question
      choices: multipleChoiceData.choices, // Save all answer choices
      correctAnswer: multipleChoiceData.answer, // Save correct answer
      answeredAt: currentTime,
      isCorrect,
      recommendedDate: recommendedDate.toISOString(),
    };

    localStorage.setItem("quizData", JSON.stringify(storedData));
  },

  getStoredData() {
    const storedData = localStorage.getItem("quizData");
    return storedData ? JSON.parse(storedData) : {};
  },

  getRecommendedQuestions() {
    const storedData = this.getStoredData();
    const currentTime = new Date();

    // Filter questions based on recommended date
    return Object.entries(storedData)
      .filter(([_, data]) => new Date(data.recommendedDate) <= currentTime)
      .map(([questionId, data]) => ({
        questionId,
        question: data.question,
        choices: data.choices,
        correctAnswer: data.correctAnswer,
      }));
  },
};

export default QuizStorageService;
