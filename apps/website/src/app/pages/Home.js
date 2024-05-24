import React, { useEffect, useState } from 'react';
import Slideshow from '../components/Slideshow';
import NewsGrid from '../components/NewsGrid';
import Information from '../components/Information';
import Announcement from '../components/Announcement';

const Home = () => {
  const [count, setCount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setCount(6); // Change count to 8 for screen sizes md and above
      } else {
        setCount(4); // Change count to 4 for screen sizes below md
      }
    };

    handleResize(); // Call once to set the initial state

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex relative flex-col">
      <Slideshow />
      <Information />
      <Announcement count={5} />
      <NewsGrid count={count} />
    </div>
  );
};

export default Home;
