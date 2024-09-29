import axios from "axios";

const dummy_endpoint_link = "http://127.0.0.1:5000";

export const getMetaData = async (query) => {
  const url = `${dummy_endpoint_link}/getMetaData/${query}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error: ${error.response ? error.response.data.message : error.message}`
    );
    throw error;
  }
};
