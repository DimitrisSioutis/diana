import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './AuthProvider';
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import dateFormatter from "../utils/dateFormatter";

function AdminDashboard() {
  const { auth, setAuth } = useContext(AuthContext);
  const api = import.meta.env.VITE_API_URL;
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0); // State for total count of articles

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${api}/user/logout`, {}, { withCredentials: true });
      if (res.data.success) {
        setAuth({});
        navigate('/login');
      }
    } catch (error) {
      console.error("Something went wrong while logging out", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const params = { page: page };
      const res = await axios.get(`${api}/articles/page`, { params });

      if (res.data.articles) {
        setArticles(res.data.articles);
        let count = res.data.count
        setLastPage(Math.ceil(count/10)); // Set the count from the response
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    if (!auth || !auth.accessToken) {
      navigate('/login');
    }
  }, [auth, navigate]);

  useEffect(() => {
    fetchArticles();
  }, [page]);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="text-xl">Welcome</div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Search
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
          <FiLogOut />
        </button>
      </div>

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <div className="bg-gray-200 w-1/4 min-h-screen p-4">
          <ul>
            <li className="mb-2">
              <a href="#" className="text-blue-500 hover:text-blue-700">Articles</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-700">Players</a>
            </li>
          </ul>
        </div>

        {/* Main Section */}
        <div className="flex-1 p-4">
          <div className="space-y-2 bg-white">
            {articles.map((article, index) => (
              <div key={article._id} className='flex w-full'>
                <h1 className='flex items-center justify-center w-8'>{index + 1 + page * 10}</h1>
                <img src={article.img} alt="Thumbnail" className="w-16 h-16 object-cover" />
                <h2 className="text-xl font-bold">{article.title}</h2>
                <p className="text-gray-700 mb-2">{article.desc}</p>
                <p className="text-gray-500 text-sm">{dateFormatter(article.createdAt)}</p>
                <div className="flex space-x-2 ml-auto pr-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FiEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaRegTrashAlt />
                  </button>
                </div>
                <hr className="my-4 border-gray-300" />
              </div>
            ))}
          </div>
          <div className='flex'>
            {page > 0 && <button onClick={() => setPage(page - 1)}>Previous</button>}
            {page!=lastPage-1 && <button>{page + 1}</button>}
            <button onClick={() => setPage(lastPage-1)}>{lastPage}</button>
            {articles.length >= 10  && <button onClick={() => setPage(page + 1)}>Next</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
