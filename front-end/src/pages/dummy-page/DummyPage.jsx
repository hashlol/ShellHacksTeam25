import React, { useState, useEffect } from "react";
import axios from "axios";
import { getMetaData } from "../../services/dummy-service.jsx";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";

async function getReq(query) {
  let rep = await getMetaData(query);
  return rep;
}

const fetchData = async () => {
  let rep = await getReq("python");
  console.log(rep);
};

const DummyPage = () => {
  return (
    <>
      <div style={{ backgroundColor: "red" }}>
        <Button onClick={() => fetchData()}>click for req</Button>
      </div>
    </>
  );
};

export default DummyPage;
