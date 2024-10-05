import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';

const News = () => {
  const { page } = useParams(); // Get page param from URL
  const navigate = useNavigate();
  const [articlesMap, setArticlesMap] = useState(new Map());
  const [lastPage, setLastPage] = useState(1);
  const [viewLimit, setViewLimit] = useState(2);
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10) || 1);
  const { ref: observerRef, inView } = useInView({
    threshold: 0.9,
    triggerOnce: false,
  });

  const api = import.meta.env.VITE_API_URL;

  // Fetch articles when the currentPage changes
  const fetchArticles = async (pageNumber) => {
    console.log("Fetching articles for page:", pageNumber); // Check if this logs
    if (!articlesMap.has(pageNumber)) {
      try {
        const res = await axios.get(`${api}/articles/page?page=${pageNumber}`);
        setArticlesMap((prev) => new Map(prev).set(pageNumber, res.data.articles));
        setLastPage(Math.ceil(res.data.count / 10));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    } else {
      console.log(`Page ${pageNumber} already fetched, using cache.`);
    }
  };

  // Synchronize currentPage state with the URL parameter
  useEffect(() => {
    const newPage = parseInt(page, 10) || 1;
    setCurrentPage(newPage);
  }, [page]);

  // Fetch articles when currentPage changes
  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  // Handle infinite scroll or load more articles
  useEffect(() => {
    if (inView && articlesMap.get(currentPage)?.length >= viewLimit) {
      setViewLimit((prevLimit) => prevLimit + 2);
    }
  }, [inView]);

  // Pagination controls
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    navigate(`/news/page/${newPage}`); // Update URL with new page number
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center">
        {articlesMap.has(currentPage) ? (
          articlesMap
            .get(currentPage)
            .slice(0, viewLimit)
            .map((article, index) => (
              <div
                ref={index === viewLimit - 1 ? observerRef : null}
                key={article._id}
                className="w-full md:w-7/10 h-96 lg:w-7/10 p-4 flex flex-col md:flex-row bg-white shadow-md rounded-lg my-4"
              >
                <div
                  className="md:w-1/2 w-full md:h-auto bg-cover bg-center rounded-l-lg overflow-hidden"
                  style={{ backgroundImage: `url(${article.img})` }}
                >
                  <img src={article.img} alt={article.title} className="hidden" />
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
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Previous
          </button>
        )}

        {currentPage < lastPage && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default News;
