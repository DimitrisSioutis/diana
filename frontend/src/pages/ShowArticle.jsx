import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const ShowArticle = () => {
  
  const api = import.meta.env.VITE_API_URL;

  const {id} = useParams();
  const [article,setArticle] = useState('')
  const [y,setY] = useState('')

  useEffect(() => {
    axios.get(`${api}/articles/${id}`)
      .then((res) => {
        setArticle(res.data)
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

   const handleScroll = (e) => {
    setY(window.scrollY)
   }

   useEffect(() => {
 
     window.addEventListener('scroll', handleScroll);
 
     return () => {
       window.removeEventListener('scroll', handleScroll);
     };
   }, []);


   return (
    <div className='flex justify-center w-full '>
      {!article ? (
        <div>loading...</div>
      ) : (
        <>
          {/* Background Image Div */}
          <div 
            className="fixed w-full h-[90vh] top-0 left-0 bg-cover bg-center z-10" 
            style={{ backgroundImage: `url(${article.img})` }}
          ></div>
  
          {/* Article Content Div */}
          <div 
            className="relative min-h-[100vh] mx-auto bg-white shadow-md rounded-lg mt-12 transform transition-transform z-20"
            style={{ transform: `translateY(${-y}px)` }}
          >
            <div className="p-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{article.title}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-sm text-gray-500">
                  <p><span className="font-medium text-gray-700">{article.createdAt}</span></p>
                  <p>{article.date}</p>
                </div>
              </div>
              <div className="prose prose-lg text-gray-700">
                {article.body}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
  
};


export default ShowArticle