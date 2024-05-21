import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <Link to="/">Go to Home Page</Link>
      <br />
      <Link to="/about/desa">Go to About Desa</Link>
      <Outlet />
    </div>
  );
};

export default About;
