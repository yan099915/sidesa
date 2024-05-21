import React, { useEffect, useRef, useState } from 'react';
import { Instagram, YouTube, Facebook, North } from '@mui/icons-material';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleScroll = () => {
    setLastScrollY(window.scrollY);
    if (typeof window !== 'undefined') {
      if (window.scrollY > 100) {
        // if scrolling down, hide the navbar
        setIsVisible(true);
      } else {
        // if scrolling up, show the navbar
        setIsVisible(false);
      }

      // remember the current page location for the next move
      setLastScrollY(window.scrollY);
    }
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="relative flex overlow-hidden flex sm:flex-row flex-col content-center justify-center justify-self-end sm:gap-20 w-full bottom-0 border-t border-zinc-900/10 p-6">
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col gap-2 w-full sm:w-2/4 sm:p-4 items-center sm:items-start mx-auto sm:mx-0"
        >
          <div className="flex text-sm  gap-x-1">
            <img
              src="../../assets/img/output-onlinepngtools.png"
              alt=""
              className="w-6 h-8"
            />
            <div className="flex flex-col">
              <span className="leading-none font-semibold">Desa Rawang</span>
              <span className="leading-none font-light">Kota Pariaman</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-row w-full gap-16 p-4 items-center sm:items-start items-stretch"
        >
          <div className="flex flex-col gap-y-2">
            <h2 className="font-bold ">Tautan</h2>
            <ul className="text-xs space-y-2 text-black/80">
              <li>
                <Link to="/">Beranda</Link>
              </li>
              <li>
                <Link to="/about">Profil Desa</Link>
              </li>
              <li>
                <Link to="/services">Layanan</Link>
              </li>
              <li>
                <Link to="/news">Informasi</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="font-bold">Kontak</h2>
            <ul className="text-xs space-y-2 text-black/80">
              <li>
                <p>Telp: 293-1203-1231</p>
              </li>
              <li>
                <p>Email: cs@desa-rawang.com</p>
              </li>

              <li>
                <p>Alamat: Desa Rawang No.123</p>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
      <div className="flex overflow-hidden border-t justify-between mx-4 py-6 gap-x-4 border-zinc-900/10 items-stretch">
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col text-[10px] sm:text-xs font-semibold text-black/80 text-center justify-center"
        >
          <span>© 2024 Binus University. All rights reserved.</span>
        </motion.div>
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-row text-[10px] sm:text-xs font-semibold text-black/80 text-center justify-center items-center gap-x-2"
        >
          <a href="https://www.facebook.com">
            <Facebook />
          </a>
          <a href="https://www.instagram.com">
            <Instagram />
          </a>
          <a href="https://www.youtube.com">
            <YouTube />
          </a>
        </motion.div>
        <button
          onClick={backToTop}
          className={`fixed  right-6 bottom-20 ring ring-zinc-900/60 text-zinc-900/60 font-bold h-10 rounded-full animate-bounce ${
            isVisible ? 'block' : 'hidden'
          }`}
        >
          <North fontSize="lg" className="stroke-black stoke-2" />
        </button>
      </div>
    </>
  );
}
