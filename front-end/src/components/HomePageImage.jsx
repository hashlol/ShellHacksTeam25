import React from "react";
import "./components.css";

const HomePageImage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ marginLeft: "2rem" }}>
        <h2 style={{ color: "blue", fontSize: "35px" }}>
          Welcome to Our Platform!
        </h2>
        <p style={{ color: "blue" }}>
          Your journey starts here. Enjoy our amazing services.
        </p>
      </div>
      <div style={{ flex: "1", overflow: "hidden" }}>
        <img
          src="/public/homepageimage1.png"
          alt="Placeholder"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default HomePageImage;
