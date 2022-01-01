import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw Error("Unable to fetch data from the resource");
        }
        return response.json();
      })
      .then((json) => {
        setIsPending(false);
        setData(json);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [url]);
};

export default useFetch;
