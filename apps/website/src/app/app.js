import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AboutDesa from './pages/AboutDesa';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import Footer from './components/Footer';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading dengan timeout, ganti dengan logika loading yang sebenarnya jika diperlukan
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Durasi loading dalam milidetik

    return () => clearTimeout(timer);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative flex flex-col h-screen h-min-screen  border-red-500 ">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />}>
                <Route path="desa" element={<AboutDesa />} />
              </Route>
              <Route path="*" element={<div>404 Page Not Found</div>} />
            </Routes>
            {/* <div className="flex flex-col">
              <button
                data-tooltip-target="tooltip-default"
                type="button"
                class="h-screen text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Default tooltip
              </button>
              <button
                data-tooltip-target="tooltip-default"
                type="button"
                class="h-screen text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Default tooltip
              </button>
            </div> */}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
