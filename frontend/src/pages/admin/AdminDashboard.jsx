import { useState, useEffect, useContext } from 'react';
import { useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios';

import AdminNav from './AdminNav';

function AdminDashboard() {

  const api = import.meta.env.VITE_API_URL;

  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${api}/articles/page`);

      if (res.data.articles) {
        setArticles(res.data.articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      AdminHome
    </>
  );
}

export default AdminDashboard;
