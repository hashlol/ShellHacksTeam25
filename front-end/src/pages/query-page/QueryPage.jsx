import {
  Button,
  Card,
  CircularProgress,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import QueryInput from "../../components/query/QueryInput";
import { getMetaData } from "../../services/query-service";
import QueryVideoPlayer from "../../components/query/QueryVideoPlayer";
import QueryFlashCard from "../../components/query/QueryFlashCard";
import QueryQuestion from "../../components/query/QueryQuestion";
import ModuleBuilder from "../../components/query/ModuleBuilder";
import { useGlobalState } from "../../GlobalStateContext.jsx";
import { useNavigate } from "react-router-dom"; // Correct import for navigation

const QueryPage = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [currentModule, setCurrentModule] = useState(0);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isToggled } = useGlobalState();
  const navigate = useNavigate(); // For redirect

  useEffect(() => {
    if (!isToggled) {
      navigate("/home");
    }
  }, [isToggled, navigate]); // Dependency array

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (query.length <= 0) {
        throw new Error("Something went wrong");
      }

      const result = {
        json: {
          titles: [
            {
              flashcards: [
                {
                  definition:
                    "In-game currency used in Fortnite to purchase various items.",
                  term: "V-Bucks",
                },
                {
                  definition:
                    "Content designed to attract attention, often misleading.",
                  term: "Clickbait",
                },
                {
                  definition:
                    "The process of entering a specific code in the game to receive rewards.",
                  term: "Code Redemption",
                },
              ],
              multiple_choice: {
                answer: "One of the entered codes will succeed",
                choices: [
                  "They always work",
                  "One of the entered codes will succeed",
                  "They are all fake",
                  "They can only be obtained via purchases",
                ],
                question:
                  "What does the participant aim to prove regarding V-Buck codes?",
              },
              timestamp: "0",
              title: "Clickbait V-Buck Codes Attempt",
            },
            {
              flashcards: [
                {
                  definition:
                    "An alleged error in the game allowing players to unlock skins without payment.",
                  term: "Skin Glitch",
                },
                {
                  definition:
                    "A fraudulent scheme to deceive others, particularly for personal gain.",
                  term: "Scam",
                },
                {
                  definition:
                    "A specific code that allows access to a particular map in Fortnite.",
                  term: "Map Code",
                },
              ],
              multiple_choice: {
                answer: "Trying to unlock all skins",
                choices: [
                  "Trying to unlock all skins",
                  "Giving up on the first try",
                  "Waiting for a timer",
                  "Cheating to get skins",
                ],
                question:
                  "What is the primary action taken regarding the skin glitch?",
              },
              timestamp: "40",
              title: "Fortnite Skin Glitch Investigation",
            },
            {
              flashcards: [
                {
                  definition:
                    "A fake tool claimed to provide V-Bucks in exchange for user information or tasks.",
                  term: "V-Buck Generator",
                },
                {
                  definition:
                    "Actions that indicate potential fraud or deception.",
                  term: "Suspicious Activity",
                },
                {
                  definition:
                    "A method used by scams to collect personal information under the guise of account verification.",
                  term: "Survey Verification",
                },
              ],
              multiple_choice: {
                answer: "They require user verification through surveys",
                choices: [
                  "They are officially sanctioned by Epic Games",
                  "They require user verification through surveys",
                  "They provide instant V-Bucks",
                  "They use legitimate game codes",
                ],
                question:
                  "What common feature do many V-Buck generators share?",
              },
              timestamp: "155",
              title: "V-Buck Generator Tests",
            },
            {
              flashcards: [
                {
                  definition:
                    "Elements in a game that require waiting for a timer to complete to access rewards.",
                  term: "Timed Mechanics",
                },
                {
                  definition:
                    "A claim related to receiving limitless experience points, often considered unrealistic.",
                  term: "Infinite XP",
                },
                {
                  definition:
                    "Slang for 'lie' or 'falsehood', often used in gaming contexts.",
                  term: "Cap",
                },
              ],
              multiple_choice: {
                answer: "They discovered several to be scams",
                choices: [
                  "They found all methods to be legitimate",
                  "They discovered several to be scams",
                  "They successfully proved all methods",
                  "They received unlimited V-Bucks",
                ],
                question:
                  "What did the participants conclude about the various methods to obtain V-Bucks?",
              },
              timestamp: "1001",
              title: "Evidence of Scams and Fake Methods",
            },
          ],
        },
        videoId: "nLqZd0bTFto",
      };
      setModules(ModuleBuilder(result));
      setCurrentModule(0); // Reset to first module after fetch
    } catch (err) {
      setError("Failed to fetch data.");
      console.error("Error fetching metadata:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextModule = () => {
    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
    } else {
      alert("You have reached the last module.");
    }
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
            <CircularProgress sx={{ marginTop: "20px", color: "#4143E3" }} />
          ) : (
            <>
              <Button
                onClick={handleFetchData}
                sx={{
                  backgroundColor: "#4143E3",
                  color: "white",
                  padding: "12px 24px",
                  fontSize: "16px",
                  marginTop: "20px",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#FE7163",
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

      {/* Display the current module content */}
      {modules.length > 0 && (
        <Box sx={{ marginTop: "20px", textAlign: "center" }}>
          <QueryVideoPlayer
            videoId={"6tNS--WetLI"}
            startTime={modules[currentModule].startTime}
          />

          <QueryFlashCard
            term={modules[currentModule].term}
            definition={modules[currentModule].definition}
          />

          <QueryQuestion multipleChoiceData={modules[currentModule].question} />

          {/* Button to go to the next module */}
          <Button
            onClick={handleNextModule}
            sx={{
              backgroundColor: "#4143E3",
              color: "white",
              padding: "12px 24px",
              fontSize: "16px",
              marginTop: "20px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#FE7163",
              },
            }}
          >
            Next Module
          </Button>
        </Box>
      )}
    </>
  );
};

export default QueryPage;
