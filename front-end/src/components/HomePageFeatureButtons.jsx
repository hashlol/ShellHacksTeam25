import React from "react";
import { Card, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import QuizIcon from "@mui/icons-material/Quiz";

const HomePageFeatureButtons = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  // Handle navigation to specific pages
  const handleButtonClick = (path) => {
    navigate(path); // Navigate to the given path
  };

  return (
    <Card
      sx={{
        height: 200,
        width: 400,
        backgroundColor: "#f5f5f5",
        transform: "translateY(200%) translateX(20%)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        padding: "10px",
        elevation: 0, // Remove shadow
        boxShadow: "none", // Ensure no shadow is applied
      }}
    >
      <Button
        onClick={() => handleButtonClick("/query")} // Navigate to the /query route
        sx={{
          height: 80,
          width: 300,
          backgroundColor: "#4143E3", // Button color
          color: "white",
          transition: "transform 0.5s ease, background-color 0.5s ease", // Smooth hover effect
          "&:hover": {
            backgroundColor: "#FE7163",
            transform: "scale(1.005)", // Scale effect
          },
        }}
        variant="contained"
      >
        <SearchIcon style={{ transform: "scale(1.4) translateX(-20%)" }} />{" "}
        Module-based learning
      </Button>

      <Button
        onClick={() => handleButtonClick("/spacedRepetition")}
        sx={{
          height: 80,
          width: 300,
          backgroundColor: "#4143E3",
          color: "white",
          transition: "transform 0.4s ease, background-color 0.5s ease",
          "&:hover": {
            backgroundColor: "#FE7163",
            transform: "scale(1.005)",
          },
        }}
        variant="contained"
      >
        <QuizIcon style={{ transform: "scale(1.4) translateX(-20%)" }} />{" "}
        Spaced-Repetition Quiz
      </Button>
    </Card>
  );
};

export default HomePageFeatureButtons;
