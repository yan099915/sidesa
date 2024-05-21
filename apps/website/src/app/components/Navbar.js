import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RawaingIcon from '../../assets/img/output-onlinepngtools.png';
const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    // if (window.scrollY > lastScrollY) {
    //   // Scrolling down
    //   setIsVisible(false);
    // } else {
    //   // Scrolling up
    //   setIsVisible(true);
    // }
    setLastScrollY(window.scrollY);
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // if scrolling down, hide the navbar
        setIsVisible(false);
      } else {
        // if scrolling up, show the navbar
        setIsVisible(true);
      }

      // remember the current page location for the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    console.log('Navbar rendered');
    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('Navbar unmounted');
    };
  }, []);

  // console.log(isVisible, lastScrollY);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 1 }}
      className={`relative flex p-4 fixed w-full top-0 z-10 transition-transform duration-300 ${
        isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
      }`}
    >
      <div className="flex text-sm gap-x-1">
        <img src={RawaingIcon} alt="" className="w-6 h-8" />
        <div className="flex flex-col ">
          <span className="leading-none font-bold">Desa Rawang</span>
          <span className="leading-none">Kota Pariaman</span>
        </div>
      </div>
      <div
        id="navbar"
        className="absolute bg-white left-0 right-0 w-fit py-2 px-6 ring-1 ring-zinc-900/5 rounded-full shadow-lg shadow-zinc-800/5 hidden text-sm sm:block sm:mx-auto"
      >
        <div className="flex gap-x-4">
          <Link to="/">Beranda</Link>
          <Link to="/about">Profil Desa</Link>
          <Link to="/about/desa">Layanan</Link>
          <Link to="/about/desa">Informasi</Link>
        </div>
      </div>
      <div className="absolute gap-x-4 flex top-0 right-0 px-4">
        <div className="py-2 my-auto">
          <button className="ring-1 bg-white ring-zinc-900/5 shadow-lg shadow-zinc-800/5 rounded-full py-3 px-4 flex leading-none text-xs font-medium text-zinc-800 text-center items-center sm:hidden">
            Menu
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#5f6368"
            >
              <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
          </button>
        </div>
        <div className="text-center my-auto">
          <p className="text-[9px]">Tombol</p>
          <button className="flex shadow-lg bg-white shadow-zinc-800/5 mx-auto text-red-400 ring-1 ring-zinc-900/5  w-7 h-7 rounded-full justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="currentColor"
            >
              <path d="M200-160v-80h64l79-263q8-26 29.5-41.5T420-560h120q26 0 47.5 15.5T617-503l79 263h64v80H200Zm148-80h264l-72-240H420l-72 240Zm92-400v-200h80v200h-80Zm238 99-57-57 142-141 56 56-141 142Zm42 181v-80h200v80H720ZM282-541 141-683l56-56 142 141-57 57ZM40-360v-80h200v80H40Zm440 120Z" />
            </svg>
          </button>
          <p className="text-[9px] ">Darurat</p>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
