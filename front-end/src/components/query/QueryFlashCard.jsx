import React from "react";
import { Typography, Card, CardContent } from "@mui/material";

const QueryFlashCard = ({ term, definition }) => {
  return (
    <Card
      sx={{
        maxWidth: 400, // Width of the flashcard
        padding: "16px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9", // Light background
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "#4143E3",
            marginBottom: "12px",
            wordWrap: "break-word",
          }}
        >
          {term}
        </Typography>

        <Typography
          variant="h8"
          align="center"
          sx={{ color: "black", wordWrap: "break-word" }}
        >
          {definition}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default QueryFlashCard;
