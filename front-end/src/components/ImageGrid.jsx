import React, { useState, useEffect, useRef } from "react";
import { Grid2, Typography } from "@mui/material";

const gridData = [
  [
    "homepageimage2.png",
    "Empowering Underprivileged Communities",
    "At Learnify, our core mission is to break down barriers to education by providing accessible learning opportunities to underprivileged communities. We understand that access to quality education is often limited by economic, geographic, or social factors. To address this, Learnify offers a platform that delivers knowledge in multiple languages, ensuring that no matter where you're from or what your background is, you can learn in the language you're most comfortable with. By personalizing learning paths and catering to individual needs, we aim to create a more inclusive educational environment that allows all individuals to gain knowledge, develop skills, and unlock new opportunities for growth.",
  ],
  [
    "homepageimage6.png",
    "Supporting People with Disabilities",
    "Inclusivity is at the heart of Learnify's design. We believe that education should be accessible to everyone, including those who face physical, cognitive, or sensory challenges. Our platform is optimized for users with disabilities, featuring assistive technologies and tools that make learning simpler and more intuitive. From adjusting font sizes to incorporating voice-assisted navigation, Learnify empowers users with disabilities to access content in ways that work best for them. We focus on delivering key concepts in a clear, concise manner, minimizing distractions and ensuring that all learners, regardless of ability, can fully participate in their educational journey.",
  ],
  [
    "homepageimage4.png",
    "Reinforcing Knowledge with Spaced Repetition",
    "Retaining knowledge is just as important as acquiring it. That's why Learnify incorporates the science of spaced repetition, a proven method to enhance memory retention. After you've learned new concepts, we will periodically review these key ideas at strategic intervals. This helps solidify the information in your long-term memory, ensuring you truly grasp and retain the material over time. Whether you're preparing for an exam, learning a new skill, or simply expanding your knowledge, spaced repetition ensures that you're not just memorizing facts but genuinely understanding and remembering them. Through regular review and reinforcement, Learnify makes learning a continuous, evolving process.",
  ],
];

const FadeInSection = ({ children }) => {
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
      { threshold: 0.1 }
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
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(20vh)",
        transition: "opacity 0.6s ease-out, transform 1.2s ease-out",
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
};

const ImageGrid = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <Typography
          variant="h2"
          gutterBottom
          style={{ color: "#4143E3", fontWeight: "bold", fontSize: "70px" }}
        >
          What does Benkyo do?
        </Typography>
      </div>
      <Grid2
        style={{
          display: "flex",
          flexDirection: "column",
          transform: "translateX(-5%)",
        }}
      >
        {gridData.map((item, index) => (
          <FadeInSection key={index}>
            <Grid2
              container
              component="main"
              sx={{
                flexDirection: "row",
                backgroundColor: "#f5f5f5",
                transform: "scale(0.8)",
              }}
            >
              <img
                src={`/${item[0]}`}
                alt={`Image ${index}`}
                style={{ maxWidth: "400px", maxHeight: "400px" }}
              />
              <Grid2
                item
                xs={12}
                md={6}
                sx={{
                  marginLeft: "50px",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    color: "#4143E3",
                    fontSize: "40px",
                    fontWeight: "bold",
                  }}
                >
                  {item[1]}
                </Typography>
                <Typography
                  sx={{ color: "black", fontSize: "20px", marginTop: "20px" }}
                >
                  {item[2]}
                </Typography>
              </Grid2>
            </Grid2>
          </FadeInSection>
        ))}
        ,
      </Grid2>
    </>
  );
};

export default ImageGrid;
