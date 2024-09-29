import { TextField } from "@mui/material";
import React from "react";

const QueryInput = ({ setQuery, query }) => {
  return (
    <>
      <TextField
        sx={{
          backgroundColor: "white",
          width: "80%",
          borderRadius: "18px",
          padding: "10px",
          color: "#4143E3",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent", // No border by default
            },
            "&:hover fieldset": {
              borderColor: "transparent", // No border on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent", // No border when focused
            },
          },
        }}
        placeholder={"What can I teach you today?"}
        value={query || ""}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
};

export default QueryInput;
