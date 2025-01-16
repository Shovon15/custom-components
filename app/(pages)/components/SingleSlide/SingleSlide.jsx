'use client';
import React, { useState } from 'react';

const SingleSlide = () => {
  const [value, setValue] = useState(50); // Default value is 50

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className='flex flex-col items-center space-y-4'>
      <input
        type='range'
        min='0'
        max='100'
        value={value}
        onChange={handleChange}
        className='w-64 h-3 appearance-none bg-gray-300 rounded-lg cursor-pointer'
        style={{
          // Custom styling for the track and thumb
          accentColor: '#3b82f6', // This controls the thumb color for supported browsers
        }}
      />

      <div className='text-lg font-medium text-black'>
        Value: <span className='font-bold'>{value}</span>
      </div>
    </div>
  );
};

export default SingleSlide;

// <style jsx>{`
//         input[type='range']::-webkit-slider-runnable-track {
//           height: 10px; /* Adjust track height */
//         }
//         input[type='range']::-webkit-slider-thumb {
//           width: 20px; /* Adjust thumb width */
//           height: 20px; /* Adjust thumb height */
//           background-color: #3b82f6; /* Thumb color */
//           border-radius: 50%; /* Make thumb circular */
//           border: 2px solid #1e3a8a; /* Add a border */
//           cursor: pointer;
//           -webkit-appearance: none;
//         }
//         input[type='range']:focus::-webkit-slider-thumb {
//           box-shadow: 0 0 5px #3b82f6; /* Add focus effect on the thumb */
//         }
//         input[type='range']::-moz-range-thumb {
//           width: 20px;
//           height: 20px;
//           background-color: #3b82f6;
//           border-radius: 50%;
//           border: 2px solid #1e3a8a;
//           cursor: pointer;
//         }
//         input[type='range']::-ms-thumb {
//           width: 20px;
//           height: 20px;
//           background-color: #3b82f6;
//           border-radius: 50%;
//           border: 2px solid #1e3a8a;
//           cursor: pointer;
//         }
//       `}</style>
