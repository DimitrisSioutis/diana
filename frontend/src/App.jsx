import React, {useState,useEffect} from 'react'
import Home from './pages/Home'
import News from './pages/News'
import ShowArticle from './pages/ShowArticle'
import Article from './pages/Article'
import DeleteArticle from './pages/DeleteArticle'
import {Routes,Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminDashboard from './pages/AdminDashboard'
import axios from 'axios'
import Login from './pages/Login'
import SignUp from './pages/Signup'

const App = () => {

  const api = import.meta.env.VITE_API_URL;
  const [latestArticles, setLatestArticles] = useState([]);

  const fetchFirstArticles = async () => {
    try {
      const res = await axios.get(`${api}/articles/latest`);
      setLatestArticles(res.data);
    } catch (error) {
      console.error('Error fetching first articles:', error);
    }
  };



  useEffect(() => {
    fetchFirstArticles();
  }, []);


  return (
    <div className="flex flex-col min-h-screen" >
      <Navbar />
      <main className="flex-1 bg-gray-200" style={{ minHeight: 'var(--main-height)' }}>
      <Routes>
          <Route path="/" element={<Home latestArticles={latestArticles}/>}/>
          <Route path="/news" element={<Navigate to="/news/page/1" />} />
          <Route path="/news/page/:currentPage?" element={<News />} />
          <Route path="/articles/:id" element={<ShowArticle />} />
          <Route path="/articles/edit/:id?" element={<Article />} />
          <Route path="/articles/delete/:id" element={<DeleteArticle />} />
          <Route path="/team" element={<AdminDashboard />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
        </Routes>
      </main>
      <Footer />
    </div>

  )
}

export default App;