import React, { useState } from "react";
import { Card, Typography, Grid, Button } from "@mui/material";
import QuizStorageService from "../../services/local-service"; // Import the service

const QueryQuestion = ({ multipleChoiceData, questionId }) => {
  const { question, choices, answer } = multipleChoiceData;

  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track the selected answer
  const [isCorrect, setIsCorrect] = useState(null); // Track if the answer is correct
  const [isAnswered, setIsAnswered] = useState(false); // Track if the user has answered

  // Handle answer click
  const handleAnswerClick = (choice) => {
    if (isAnswered) return; // Prevent answering again

    const correct = choice === answer; // Check if the selected answer is correct
    setSelectedAnswer(choice);
    setIsCorrect(correct);
    setIsAnswered(true);

    // Save the result in local storage
    QuizStorageService.saveAnswer(questionId, multipleChoiceData, correct);
  };

  return (
    <div>
      <Card
        style={{
          marginTop: "125px",
          padding: "20px",
          marginBottom: "20px",
          marginLeft: "10px",
          marginRight: "100px",
          minHeight: "300px", // Changed from fixed height to minHeight
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            height: "200px",
          }}
        >
          <Typography
            variant="h2"
            style={{
              color: "#4143E3",
              fontWeight: "bold",
              fontSize: "35px", // Adjust font size for the question
              alignSelf: "center",
            }}
          >
            {question}
          </Typography>
        </div>
        <Grid container spacing={5}>
          {choices.map((choice, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Button
                variant="contained"
                fullWidth
                style={{
                  padding: "20px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    selectedAnswer === choice
                      ? isCorrect
                        ? "green"
                        : "red"
                      : "#f0f0f0", // Default button color if not selected
                  color: selectedAnswer === choice ? "#fff" : "#000", // Change text color if selected
                  fontSize: "18px",
                }}
                onClick={() => handleAnswerClick(choice)} // Handle the answer selection
                disabled={isAnswered} // Disable further selection after an answer is selected
              >
                {choice}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
};

export default QueryQuestion;
