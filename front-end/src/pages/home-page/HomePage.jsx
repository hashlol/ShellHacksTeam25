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
          borderColor: "black",
        }}
      >
        <h1>Login</h1>
        <BasicTextFields
          id="usernameForm"
          label="Username"
          variant="outlined"
        />
        <BasicTextFields
          id="passwordForm"
          label="Password"
          variant="outlined"
        />
        <BasicButtons text="Login" />
      </div>
    </div>
  );
};

export default HomePage;
