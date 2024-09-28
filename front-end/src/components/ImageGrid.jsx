import React from "react";
import { Grid2, Typography } from "@mui/material";

const gridData = [
  ["homepageimage2.png", "Title 1", "Description 1"],
  ["homepageimage6.png", "Title 2", "Description 2"],
  ["homepageimage4.png", "Title 3", "Description 3"],
];

const ImageGrid = () => {
  return (
    <>
      <Grid2 style={{ display: "flex", flexDirection: "column" }}>
        {gridData.map((item, index) => (
          <Grid2
            container
            component="main"
            sx={{
              flexDirection: "row",
              backgroundColor: "#f5f5f5",
              transform: "scale(0.8)",
              marginTop: "30px",
            }}
          >
            <img
              src={`/${item[0]}`}
              alt={`Image ${index}`}
              style={{ maxWidth: "400px", maxHeight: "350px" }}
            />
            <Grid2
              item
              xs={12}
              md={6}
              sx={{
                marginTop: "50px",
                flexDirection: "column",
              }}
            >
              <Typography variant="h3" sx={{ color: "black" }}>
                item[1]
              </Typography>
              <Typography variant="h6" sx={{ color: "black" }}>
                item[2]
              </Typography>
            </Grid2>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default ImageGrid;
{
  /* <img
          src="/homepageimage1.png"
          alt="Image 1"
          style={{ width: "20%", height: "auto", borderRadius: "8px" }}
        />
        <img
          src="/homepageimage2.png"
          alt="Image 2"
          style={{ width: "20%", height: "auto", borderRadius: "8px" }}
        />

        <img
          src="/homepageimage3.png"
          alt="Image 3"
          style={{ width: "20%", height: "auto", borderRadius: "8px" }}
        /> */
}
