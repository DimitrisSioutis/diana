import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { FaFacebookF ,FaYoutube ,  FaInstagram } from "react-icons/fa";

function Navbar() {
  return (
    <header className="w-full h-20 m-0 flex bg-gray-900 justify-around z-50">
        <div className="">
            <Link to={'/'} className='cursor-pointer'><Logo/></Link>
        </div>
        <nav className="h-full">
            <ul className='flex h-full'>
                <li className='h-full w-32 flex items-center justify-center text-gray-300 '><Link to={'/news'}>Νέα</Link></li>
                <li className='h-full w-32 flex items-center justify-center text-gray-300 '><Link to={'/team'}>Ομάδα</Link></li>
                <li className='h-full w-32 flex items-center justify-center text-gray-300 '><Link to={'/academy'}>Ακαδημία</Link></li>
            </ul>
        </nav>
        <div className="flex items-center space-x-8 bg-gray-900 p-2">
            <a href="#" className="text-white hover:text-red-500">
                <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-white hover:text-red-500">
                <FaInstagram size={24} />
            </a>
            <a href="#" className="text-white hover:text-red-500">
                <FaYoutube size={24} />
            </a>
        </div>
    </header>
  )
}

export default Navbar