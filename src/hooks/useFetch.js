import { useEffect, useState } from "react";
import { fetchData } from "../utils/util";

function useFetch(url, initialState, errorHandler) {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    fetchData(url, errorHandler).then((data) => setData(data));
  }, []);

  return [data, setData];
}

export default useFetch;
