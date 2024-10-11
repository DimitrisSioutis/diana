import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Loading';

const ShowArticle = () => {
  const api = import.meta.env.VITE_API_URL;
  const { id } = useParams(); // Extract ID from URL
  const [article, setArticle] = useState({ title: '', desc: '', body: '', img: '' });
  const [loading, setLoading] = useState(true)


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

  return (

    <>
      {loading ? <Spinner /> :
        <>
          <img src={article.thumbnail} className='w-full w-max-1700px m-auto' />
          <div className='h-[50svh] bg-slate-300'></div>
          <div className='absolute p-20 top-[20svw] w-2/4 left-1/4 bg-slate-50'>
            <h1>{article.title}</h1>
            <h2 className='asty-medium text-slate-500'>{article.desc}</h2>
            <p className='asty-thin'>
              {article.body}
            </p>
          </div>
        </>
      }
    </>

  );
};

export default ShowArticle;
