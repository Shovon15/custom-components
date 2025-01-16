'use client';

import './doubleSlide.css';
import React, { useState, useEffect } from 'react';

const DoubleSlide = () => {
  const [minValue, setMinValue] = useState(1000);
  const [maxValue, setMaxValue] = useState(4000);
  const [sliderMinValue, setSliderMinValue] = useState(0); // Minimum range value
  const [sliderMaxValue, setSliderMaxValue] = useState(5000); // Maximum range value
  const [gap, setGap] = useState(500);

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    if (maxValue - value >= gap) {
      setMinValue(value);
    }
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    if (value - minValue >= gap) {
      setMaxValue(value);
    }
  };

  const calculatePosition = (value) => {
    return ((value - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
  };

  useEffect(() => {
    const range = document.querySelector('.slider-track');
    const minTooltip = document.querySelector('.min-tooltip');
    const maxTooltip = document.querySelector('.max-tooltip');

    // Set slider track and tooltip positions
    range.style.left = `${calculatePosition(minValue)}%`;
    range.style.right = `${100 - calculatePosition(maxValue)}%`;
    minTooltip.style.left = `${calculatePosition(minValue)}%`;
    maxTooltip.style.left = `${calculatePosition(maxValue)}%`;
  }, [minValue, maxValue]);

  return (
    <div className='double-slider-box p-6 bg-gray-100 rounded-lg w-[800px] border '>
      <h3 className='range-title text-xl font-bold text-gray-700 mb-4'>
        Price Range
      </h3>
      <div className='range-slider relative w-full h-10'>
        {/* Slider track */}
        <span className='slider-track absolute top-1/2 transform -translate-y-1/2 h-2 bg-blue-500 rounded-full' />

        {/* Minimum slider */}
        <input
          type='range'
          min={sliderMinValue}
          max={sliderMaxValue}
          value={minValue}
          onChange={handleMinChange}
          className='absolute w-full appearance-none bg-transparent pointer-events-auto'
        />
        {/* Tooltip for minimum slider */}
        <div className='tooltip min-tooltip absolute top-0 -translate-y-6 px-2 py-1 bg-gray-700 text-white text-xs rounded-md'>
          ${minValue}
        </div>

        {/* Maximum slider */}
        <input
          type='range'
          min={sliderMinValue}
          max={sliderMaxValue}
          value={maxValue}
          onChange={handleMaxChange}
          className='absolute w-full appearance-none bg-transparent pointer-events-auto'
        />
        {/* Tooltip for maximum slider */}
        <div className='tooltip max-tooltip absolute top-0 -translate-y-6 px-2 py-1 bg-gray-700 text-white text-xs rounded-md'>
          ${maxValue}
        </div>
      </div>

      {/* Selected range */}
      <div className='text-lg font-medium text-gray-700 mt-4'>
        Selected Range: <span className='font-bold'>${minValue}</span> -{' '}
        <span className='font-bold'>${maxValue}</span>
      </div>
    </div>
  );
};

export default DoubleSlide;
