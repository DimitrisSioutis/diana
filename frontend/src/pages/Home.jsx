import React from 'react'
import Hero from '../components/home/Hero';
import Articles from '../components/home/Articles';
import Highlight from '../components/home/Highlight';
import Fixtures from '../components/home/Fixtures';
import Sponsors from '../components/home/Sponsors';

// eslint-disable-next-line react/prop-types
const Home = ({articles,fixtures,highlight}) => {

  return (
    <div className='bg-slate-50'>
      <Hero/>
      <Articles articles={articles}/>
      <Highlight highlight={highlight}/>
      <Fixtures fixtures={fixtures}/>
      <Sponsors />
    </div>
  )
}

export default Home