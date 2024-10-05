import React from 'react';
import SliderSkeleton from '../skeletons/SliderSkeleton';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

const Slider = ({ latestArticles}) => {
  const articles = latestArticles.filter((article,index)=> index<3)
  const nextSlide = () => {
    console.log('next');
  };

  const prevSlide = () => {
    console.log('prev');
  };


  return (

    <div className="w-[90%] h-[86svh] bg-gray-200 flex items-center justify-center mb-8 mx-auto bg-white shadow rounded p-4 mt-4">
      {(articles.length === 0) ? (
        <SliderSkeleton />
      ) : (
      <div className="w-full h-full flex">
        <div className="w-1/2 h-full">
          <img
            src={articles[0].img}
            alt={articles[0].title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-1/2 h-full p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">{articles[0].title}</h2>
          <p className="text-sm text-gray-500 mb-4">{formatDate(articles[0].createdAt)}</p>
          <p className="text-lg">{articles[0].description}</p>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={prevSlide}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Previous
            </button>
            <button
              onClick={nextSlide}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      )}
    </div>

);
};

export default Slider;
