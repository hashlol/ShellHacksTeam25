import React from "react";
import BasicTextFields from "../../components/BasicTextFields";
import BasicButtons from "../../components/BasicButtons";
import HomePageImage from "../../components/HomePageImage";

const HomePage = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Side: Image and Text */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <HomePageImage />
      </div>

      {/* Right Side: Login Form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            border: "2px solid #f5f5f5",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            borderRadius: "10px",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "#333", fontSize: "40px" }}>Login</h1>
          <BasicTextFields
            id="usernameForm"
            label="Username"
            variant="outlined"
            style={{ marginBottom: "15px", width: "100%" }}
          />
          <BasicTextFields
            id="passwordForm"
            label="Password"
            variant="outlined"
            style={{ marginBottom: "15px", width: "100%" }}
          />
          <BasicButtons
            text="Login"
            style={{ width: "100%", backgroundColor: "#4CAF50", color: "#fff" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
