import React from 'react'

const SliderSkeleton = () => {
  return (
    <div className="w-full h-full flex">
        <div className="w-1/2 h-full">
        <div className="bg-gray-300 animate-pulse w-full h-full"></div>
        </div>
        <div className="w-1/2 h-full p-6 flex flex-col justify-center">
        <div className="bg-gray-300 animate-pulse h-8 w-3/4 mb-2"></div>
        <div className="bg-gray-300 animate-pulse h-4 w-1/2 mb-4"></div>
        <div className="bg-gray-300 animate-pulse h-6 w-full mb-4"></div>
        <div className="mt-6 flex space-x-4">
            <div className="bg-gray-300 animate-pulse h-10 w-24 rounded"></div>
            <div className="bg-gray-300 animate-pulse h-10 w-24 rounded"></div>
        </div>
        </div>
    </div>
  )
}

export default SliderSkeleton