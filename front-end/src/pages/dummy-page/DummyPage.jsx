import React, { useState, useEffect } from "react";
import axios from "axios";
import { getMetaData } from "../../services/dummy-service.jsx";
import { Button } from "@mui/material";

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
        <Button> test</Button>
        {/* <Button onClick={() => fetchData()}>click for req</Button> */}
      </div>
    </>
  );
};

export default DummyPage;
