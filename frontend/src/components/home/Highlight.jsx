import React from 'react'
import { Link } from 'react-router-dom';

const Highlight = ({highlight}) => {

  return (
    <section id='highlights' className='py-16' style={{backgroundColor:'#151e2d'}}>
        <div className='w-5/6 m-auto '>
        <Link to={'/fixtures/highlights'}><h2 className='text-2xl text-slate-50 py-16'>ΣΤΙΓΜΙΟΤΥΠΑ</h2></Link>
        <div className='flex'>
        <iframe className='w-[40svw] h-[22.5svw]' src={highlight.highlights} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <div className='flex items-center justify-center w-[50%] text-[1.5svw]'>
            <span className='text-slate-50 '>Highlights&nbsp;:&nbsp;&nbsp;&nbsp;</span>
            <Link to={`/fixtures/${highlight._id}`}><span className='text-rose-600 hover:underline'>{highlight.home}&nbsp;v&nbsp;{highlight.away}&nbsp;&nbsp;&nbsp;{highlight.score}</span></Link>
        </div>
        </div>
        </div>
    </section>
  )
}

export default Highlight