import React, { useState, useEffect } from "react";
import SignUpForm from "../../components/SignUpForm";
import SignInForm from "../../components/SignInForm";
import { Grid2, Box, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useGlobalState } from "../../GlobalStateContext.jsx";

import "./HomePage.css";

const HomePage = () => {
  const [isSignIn, setSignIn] = useState(true);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [isSignIn2, setSignIn2] = useState(false);
  const { isToggled, setIsToggled } = useGlobalState(); // Access the global state

  const handleFormChange = () => {
    setSignIn((prev) => !prev); // Toggle between sign-in and sign-up forms
  };

  useEffect(() => {
    if (isAuthenticated) {
      setIsToggled(true);
    }
  }, [isAuthenticated]);

  return (
    <Grid2
      container
      component="main"
      sx={{
        height: "100vh",
        backgroundColor: "#f5f5f5",
        transform: "scale(0.8) translateY(-20%)",
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
              Ready to start your learning journey?
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
              maxHeight: "725px",
              maxWidth: "825px",
              transform: "translateX(18%)",
            }}
          />
        </Box>
      </Grid2>

      {/* Conditionally render SignInForm or SignUpForm */}
      <Grid2
        item
        xs={12}
        md={6}
        sx={{ transform: "scale(1.2) translateX(-10%)" }}
      >
        <div>
          {!isToggled ? (
            <div>
              {isSignIn ? (
                <SignInForm onFormChange={handleFormChange} />
              ) : (
                <SignUpForm onFormChange={handleFormChange} />
              )}
              {/* OAuth Sign In */}
            </div>
          ) : (
            <div>
              <h2>Welcome, User!</h2>
            </div>
          )}
        </div>
      </Grid2>
    </Grid2>
  );
};

export default HomePage;
