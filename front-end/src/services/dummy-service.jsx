import axios from "axios";
// const dummy_endpoint_link = import.meta.env.DUMMY_SERVICE_ENDPOINT_URL;
const dummy_endpoint_link = "http://127.0.0.1:5000/api";

export const addUser = async (name) => {
  const url = `${dummy_endpoint_link}/addUser?name=${name}`;

  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    console.error(
      `Error: ${error.response ? error.response.data.message : error.message}`
    );
    throw error;
  }
};

export const getAllUsers = async () => {
  const url = `${dummy_endpoint_link}/getAllUsers`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      `Error: ${error.response ? error.response.data.message : error.message}`
    );
    throw error;
  }
};

export const deleteUser = async (name) => {
  const url = `${dummy_endpoint_link}/deleteUser/${name}`;

  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error(
      `Error: ${error.response ? error.response.data.message : error.message}`
    );
    throw error;
  }
};
