import React from 'react'
import ArticleGridSkeleton from '../skeletons/ArticleGridSkeleton'

const ArticleGrid = ({ latestArticles}) => {
    const articles = latestArticles.filter((article,index)=>index>=3 && index<10)
    return (

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {(articles.length === 0) ? (
              <ArticleGridSkeleton />
            ) : (
            articles.map((article, index) => (
              <div
                key={index}
                className="bg-white shadow rounded p-4 flex flex-col items-center"
              >
                {/* Thumbnail image */}
                <img
                  src={article.img} 
                  alt={article.title}
                  className="w-full h-48 object-cover mb-2 rounded-t"
                />

                {/* Date */}
                <p className="text-sm text-gray-500 mb-2">
                  {article.date} {/* Format the date appropriately */}
                </p>

                {/* Title */}
                <h2 className="text-lg font-bold text-center">
                  {article.title}
                </h2>
              </div>
            )))}
          </section>

        )
}

export default ArticleGrid