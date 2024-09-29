import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const QueryInput = ({ setQuery, query }) => {
  return (
    <>
      <TextField
        sx={{
          backgroundColor: "white",
          width: "80%",
          borderRadius: "18px",
          border: "2px solid #ddd", // Initial light border
          padding: "10px",
          color: "#4143E3", // Text color to blue
          "& .MuiInputBase-input": {
            color: "#4143E3", // Text color inside input
          },
          "&:hover": {
            backgroundColor: "white",
            borderColor: "#4143E3", // Hover effect for the border
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent", // No border by default
            },
            "&:hover fieldset": {
              borderColor: "#4143E3", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4143E3", // Border color when focused
            },
          },
        }}
        placeholder={"What can I teach you today?!"}
        value={query ? query : ""}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
};

export default QueryInput;
