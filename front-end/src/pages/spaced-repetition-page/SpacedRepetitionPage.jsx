// SpacedRepetitionPage.jsx
import React, { useState, useEffect } from 'react';
import { Card, Typography, List, ListItem, ListItemText, Box } from "@mui/material";
import QuizStorageService from './../../services/local-service'; // Adjust the path as needed
import { useGlobalState } from "../../GlobalStateContext.jsx"; 
import { useNavigate } from 'react-router-dom'; // Correct import for navigation

const SpacedRepetitionPage = () => {
  const [recommendedQuestions, setRecommendedQuestions] = useState([]);
  const { isToggled } = useGlobalState(); // Access the global state 
  const navigate = useNavigate(); // For redirect

    // Redirect to home if isToggled is false
    useEffect(() => {
      if (!isToggled) {
        navigate("/home"); // Redirect to home
      }
    }, [isToggled, navigate]); // Dependency array

  useEffect(() => {
    // Fetch recommended questions when the component mounts
    const questions = QuizStorageService.getRecommendedQuestions();
    setRecommendedQuestions(questions);
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Spaced Repetition Review
      </Typography>

      {recommendedQuestions.length > 0 ? (
        recommendedQuestions.map((q) => (
          <Card key={q.questionId} sx={{ backgroundColor: "#fffde7", marginBottom: 3, padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              {q.question}
            </Typography>
            <List>
              {q.choices.map((choice, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemText primary={choice} />
                </ListItem>
              ))}
            </List>
            {/* You can add more functionalities here, such as answer buttons */}
          </Card>
        ))
      ) : (
        <Typography variant="body1">No questions are scheduled for review today.</Typography>
      )}
    </Box>
  );
};

export default SpacedRepetitionPage;
