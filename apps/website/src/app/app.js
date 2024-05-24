import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About/AboutPage';
import AboutDesa from './pages/About/SejarahDesa';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound';
import News from './pages/News/NewsPage';
import NewsDetails from './pages/News/NewsDetails';
import VisiMisiDesa from './pages/About/VisiMisiDesa';
import StrukturDesa from './pages/About/StrukturDesa';
import Services from './pages/Services';
import AnnouncementDetails from './pages/Announcement/AnnouncementDetails';
import AnnouncementPage from './pages/Announcement/AnnouncementPage';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading dengan timeout, ganti dengan logika loading yang sebenarnya jika diperlukan
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Durasi loading dalam milidetik

    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on initial render
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <Route path="history" element={<AboutDesa />} />
                <Route path="visi-misi" element={<VisiMisiDesa />} />
                <Route path="struktur-organisasi" element={<StrukturDesa />} />
              </Route>
              <Route path="services" element={<Services />} />
              <Route path="news" element={<News />} />
              <Route path="news/:id" element={<NewsDetails />} />
              <Route path="announcement" element={<AnnouncementPage />} />
              <Route
                path="announcement/:id"
                element={<AnnouncementDetails />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
