import * as React from "react";
import { Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <>
      <div style={{ transform: "translateY(-25%)" }}>
        <div className="center">
          <div className="middle">
            <img
              src="/public/404errorimage.png"
              style={{
                maxHeight: 400,
                maxWidth: 400,
              }}
              alt="Logo"
            />
            <Typography
              variant={"h2"}
              style={{ color: "#FE7163", fontWeight: "bold" }}
            >
              404 Page Not Found
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
