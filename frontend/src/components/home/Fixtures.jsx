import React from 'react'
import { Link } from 'react-router-dom';

const Fixtures = ({fixtures}) => {


  return (
    <section className='bg-slate-300 py-16'>

    <div className='w-5/6  m-auto'>
      <Link to={'/fixtures'}><h2 className='text-2xl text-slate-950 py-16'>ΑΓΩΝΕΣ</h2></Link>
      <div id='fixtures' className='grid grid-cols-4 gap-8 '>
        {fixtures.map((fixture, index) =>
          <Link key={index} to={`/fixtures/${fixture._id}`}>
            <div className='h-92 bg-slate-50 flex flex-col items-center justify-center p-2 shadow-[rgba(0,_0,_0,_0.1)_0px_25px_50px_-12px]'>
              <h6 className={fixture.league === 'ΠΡΩΤΑΘΛΗΜΑ' ? 'text-rose-600 text-xs pt-4' : 'text-blue-300 text-xs pt-4'}>{fixture.league}</h6>
              <h5 className='text-slate-400 text-sm'>{fixture.date}</h5>
              <div className='flex pt-10 h-fit'>
                <img src={fixture.homeLogo} className='h-14'/>
                <img src={fixture.awayLogo} className='h-14'/>
                </div>
              <div className='flex p-4'>
                <h2>{fixture.home}</h2>
                <span className='pl-2 pr-2'>v</span>
                <h2>{fixture.away}</h2>
              </div>
              <div className='flex pb-10'>
                {fixture.score != null ? (
                  <>
                    <span className='p-2 bg-rose-600 text-slate-50 text-2xl'>{fixture.score.split('-')[0]}</span>
                    <span className='p-2 text-slate-300'>-</span> 
                    <span className='p-2 bg-rose-600 text-slate-50 text-2xl'>{fixture.score.split('-')[1]}</span>
                  </>
                ) : (
                  <>
                    Ώρα αγώνα
                  </>
                )}
              </div> 
            </div>
            </Link>
        )}
      </div>
    </div>

  </section>
  )
}

export default Fixtures