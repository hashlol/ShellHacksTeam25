import React, { useState } from "react";
import {
  Card,
  InputAdornment,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import OAuthLogo from "./OAuthLogo";
import { useAuth0 } from "@auth0/auth0-react";


const SignUpForm = ({ onFormChange }) => {
  const [username, setUsername] = useState("");
  const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = () => {
    console.log(username);
    console.log(email);
    console.log(password);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <Card
      style={{
        transform: "translateY(40%) translateX(40%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "350px",
        height: "400px",
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="h4"
        style={{
          marginTop: "10px",
          color: "#4042E3",
          fontWeight: "600",
          textDecoration: "underline",
          textDecorationColor: "#4042E3",
          textDecorationThickness: "2px",
        }}
      >
        Sign up
      </Typography>

      <TextField
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
        sx={{
          marginTop: "10px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
            height: "40px",
            width: "280px",
          },
          "& input": {
            textAlign: "left",
            marginRight: "40px",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
        sx={{
          marginTop: "20px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
            height: "40px",
            width: "280px",
          },
          "& input": {
            textAlign: "left",
            marginRight: "40px",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        type="password"
        sx={{
          marginTop: "20px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
            height: "40px",
            width: "280px",
          },
          "& input": {
            textAlign: "left",
            marginRight: "40px",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />

      <Button
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#4042E3",
          color: "white",
          width: "280px",
          height: "30px",
          marginTop: "20px",
          borderRadius: "15px",
          "&:hover": {
            backgroundColor: "#3339E0",
            transform: "scale(1.005)",
          },
        }}
      >
        Sign up
      </Button>

      <Typography
        sx={{ fontSize: "12px", color: "#909090", marginTop: "10px" }}
      >
        Already have an account?{" "}
        <Button
          onClick={onFormChange} // Trigger form switch
          sx={{
            fontSize: "13px",
            textDecoration: "none",
            color: "#4042E3",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Sign in
        </Button>
      </Typography>

      <Button
        onClick={() => loginWithRedirect()}
        sx={{
          backgroundColor: "transparent",
          color: "#909090",
          width: "280px",
          height: "30px",
          marginTop: "20px",
          borderRadius: "15px",
          border: 1,
          borderColor: "#909090",
          "&:hover": {
            backgroundColor: "transparent",
            transform: "scale(1.005)",
          },
        }}
      >
        <OAuthLogo />
        Sign up with OAuth
      </Button>
    </Card>
  );
};

export default SignUpForm;
