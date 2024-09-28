import React, { useState } from "react";
import { Card, TextField, Button, Typography, Box } from "@mui/material";

const ContactPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
        <Box
          component="img"
          src="/homepageimage3.png"
          alt="Left decorative image"
          sx={{
            maxWidth: "300px",
            height: "auto",
            display: { xs: "none", md: "block" },
          }}
        />

        {/* Contact Card */}
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "600px",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: "20px",
              color: "#4042E3",
              fontWeight: "600",
              textDecoration: "underline",
              textDecorationColor: "#4042E3",
              textDecorationThickness: "2px",
            }}
          >
            Contact Us!
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
          src="/homepageimage1.png"
          alt="Right decorative image"
          sx={{
            maxWidth: "300px",
            height: "auto",
            display: { xs: "none", md: "block" },
          }}
        />
      </Box>
    </Box>
  );
};

export default ContactPage;
