import * as React from "react";
import { Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <>
      <div className="center">
        <div className="middle">
          <ReportProblemIcon
            sx={{ height: "120px", width: "300px", color: "blue" }}
          />
          <Typography
            variant={"h2"}
            style={{ color: "#FE7163", fontWeight: "bold" }}
          >
            404 Page Not Found
          </Typography>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
