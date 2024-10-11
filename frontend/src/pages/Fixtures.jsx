import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Loading';
import axios from 'axios';

const Fixtures = () => {
  const api = import.meta.env.VITE_API_URL;
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Initialize page state
  const [hasMore, setHasMore] = useState(true); // Track if more fixtures are available

  const fetchFixtures = () => {
    setLoading(true); // Start loading
    axios
      .get(`${api}/fixtures?page=${page}`) // Pass the current page to the API
      .then((res) => {
        setFixtures((prevFixtures) => [...prevFixtures, ...res.data.fixtures]); // Append new fixtures
        setHasMore(res.data.hasMore); // Update hasMore state based on API response
      })
      .catch((error) => {
        console.log('Error:', error);
        setError('Failed to load fixtures');
      })
      .finally(() => {
        setLoading(false); // Set loading to false after API call
      });
  };

  useEffect(() => {
    fetchFixtures(); // Fetch fixtures on component mount and when the page changes
  }, [page]); // Fetch when the page changes

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className='text-slate-50'>Error: {error}</div>
      ) : (
        <>
          {fixtures.map((fixture, index) => (
            <div key={index} className='text-slate-50'>
              {fixture.home} v {fixture.away}
            </div>
          ))}
          {hasMore && <button onClick={() => setPage((prev) => prev + 1)} className='text-slate-50'>Load More</button>}
        </>
      )}
    </>
  );
};

export default Fixtures;
