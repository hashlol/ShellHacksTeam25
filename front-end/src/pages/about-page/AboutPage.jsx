import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, Box } from "@mui/material";
import ImageGrid from "../../components/ImageGrid";

function FadeInSection(props) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

const AboutPage = () => {
  return (
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
        }}
      >
        <FadeInSection>
          <ImageGrid />
        </FadeInSection>
      </Box>
    </Container>
  );
};

export default AboutPage;
