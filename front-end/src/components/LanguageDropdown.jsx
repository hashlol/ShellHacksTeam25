import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useGlobalState } from "../GlobalStateContext"; // Import your global state hook

const languages = {
  en: "English",
  hi: "Hindi",
  es: "Spanish",
  fr: "French",
  pt: "Portuguese",
};

const LanguageDropdown = () => {
  const { selectedLanguage, setSelectedLanguage } = useGlobalState();

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="language-select-label">Language</InputLabel>
      <Select
        labelId="language-select-label"
        value={selectedLanguage}
        onChange={handleChange}
        label="Language"
      >
        {Object.keys(languages).map((code) => (
          <MenuItem key={code} value={code}>
            {languages[code]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageDropdown;
