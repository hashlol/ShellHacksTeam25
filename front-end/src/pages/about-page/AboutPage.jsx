import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ImageGrid from "../../components/ImageGrid";

const AboutPage = () => {
  return (
    <>
      <Container
        maxWidth="lg"
        style={{ paddingTop: "30px", backgroundColor: "#f5f5f5" }}
      >
        <Box
          sx={{
            padding: 3,
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: 2,
            margin: "30px",
            transform: "translateY(1%)",
          }}
        >
          <ImageGrid />
        </Box>
      </Container>
    </>
  );
};

export default AboutPage;
