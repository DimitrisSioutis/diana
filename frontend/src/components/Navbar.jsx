import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='h-20 w-full flex justify-between '>
        <ul className='list-none w-2/4 min-w-[450px]  flex items-center bg-slate-50 px-8' style={{clipPath:'polygon(0 0, 95% 0, 100% 100%, 0% 100%)'}}>
          <Link to={'/news'}><li className='p-10 tracking-tighter'>ΝΕΑ</li></Link>
          <Link to={'/news'}><li className='p-10 tracking-tighter'>ΟΜΑΔΑ</li></Link>
          <Link to={'/news'}><li className='p-10 tracking-tighter'>ΑΚΑΔΗΜΙΑ</li></Link>
        </ul>
        <Link className='w-24 scale-125 relative -top-4' to={'/'}><img src="/public/logo.svg" alt="logo"  /></Link>
        <ul className='list-none w-2/4 min-w-[400px] flex items-center bg-slate-50 justify-end px-8' style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0% 100%)'}}>
          <li className='p-4'><FaInstagram className=" hover:text-rose-500" size="20px"/></li>
          <li className='p-4'><FaFacebook className=" hover:text-rose-500" size="20px"/></li>
          <li className='p-4'><FaYoutube className=" hover:text-rose-500" size="20px"/></li>
        </ul>
    </header>
  )
}

export default Navbar