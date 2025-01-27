'use client';
import React from 'react';
import SingleSlide from './components/SingleSlide/SingleSlide';
import DoubleSlide from './components/DoubleSlide/DoubleSlide';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Lottie from 'lottie-react';
import animationData from './components/lottie-files/lottie-file.json';

const HomePage = () => {
  return (
    <div>
      <SingleSlide />
      <DoubleSlide />
      {/* <DotLottieReact
      src="https://lottie.host/2ba68ff5-51df-499c-9aaa-e8764a1fb3b5/cQxdKwT12y.lottie"
      loop
      autoplay
    /> */}

      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: 300, height: 300 }}
        className=''
      />
    </div>
  );
};

export default HomePage;
