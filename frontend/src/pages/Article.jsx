import React, { useState, useEffect } from 'react';
import {useParams, Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { IoChevronBackSharp } from "react-icons/io5";
import Spinner from '../components/Loading';

const Article = () => {
  const api = import.meta.env.VITE_API_URL;
  const { id } = useParams(); // Extract ID from URL
  const [article, setArticle] = useState({title: '',desc: '',body: '',img: ''});
  const [loading,setLoading] = useState(true)
  const navigate = useNavigate();


  useEffect(() => {
    if (id) {
      axios.get(`${api}/articles/${id}`)
      .then((res) => {
        setArticle(res.data);
        setLoading(false);  
      })
      .catch((error) => {
        console.log('Error:', error);
        setLoading(false);
      });
    }
    setLoading(false)
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setArticle(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) =>{
    if (id){
      axios.put(`${api}/articles/${id}`)
      .then(()=>{
        navigate('/')
      }).catch((error)=>{
        console.log(error)
      })
    }

    axios.post(`${api}/articles`,article)
    .then(()=>{
      navigate('/')
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (

    <>
    {loading ? <Spinner/> :
      <>
        <Link to='/'><IoChevronBackSharp /></Link>
        <form onSubmit={handleSave} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/4'>
            <div className='mb-4'>
              <label htmlFor="title" className='block text-gray-700 text-sm font-bold mb-2'>Title:</label>
              <input
                type="text"
                name='title'
                value={article.title}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="desc" className='block text-gray-700 text-sm font-bold mb-2'>Description:</label>
              <input
                type="text"
                name='desc'
                value={article.desc}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="body" className='block text-gray-700 text-sm font-bold mb-2'>Body:</label>
              <textarea
                name='body'
                value={article.body}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="img" className='block text-gray-700 text-sm font-bold mb-2'>Image URL:</label>
              <input
                type="text"
                name='img'
                value={article.img}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='flex items-center justify-between'>
              <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                Save
              </button>
            </div>
          </form>
        </>
      }
    </>
   
  );
};

export default Article;
