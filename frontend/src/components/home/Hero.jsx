import React from 'react'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id='hero' className='h-[40svw] bg-slate-50 flex pt-2'>
    <div
      className="h-100 w-full"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    ></div>
      <div className="h-100 w-full bg-slate-50 flex justify-center items-center">
        <h1 className='text-[2.5svw] w-3/4 tracking-tighter text-slate-950 h-fit'>Inside: The unwavering support of our supporters against Arsenal</h1>
        <button></button>
      </div>
    </section>
  )
}

export default Hero