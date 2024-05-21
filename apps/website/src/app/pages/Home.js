import React from 'react';
import Slideshow from '../components/Slideshow/Slideshow';
import NewsGrid from '../components/NewsGrid';

const Home = () => {
  return (
    <div className="flex relative flex-col">
      <Slideshow />
      <NewsGrid />
    </div>
  );
};

export default Home;
