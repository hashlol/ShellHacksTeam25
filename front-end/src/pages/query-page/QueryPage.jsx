import { Button, Card } from "@mui/material"; 
import React, { useState, useEffect } from "react"; 
import QueryInput from "../../components/query/QueryInput"; 
import { getMetaData } from "../../services/query-service"; 
import QueryVideoPlayer from "../../components/query/QueryVideoPlayer"; 
import QueryFlashCard from "../../components/query/QueryFlashCard"; 
import QueryQuestion from "../../components/query/QueryQuestion"; 
import { useGlobalState } from "../../GlobalStateContext.jsx"; 
import { useNavigate } from 'react-router-dom'; // Correct import for navigation

const QueryPage = () => { 
  const [query, setQuery] = useState(""); 
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const { isToggled } = useGlobalState(); // Access the global state 
  const navigate = useNavigate(); // For redirect

  // Redirect to home if isToggled is false
  useEffect(() => {
    if (!isToggled) {
      navigate("/home"); // Redirect to home
    }
  }, [isToggled, navigate]); // Dependency array

  const handleFetchData = async () => { 
    setLoading(true); 
    setError(null); 
    try { 
      const result = await getMetaData(query); 
      setData(result); 
    } catch (err) { 
      setError("Failed to fetch data."); 
      console.error("Error fetching metadata:", err); 
    } finally { 
      console.log(data); 
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
      <Card 
        sx={{ 
          backgroundColor: "lightgray", 
          color: "black", 
          height: "500px", 
          width: "500px", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center", 
        }} 
      > 
        <QueryInput setQuery={setQuery} query={query} /> 
        <Button 
          sx={{ 
            backgroundColor: "#4143E3", // Primary color 
            color: "white", 
            padding: "12px 24px", // Bigger button size 
            fontSize: "16px", // Adjust font size 
            marginTop: "20px", // Space between TextField and Button 
            borderRadius: "8px", // Optional rounded corners 
            "&:hover": { 
              backgroundColor: "#FE7163", // Hover color 
            }, 
          }} 
          variant="contained" 
          onClick={handleFetchData} // Added onClick to trigger fetch
        > 
          Learn! 
        </Button> 
      </Card> 

      <QueryVideoPlayer videoId={"6tNS--WetLI"} startTime={67} /> 

      <QueryFlashCard 
        term={"test"} 
        definition={"test is a singer of a definition lorenepsum"} 
      /> 

      <QueryQuestion multipleChoiceData={multipleChoiceData} /> 
    </> 
  ); 
};

export default QueryPage;
