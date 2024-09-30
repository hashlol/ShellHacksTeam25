// SpacedRepetitionPage.jsx
import React, { useState, useEffect } from 'react';
import { Card, Typography, List, ListItem, ListItemText, Box } from "@mui/material";
import QuizStorageService from './../../services/local-service'; // Adjust the path as needed
import { useGlobalState } from "../../GlobalStateContext.jsx"; 
import { useNavigate } from 'react-router-dom'; 

const SpacedRepetitionPage = () => {
  const [recommendedQuestions, setRecommendedQuestions] = useState([]);
  const { isToggled } = useGlobalState();
  const navigate = useNavigate();

  // Redirect to home if isToggled is false
  useEffect(() => {
    if (!isToggled) {
      navigate("/home");
    }
  }, [isToggled, navigate]);

  // Fetch recommended questions when the component mounts
  useEffect(() => {
    const questions = QuizStorageService.getRecommendedQuestions();
    setRecommendedQuestions(questions);
  }, []);

  const renderQuestions = () => {
    return recommendedQuestions.length > 0 ? (
      recommendedQuestions.map(({ questionId, question, choices }) => (
        <Card key={questionId} sx={{ backgroundColor: "#fffde7", marginBottom: 3, padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            {question}
          </Typography>
          <List>
            {choices.map((choice, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={choice} />
              </ListItem>
            ))}
          </List>
          {/* You can add more functionalities here, such as answer buttons */}
        </Card>
      ))
    ) : (
      <Typography 
        variant="body1" 
        sx={{ color: "gray", fontStyle: "italic", fontWeight: "bold", textAlign: "center" }}
      >
        No questions are scheduled for review today.
      </Typography>
    );
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Spaced Repetition Review
      </Typography>
      {renderQuestions()}
    </Box>
  );
};

export default SpacedRepetitionPage;
