import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import AuthContext from './pages/AuthProvider';

import Layout from './components/Layout';
import Spinner from './components/Loading';

import Home from './pages/Home';
import News from './pages/News';
import Highlights from './pages/Highlights';
import Fixture from './pages/Fixture';
import Table from './pages/Table';
import Schedule from './pages/Schedule';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './pages/admin/AdminLayout'; // Import the new AdminLayout
import ShowArticle from './pages/ShowArticle';
import ArticleForm from './pages/ArticleForm';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Posts from './pages/admin/Posts';

const App = () => {
  const api = import.meta.env.VITE_API_URL;
  const [articles, setArticles] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [highlight, setHighlight] = useState('');
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  const { auth } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (auth === undefined) {
      return <Spinner />;
    }

    if (!auth) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${api}/articles/latest`);
      setArticles(res.data);
    } catch (error) {
      console.error('Error fetching Latest articles:', error);
    }
  };

  const fetchFixtures = async () => {
    try {
      const res = await axios.get(`${api}/fixtures/latest`);
      setFixtures(res.data);
    } catch (error) {
      console.error('Error fetching Latest fixtures:', error);
    }
  };

  const fetchHighlight = async () => {
    try {
      const res = await axios.get(`${api}/fixtures/latest-highlight`);
      setHighlight(res.data);
    } catch (error) {
      console.error('Error fetching Latest fixtures:', error);
    }
  };

  const fetchTeams = () => {
    axios
      .get(`${api}/table`)
      .then((res) => {
        setTeams(res.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  const fetchMatches = () => {
    axios
      .get(`${api}/schedule`)
      .then((res) => {
        setMatches(res.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  useEffect(() => {
    fetchArticles();
    fetchFixtures();
    fetchHighlight();
    fetchTeams();
    fetchMatches();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home articles={articles} fixtures={fixtures} highlight={highlight} />}
        />
        <Route path="news" element={<Navigate to="/news/page/1" />} />
        <Route path="news/page/:page" element={<News />} />
        <Route path="article/:id" element={<ShowArticle />} />
        <Route path="fixtures/:id" element={<Fixture />} />
        <Route path="fixtures/highlights" element={<Highlights />} />
        <Route path="table" element={<Table teams={teams} />} />
        <Route path="schedule" element={<Schedule matches={matches} />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="posts" element={<Posts />} />
        <Route path="article/edit" element={<ArticleForm />} />
        <Route path="article/edit/:id?" element={<ArticleForm />} />
      </Route>
    </Routes>
  );
};

export default App;
