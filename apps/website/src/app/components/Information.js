import React from 'react';
import Lottie from 'lottie-react';
const potency = require('../../assets/animation/potency.json');
const finance = require('../../assets/animation/finance.json');
const construction = require('../../assets/animation/construction.json');
export default function Information() {
  return (
    <div className="my-8">
      <h1 className="text-center text-2xl font-bold my-4">
        INFOGRAFIS DESA RAWANG
      </h1>
      <div className="flex justify-evenly">
        <div className="flex flex-col cursor-pointer">
          <Lottie
            speed={2.5}
            animationData={potency}
            height={100}
            width={100}
            className="w-20 h-full sm:w-32 mx-auto"
          />
          <span className="font-bold leading-none text-sm text-center">
            Potensi Desa
          </span>
        </div>
        <div className="flex flex-col cursor-pointer">
          <Lottie
            speed={2.5}
            animationData={finance}
            height={100}
            width={100}
            className="w-20 h-full sm:w-32 mx-auto"
          />
          <span className="font-bold leading-none text-sm text-center">
            Keuangan Desa
          </span>
        </div>
        <div className="flex flex-col cursor-pointer">
          <Lottie
            speed={2.5}
            animationData={construction}
            height={200}
            width={100}
            className="w-20 h-full sm:w-32 mx-auto"
          />
          <span className="font-bold leading-none text-sm text-center">
            Pembangunan Desa
          </span>
        </div>
      </div>
    </div>
  );
}
