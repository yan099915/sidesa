import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

export default function Slideshow() {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    {
      id: 1,
      src: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
      title: 'Image 1 Title',
    },
    {
      id: 2,
      src: 'https://wallpapers.com/images/hd/4k-uhd-t8x1homi8k4apw14.jpg',
      title: 'Image 2 Title',
    },
    {
      id: 3,
      src: 'https://wallpapers.com/images/hd/3840x2160-uhd-4k-desktop-m3acjtm12kbg7mx3.jpg',
      title: 'Image 3 Title',
    },
  ];

  const variants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-96 sm:min-h-screen overflow-hidden">
      <AnimatePresence initial={false}>
        {images.map((image, index) => (
          <motion.div
            className="w-full h-screen flex absolute"
            key={index}
            variants={variants}
            initial="enter"
            animate={imageIndex === index ? 'center' : 'enter'}
            exit="exit"
            transition={{
              opacity: { duration: 1 },
            }}
          >
            <img
              className="h-full w-full object-cover"
              src={image.src}
              alt={`Slideshow Image ${index}`}
            />
            {imageIndex === index && (
              <div className="absolute bottom-48 sm:bottom-32 left-1/2 transform -translate-x-1/2 text-center text-white z-20 p-4">
                <h1 className="text-lg sm:text-3xl font-semibold mb-2">
                  {image.title}
                </h1>
                <button
                  onClick={(e) => console.log(e)}
                  className=" text-xs border-2 text-white rounded-md px-3 py-1 sm:px-4 sm:py-2 hover:bg-gray-200/30"
                >
                  Baca Selengkapnya
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer bg-white rounded-full h-8 w-8 flex justify-center items-center shadow-lg">
        <NavigateNext
          onClick={() => setImageIndex((prev) => (prev + 1) % images.length)}
        />
      </div>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer bg-white rounded-full h-8 w-8 flex justify-center items-center shadow-lg">
        <NavigateBefore
          onClick={() =>
            setImageIndex((prev) => (prev - 1 + images.length) % images.length)
          }
        />
      </div>
    </div>
  );
}
