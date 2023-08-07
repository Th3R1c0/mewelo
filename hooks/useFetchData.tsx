import React, { useState, useEffect } from "react";

function useFetchData(fn: any) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await fn();
        setResult(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [fn]);

  return { loading, result, error };
}

export default useFetchData;
