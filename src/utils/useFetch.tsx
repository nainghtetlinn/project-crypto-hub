import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'https://coinranking1.p.rapidapi.com';
const headers = {
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
};

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios({ baseURL: baseUrl, url, headers });
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);
  return { data, error, loading };
};

// const useFetch = (url: string) => {
//   const [isFetching, setIsFetching] = useState<boolean>(true);
//   const [isError, setIsError] = useState<boolean>(false);
//   const [data, setData] = useState<any>(null);

//   const fetchURL = async () => {
//     setIsFetching(true);
//     setIsError(false);

//     const res = await fetch(baseUrl + url, {
//       headers: {
//         'x-access-token':
//           'coinranking352db49f90301381e62bfb91b153b68ec2c348e2ea4b1fda',
//       },
//     });

//     if (!res.ok) {
//       setIsError(true);
//     } else {
//       const d = await res.json();
//       setData(d);
//     }

//     setIsFetching(false);
//   };

//   useEffect(() => {
//     fetchURL();
//   }, [url]);

//   return { isFetching, data, isError };
// };

export default useFetch;
