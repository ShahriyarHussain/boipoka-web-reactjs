import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("I am above here");
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then((response) => {
        console.log("I am here!");
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
          console.log("Fetch operation ignored");
        } else {
          setIsPending(false);
          setError(err.message);
          console.log("The error:", err);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [url]);
};

export default useFetch;
