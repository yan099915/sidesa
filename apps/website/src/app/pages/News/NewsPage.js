import React, { useEffect } from 'react';
import NewsGrid from '../../components/NewsGrid';
import { Outlet } from 'react-router-dom';

export default function News() {
  // Scroll to top on initial render
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div>
      <NewsGrid count={9} />
    </div>
  );
}
