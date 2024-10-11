import React , {useState, useEffect} from 'react'
import axios from 'axios';

const Highlights = () => {

    const api = import.meta.env.VITE_API_URL;
    const [fixtures, setFixtures] = useState([])
    const fetchFixtures = async () => {
        try {
          const res = await axios.get(`${api}/fixtures/highlights`);
          setFixtures(res.data);
        } catch (error) {
          console.error('Error fetching Latest fixtures:', error);
        }
      };
    
      useEffect(() => {
        fetchFixtures();
      }, []);
    
  return (
    <>
        {fixtures.map((fixture,index)=>
            <div key={index} className='text-slate-50'>
                {fixture.highlights}
            </div>
        )}
    </>
  )
}

export default Highlights