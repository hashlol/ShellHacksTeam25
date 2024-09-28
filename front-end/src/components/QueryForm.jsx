import React from "react";
import "./components.css";
import BasicTextFields from "./BasicTextFields";
import BasicButtons from "./BasicButtons";
import { Box } from "@mui/material";

const QueryForm = () => {
  return (
    <>
      <div
        style={{
          border: "2px solid #000",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            color: "black",
            fontSize: "25px",
          }}
        >
          Please enter what you want to learn.
        </h1>
        <BasicTextFields
          id="queryForm"
          label="Query"
          variant="outlined"
          style={{ marginBottom: "15px", width: "100%" }}
        />
        <Box style={{ paddingLeft: "40px" }}>
          <BasicButtons
            text="Learn!"
            style={{
              width: "100%",
              backgroundColor: "#4CAF50",
              color: "#fff",
            }}
          />
        </Box>
      </div>
      <img
        src="/public/homepageimage4.png"
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          maxWidth: "25%",
        }}
      />
      <img
        src="/public/homepageimage3.png"
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          maxWidth: "20%",
        }}
      />
    </>
  );
};

export default QueryForm;
