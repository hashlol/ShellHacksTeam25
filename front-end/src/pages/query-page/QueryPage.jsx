import {
  Button,
  Card,
  CircularProgress,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import QueryInput from "../../components/query/QueryInput";
import { getMetaData } from "../../services/query-service";
import QueryVideoPlayer from "../../components/query/QueryVideoPlayer";
import QueryFlashCard from "../../components/query/QueryFlashCard";
import QueryQuestion from "../../components/query/QueryQuestion";

const QueryPage = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (query.length <= 0) {
        console.log("err");
        throw new Error("Something went wrong");
      }
      const result = await getMetaData(query);
      setData(result);
    } catch (err) {
      setError("Failed to fetch data.");
      console.error("Error fetching metadata:", err);
    } finally {
      setLoading(false);
    }
  };

  const multipleChoiceData = {
    question: "What is the objective of the video?",
    choices: [
      "To teach about Python's syntax",
      "To explain the fundamentals of Python concepts",
      "To discuss the history of Python",
      "To compare Python with other programming languages",
    ],
    answer: "To explain the fundamentals of Python concepts",
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            backgroundColor: "#f5f5f5",
            color: "#f5f5f5",
            height: "300px",
            width: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: 3,
          }}
        >
          <Typography
            variant={"h3"}
            sx={{
              color: "#4143E3",
              transform: "translateY(-50%)",
              fontWeight: 550,
            }}
          >
            Learn easier here!
          </Typography>

          <QueryInput setQuery={setQuery} query={query} />

          {loading ? (
            <CircularProgress
              sx={{ marginTop: "20px", color: "#4143E3" }} // Loading spinner
            />
          ) : (
            <>
              <Button
                onClick={handleFetchData}
                sx={{
                  backgroundColor: "#4143E3",
                  color: "white",
                  padding: "12px 24px",
                  fontSize: "16px", // Adjust font size
                  marginTop: "20px", // Space between TextField and Button
                  borderRadius: "8px", // Optional rounded corners
                  "&:hover": {
                    backgroundColor: "#FE7163", // Hover color
                  },
                }}
                variant="contained"
              >
                Search
              </Button>
            </>
          )}
        </Card>
      </Box>

      {error && (
        <Typography color="error" variant="body1" sx={{ marginTop: "20px" }}>
          {error}
        </Typography>
      )}

      {data && (
        <>
          <QueryVideoPlayer videoId={"6tNS--WetLI"} startTime={67} />

          <QueryFlashCard
            term={"test"}
            definition={"test is a singer of a definition lorenepsum"}
          />

          <QueryQuestion multipleChoiceData={multipleChoiceData} />
        </>
      )}
    </>
  );
};

export default QueryPage;
