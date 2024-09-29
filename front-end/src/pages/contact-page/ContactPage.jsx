import React, { useState } from "react";
import { Card, TextField, Button, Typography, Box, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const ContactPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSubmit = () => {
    console.log(firstName, lastName, email, message);
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          gap: "20px",
        }}
      >
        {/* <Box
          component="img"
          src="/homepageimage3.png"
          alt="Left decorative image"
          sx={{
            maxWidth: "350px",
            height: "auto",
            display: { xs: "none", md: "block" },
          }}
        /> */}

        {/* Contact Card */}
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "700px",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              marginBottom: "20px",
              color: "#4042E3",
              fontWeight: "600",
              textDecorationColor: "#4042E3",
              textDecorationThickness: "2px",
            }}
          >
            Contact Us
          </Typography>

          <TextField
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="First Name"
            fullWidth
            sx={{ marginBottom: "10px" }}
          />

          <TextField
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
            fullWidth
            sx={{ marginBottom: "10px" }}
          />

          <TextField
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            fullWidth
            sx={{ marginBottom: "10px" }}
          />

          <TextField
            value={message}
            onChange={handleMessageChange}
            placeholder="Message"
            multiline
            rows={4}
            fullWidth
            sx={{ marginBottom: "20px" }}
          />
          {/* Alert shown when the form is submitted */}
          {showAlert && (
            <Alert
              icon={<CheckIcon fontSize="inherit" />}
              severity="success"
              sx={{ width: "100%", marginBottom: "20px" }}
            >
              Your email has been sent!
            </Alert>
          )}
          <Button
            onClick={handleSubmit}
            fullWidth
            sx={{
              backgroundColor: "#4042E3",
              color: "white",
              padding: "10px",
              borderRadius: "15px",
              "&:hover": {
                backgroundColor: "#3339E0",
              },
            }}
          >
            Submit
          </Button>
        </Card>
        {/* Right Image */}
        <Box
          component="img"
          src="/homepageimage7.png"
          alt="Right decorative image"
          sx={{
            maxWidth: "700px",
            height: "500px",
            display: { xs: "none", md: "block" },
          }}
        />
      </Box>
    </Box>
  );
};

export default ContactPage;
