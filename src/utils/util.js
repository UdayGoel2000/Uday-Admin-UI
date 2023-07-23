import axios from "axios";

export const fetchData = async (url, errorHandler) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    errorHandler(err);
  }
};
