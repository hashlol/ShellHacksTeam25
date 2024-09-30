import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

// Example custom components
const TestFlow = () => (
  <Typography variant="h5">This is the First Component!</Typography>
);

const SecondComponent = () => (
  <Typography variant="h5">This is the Second Component!</Typography>
);

const ThirdComponent = () => (
  <Typography variant="h5">This is the Third Component!</Typography>
);

const ComponentFlow = ({ components }) => {
  const [currentComponent, setCurrentComponent] = useState(0);

  const handleNext = () => {
    if (currentComponent < components.length - 1) {
      setCurrentComponent(currentComponent + 1);
    }
  };

  const handlePrev = () => {
    if (currentComponent > 0) {
      setCurrentComponent(currentComponent - 1);
    }
  };

  return (
    <Box style={{ backgroundColor: "yellow" }}>
      {/* Display the current component inside an MUI card */}
      <Card>
        <CardContent>{components[currentComponent]}</CardContent>
      </Card>

      {/* Navigation buttons */}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          onClick={handlePrev}
          disabled={currentComponent === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={currentComponent === components.length - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TestFlow;
