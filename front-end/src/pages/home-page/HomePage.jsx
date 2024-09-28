import React from "react";
import SignUpForm from "../../components/SignUpForm";
import SignInForm from "../../components/SignInForm";
import { Grid2, Box, Typography, Paper } from "@mui/material";

import "./HomePage.css";

const HomePage = () => {
  const handleButtonClick = () => {
    console.log("submitted form");
  };

  return (
    <Grid2
      container
      component="main"
      sx={{
        height: "100vh",
        backgroundColor: "#f5f5f5",
        transform: "scale(0.8)",
      }}
    >
      <Grid2
        item
        xs={12}
        md={6}
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            transform: "translateY(15%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "white",
              backgroundColor: "#f5f5f5",
              padding: 4,
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: "600",
                color: "#4042E3",
                transform: "translateY(30%)",
              }}
            >
              Welcome to Learnify!
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "500",
                color: "#4042E3",
                maxWidth: "900px",
                marginLeft: "10px",
              }}
            >
              Discover and memorize anything using spaced repetition and improve
              your knowledge retention!
            </Typography>
          </Box>
          <img
            src="/homepageimage5.png"
            style={{
              maxHeight: "500px",
              maxWidth: "650px",
              transform: "translateX(20%)",
            }}
          />
        </Box>
      </Grid2>
      {/* <SignUpForm onClick={handleButtonClick} /> */}
      <SignInForm />
    </Grid2>
  );
};

export default HomePage;
