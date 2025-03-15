"use client";
import React from "react";
import SingleSlide from "./components/SingleSlide/SingleSlide";
import DoubleSlide from "./components/DoubleSlide/DoubleSlide";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Lottie from "lottie-react";
import animationData from "./components/lottie-files/lottie-file.json";
import CardItems from "./components/Card/CardItems";
import Marquee from "./components/marquee/Marquee";
import TechSvg from "./components/svg/TechSvg";
import Image from "next/image";
import IntervalApiCall from "./components/IntervalApiCall/IntervalApiCall";
import UserAvatar from "./components/userAvatar/UserAvatar";

const HomePage = () => {
  return (
    <div className="border w-full">
      <div className="w-full mx-auto">
        {/* <SingleSlide />
        <DoubleSlide /> */}
      </div>
      {/* <DotLottieReact
      src="https://lottie.host/2ba68ff5-51df-499c-9aaa-e8764a1fb3b5/cQxdKwT12y.lottie"
      loop
      autoplay
    /> */}

      {/* <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: 300, height: 300 }}
        className=""
      />

      <CardItems />

      <Marquee /> */}
      {/* <TechSvg /> */}
      {/* <Image src={"./converted_image.svg"} alt="..." width={100} height={100} /> */}
      {/* <Image
        src={"./user-with-laptop.svg"}
        alt="..."
        width={1000}
        height={1000}
      /> */}

      <IntervalApiCall />

      <div className="my-5 flex items-center justify-center">
        <UserAvatar />
      </div>
    </div>
  );
};

export default HomePage;
