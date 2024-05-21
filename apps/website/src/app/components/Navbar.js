import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RawaingIcon from '../../assets/img/output-onlinepngtools.png';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import {
  ExpandMore,
  PortraitOutlined,
  HomeOutlined,
  SupportAgentOutlined,
  InfoOutlined,
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const useActiveRoute = () => {
    const location = useLocation();
    return location.pathname;
  };
  const activeRoute = useActiveRoute();

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
    // console.log('Navbar rendered');
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // console.log('Navbar unmounted');
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
      <Link
        // onClick={navigate('/')}
        to="/"
        className="flex text-sm gap-x-1 cursor-pointer"
      >
        <img src={RawaingIcon} alt="" className="w-6 h-8" />
        <div className="flex flex-col ">
          <span className="leading-none font-bold">Desa Rawang</span>
          <span className="leading-none">Kota Pariaman</span>
        </div>
      </Link>
      <div
        id="navbar"
        className="absolute bg-white left-0 right-0 w-fit py-2 px-6 ring-1 ring-zinc-900/5 rounded-full shadow-lg shadow-zinc-800/5 hidden text-sm sm:block sm:mx-auto"
      >
        <div className="flex gap-x-4">
          <Link
            to="/"
            className={
              activeRoute === '/' ? 'text-cyan-500 transition duration-500' : ''
            }
          >
            Beranda
          </Link>
          <Link
            to="/about"
            className={
              activeRoute === '/about'
                ? 'text-cyan-500 transition duration-500'
                : ''
            }
          >
            Profil Desa
          </Link>
          <Link
            to="/services"
            className={
              activeRoute === '/services'
                ? 'text-cyan-500 transition duration-500'
                : ''
            }
          >
            Layanan
          </Link>
          <Link
            to="/news"
            className={
              activeRoute === '/news'
                ? 'text-cyan-500 transition duration-500'
                : ''
            }
          >
            Informasi
          </Link>
        </div>
      </div>
      <div className="absolute gap-x-4 flex top-0 right-0 px-4">
        <div className="py-2 my-auto">
          <Menu>
            <MenuButton className="ring-1 bg-white ring-zinc-900/5 shadow-lg shadow-zinc-800/5 rounded-full py-3 px-4 flex leading-none text-xs font-medium text-zinc-800 text-center items-center sm:hidden">
              Menu
              <ExpandMore fontSize="xs" />
            </MenuButton>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6  [--anchor-gap:var(--spacing-1)] focus:outline-none"
              >
                <MenuItem>
                  <Link
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                    to="/"
                  >
                    <HomeOutlined fontSize="small" />
                    Beranda
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                    to="/about"
                  >
                    <PortraitOutlined fontSize="small" />
                    Profil Desa
                  </Link>
                </MenuItem>

                <MenuItem>
                  <Link
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                    to="/services"
                  >
                    <SupportAgentOutlined fontSize="small" />
                    Layanan
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                    to="/news"
                  >
                    <InfoOutlined fontSize="small" />
                    Informasi
                  </Link>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
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
