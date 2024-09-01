import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/animation/Lambang_Kota_Pariaman.json';

const Loading = () => {
  const style = {
    height: 300,
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie
        speed={2.5}
        animationData={animationData}
        height={100}
        width={100}
        className="w-20"
      />
      <div className="flex flex-col justify-center">
        <span className="font-bold leading-none text-xl">Desa Rawang </span>
        <span className="leading-none text-xl">Kota Pariaman</span>
      </div>
    </div>
  );
};

export default Loading;
