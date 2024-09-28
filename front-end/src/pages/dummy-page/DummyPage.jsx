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

const DummyPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      let rep = await getReq("python");
      console.log(rep);
    };

    fetchData(); // Call the async function
  }, []);

  return <div>Dummy Page</div>;
};

export default DummyPage;
