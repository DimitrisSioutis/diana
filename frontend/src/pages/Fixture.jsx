import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Loading';
import axios from 'axios';

const Fixture = () => {
  const api = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [fixture, setFixture] = useState(null); // Initialize to null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To track error state

  useEffect(() => {
    if (id) {
      axios
        .get(`${api}/fixtures/${id}`)
        .then((res) => {
          setFixture(res.data);
        })
        .catch((error) => {
          console.log('Error:', error);
          setError('Failed to load fixture'); // Set error state
        })
        .finally(() => {
          setLoading(false); // Set loading to false after API call
        });
    } else {
      setLoading(false); // No ID provided, stop loading
    }
  }, [id, api]); // Added api to dependencies

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? ( // Check for error state
        <div className='text-slate-50'>Error: {error}</div>
      ) : (
        fixture && ( // Ensure fixture is defined
          <>
            {fixture.home} v {fixture.away}
          </>
        )
      )}
    </>
  );
};

export default Fixture;
