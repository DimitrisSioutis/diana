import React from 'react'

const Sponsors = () => {

    const sponsors = new Array(8).fill({ title: 'Χορηγός', url: 'https://www.nike.com/gr/', logo:'https://zeevector.com/wp-content/uploads/Nike-Logo-PNG-White.png' })

  return (
    <section className='py-16 bg-customColor' id='sponsors'>
    <div className='w-5/6  m-auto'>
      <h2 className='text-2xl text-slate-50 py-16'>ΧΟΡΗΓΟΙ</h2>
      <div className='grid grid-cols-4 gap-40 '>
        {sponsors.map((sponsor, index) =>
          <a key={index} href={sponsor.url} target='_blank'><img src={sponsor.logo}/></a>
        )}
      </div>
    </div>
  </section>

  )
}

export default Sponsors