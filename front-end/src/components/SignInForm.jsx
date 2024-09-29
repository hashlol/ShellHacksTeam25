import React, { useState } from "react";
import {
  Card,
  InputAdornment,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth0 } from "@auth0/auth0-react";
import OAuthLogo from "./OAuthLogo";
import { useGlobalState } from '../GlobalStateContext';



const SignInForm = ({ onFormChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithRedirect, loginWithPopup } = useAuth0();
  const { isToggled, setIsToggled } = useGlobalState(); // Access the global state


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://dev-1x3dgd17gm4ixr5o.us.auth0.com/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "password",           // The grant type is 'password' for username-password login
          username: email,                  // The user's email or username
          password: password,               // The user's password
          client_id: "P6CgenKb7ii7mf7p8pHVR8BjUpzOwfl2",      // Client ID of your Auth0 application
          connection: "Username-Password-Authentication", 
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Attempting to set signIn2 to true");
        setIsToggled(true)
        console.log("Login successful!", data);
        // Store the access token securely (e.g., in localStorage or session)
        const accessToken = data.access_token;
        console.log("Access Token:", accessToken);
      } else {
        console.error("Login failed:", data);
        // Handle login failure (e.g., display an error message)
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    } finally {
      // Clear fields if necessary
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Card
      style={{
        transform: "translateY(65%) translateX(40%)",
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
        }}
      >
        Welcome back!
      </Typography>
      <Typography
        variant="h8"
        style={{
          color: "#909090",
        }}
      >
        Please enter your details.
      </Typography>

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
        Sign In
      </Button>

      <Typography
        sx={{ fontSize: "12px", color: "#909090", marginTop: "10px" }}
      >
        Don't have an account?{" "}
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
          Sign up
        </Button>
      </Typography>

      <Button
        onClick={() => loginWithRedirect    ()}
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
        Sign in with OAuth
      </Button>
    </Card>
  );
};

export default SignInForm;
