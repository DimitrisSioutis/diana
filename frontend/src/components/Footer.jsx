import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (

    <div className='w-5/6 m-auto py-16'>
      <div className='flex items-center'>
        <hr className='border-solid border-1 border-rose-600 w-full'/>
        <img className='w-20 mx-4' src='/logo.svg'/>
        <hr className='border-solid border-1 border-rose-600 w-full'/>
      </div>
      <div className="flex justify-around">
        <div>
          <h2 className='text-rose-600 py-4 text-sm'>ΔΙΑΝΑ ΗΛΙΟΥΠΟΛΗΣ :</h2>
          <ul>
            <li className='text-slate-50 py-2 arial text-sm hover:text-slate-300 hover:underline'>Νέα</li>
            <li className='text-slate-50 py-2 arial text-sm hover:text-slate-300 hover:underline'>Ομάδα</li>
            <li className='text-slate-50 py-2 arial text-sm hover:text-slate-300 hover:underline'>Ακαδημία</li>
          </ul>
        </div>
        <div>
          <h2 className='text-rose-600 py-4 text-sm'>ΕΠΙΚΟΙΝΩΝΙΑ :</h2>
          <ul>
            <li className='text-slate-50 py-2 arial text-sm hover:text-slate-50'>Email: <span className='text-slate-300 hover:text-slate-400 hover:underline'>mail@mail</span></li>
            <li className='text-slate-50 py-2 arial text-sm hover:text-slate-50'>Τηλέφωνο: <span className='text-slate-300 hover:text-slate-400 hover:underline'>210 2102 102</span></li>
            <li className='text-slate-50 py-2 arial text-sm hover:text-slate-50'>
              Τοποθεσία: 
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.281849509472!2d23.761757012324566!3d37.947204471825444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a197d56a250165%3A0xf605700a3ffda60f!2zzpInIM6TzpfOoM6VzpTOnyDOl86bzpnOn86lzqDOn86bzpfOow!5e0!3m2!1sel!2sgr!4v1727962279196!5m2!1sel!2sgr" width="250" height="250" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </li>
          </ul>
        </div>
        <div>
          <h2 className='text-rose-600 py-4 text-sm'>ΑΚΟΛΟΥΘΗΣΤΕ ΜΑΣ :</h2>
          <ul>
            <li className='py-3 flex justify-center items-center'>
              <FaInstagram className="text-slate-200 hover:text-rose-600" size="20px"/>
            </li>
            <li className='py-3 flex justify-center items-center'>
              <FaFacebook className="text-slate-200 hover:text-rose-600" size="20px"/>
            </li>
            <li className='py-3 flex justify-center items-center'>
              <FaYoutube className="text-slate-200 hover:text-rose-600" size="20px"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer