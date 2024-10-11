import React from 'react'
import { Link } from 'react-router-dom';

const Articles = ({articles}) => {
  return (
    <section id='articles' className="grid grid-cols-4 gap-8 w-5/6 m-auto py-16 ">
    {articles.map((article, index) =>
      <Link key={index} to={`/article/${article._id}`}><article className='h-96 bg-slate-50 shadow-[rgba(0,_0,_0,_0.1)_0px_1px_2px_0px]'>
        <img className='h-3/4' src={article.thumbnail} />
        <p className='text-xs text-slate-600 ml-4 pt-2 font-thin'>{article.createdAt}</p>
        <h2 className='text-2xl pt-2 ml-4'>{article.title}</h2>
      </article>
      </Link>
    )}
    </section>
  )
}

export default Articles