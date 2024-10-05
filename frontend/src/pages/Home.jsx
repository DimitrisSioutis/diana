import React, { useEffect, useRef } from 'react';
import Slider from '../components/home/Slider';
import ArticleGrid from '../components/home/ArticleGrid';

const Home = ({latestArticles}) => {
  const sectionRef = useRef(null);

  return (
    <div className="flex flex-col items-center">
      <Slider latestArticles={latestArticles}/>
      <ArticleGrid latestArticles={latestArticles}/>
    </div>
  );
};

export default Home;
