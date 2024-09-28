import React, { useState } from "react";
import { Card, Typography, Grid } from "@mui/material";

const Questions = () => {
  const [question, setQuestion] = useState("Sample Question Goes Here");
  const [answers, setAnswers] = useState([
    "Sample Answer 1",
    "Sample Answer 2",
    "Sample Answer 3",
    "Sample Answer 4",
  ]);

  return (
    <div>
      <Card
        style={{
          marginTop: "125px",
          padding: "20px",
          marginBottom: "20px",
          marginLeft: "100px",
          marginRight: "100px",
          height: "580px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            height: "200px",
          }}
        >
          <Typography
            variant="h2"
            style={{
              color: "#4143E3",
              fontWeight: "bold",
              fontSize: "55px",
              alignSelf: "center",
            }}
          >
            {question}
          </Typography>
        </div>
        <Grid container spacing={5}>
          {answers.map((answer, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                variant="outlined"
                style={{
                  padding: "20px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10px",
                  marginBottom: "50px",
                }}
              >
                <Typography variant="h5">{answer}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
};

export default Questions;
