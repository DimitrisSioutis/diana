import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

const News = () => {
  const { page: pageString } = useParams();
  const page = parseInt(pageString, 10);
  const navigate = useNavigate();
  const location = useLocation();
  const [articlesMap, setArticlesMap] = useState(new Map());
  const [lastPage, setLastPage] = useState(1);
  const [viewLimit, setViewLimit] = useState(2);
  const { ref: observerRef, inView } = useInView({
    threshold: 0.9,
    triggerOnce: false,
  });

  const api = import.meta.env.VITE_API_URL;

  const fetchArticles = async (pageNum) => {
    if (!articlesMap.has(pageNum)) {
      try {
        const res = await axios.get(`${api}/articles/page?page=${pageNum}`);
        setArticlesMap((prev) => new Map(prev).set(pageNum, res.data.articles));
        setLastPage(Math.ceil(res.data.count / 10));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    }
  };

  // Fetch articles when page changes
  useEffect(() => {
    fetchArticles(page);
  }, [location]);

  // Handle infinite scroll or load more articles
  useEffect(() => {
    if (inView && articlesMap.get(page)?.length >= viewLimit) {
      setViewLimit((prevLimit) => prevLimit + 2);
    }
  }, [inView]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center">
        {articlesMap.has(page) ? (
          articlesMap
            .get(page)
            .slice(0, viewLimit)
            .map((article, index) => (
              <div
                ref={index === viewLimit - 1 ? observerRef : null}
                key={article._id}
                className="w-full md:w-7/10 h-96 lg:w-7/10 p-4 flex flex-col md:flex-row bg-white shadow-md rounded-lg my-4"
              >
                <div
                  className="md:w-1/2 w-full md:h-auto bg-cover bg-center rounded-l-lg overflow-hidden"
                  style={{ backgroundImage: `url(${article.thumbnail})` }}
                >
                  <img src={article.thumbnail} alt={article.title} className="hidden" />
                </div>
                <div className="md:w-1/2 w-full p-4 flex flex-col justify-between">
                  <div>
                    <Link to={`/articles/${article._id}`}>
                      <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                    </Link>
                    <p className="text-gray-500 mb-4">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">{article.desc}</p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p>Loading articles...</p>
        )}
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        {page > 1 && (
          <button
            onClick={() => navigate(`/news/page/${page-1}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Προηγούμενη
          </button>
        )}

        {page < lastPage && (
          <button
            onClick={() =>  navigate(`/news/page/${page+1}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Επόμενη
          </button>
        )}
      </div>
    </div>
  );
};

export default News;