import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ImageGrid from "../../components/ImageGrid";

const AboutPage = () => {
  return (
    <>
      <div>
        <ImageGrid />
      </div>
      <Container maxWidth="md" style={{ paddingTop: "60px" }}>
        <Box
          sx={{
            padding: 3,
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: 2,
            margin: "30px",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Learnify!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Our mission is to empower underprivileged communities and people
            with disabilities by providing accessible, personalized learning in
            any language. Learnify highlights key concepts, making it easier to
            grasp important ideas. Through spaced repetition, we reinforce
            knowledge retention, ensuring long-term understanding and empowering
            everyone to learn and grow. Let's begin!
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default AboutPage;
