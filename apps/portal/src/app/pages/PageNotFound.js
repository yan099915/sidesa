import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/animation/404NotFound.json';
export default function PageNotFound() {
  return (
    <div className="flex justify-center items-center content-center">
      <Lottie
        speed={2.5}
        animationData={animationData}
        height={100}
        width={100}
        className="w-full"
      />
    </div>
  );
}
