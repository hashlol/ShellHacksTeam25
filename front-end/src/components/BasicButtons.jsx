import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const BasicButtons = ({ text }) => {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained">{text}</Button>
    </Stack>
  );
};

export default BasicButtons;
