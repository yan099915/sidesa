import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { NavigateNext } from '@mui/icons-material';

const newsData = [
  {
    id: 1,
    title: 'Berita 1',
    image:
      'https://wallpapers.com/images/featured/aesthetic-pictures-hv6f88paqtseqh92.jpg',
    description: 'Deskripsi singkat berita 1.',
  },
  {
    id: 2,
    title: 'Berita 2',
    image:
      'https://cdn.pixabay.com/photo/2023/06/12/00/11/smartphone-8057248_1280.jpg',
    description: 'Deskripsi singkat berita 2.',
  },
  {
    id: 3,
    title: 'Berita 3',
    image:
      'https://i.pinimg.com/236x/b6/d3/17/b6d3177a526831702d0ecbd96b9a9b6f.jpg',
    description: 'Deskripsi singkat berita 3.',
  },
  {
    id: 4,
    title: 'Berita 4',
    image:
      'https://i.pinimg.com/564x/1b/c1/b9/1bc1b99972d680e32f9ff27e9c1ff7ab.jpg',
    description: 'Deskripsi singkat berita 4.',
  },
  {
    id: 5,
    title: 'Berita 5',
    image:
      'https://www.bhmpics.com/downloads/pinterest-aesthetic-Wallpapers/46.e613e7e9b5b94e7a1f3b03823a9292a7.jpg',
    description: 'Deskripsi singkat berita 5.',
  },
  {
    id: 6,
    title: 'Berita 6',
    image:
      'https://www.itl.cat/pngfile/big/287-2871746_iphone-sunflower-wallpaper-aesthetic.jpg',
    description: 'Deskripsi singkat berita 6.',
  },
  {
    id: 7,
    title: 'Berita 7',
    image: 'https://example.com/image7.jpg',
    description: 'Deskripsi singkat berita 7.',
  },
];

const NewsCard = ({ title, image, description, index }) => {
  const animationDirection = index % 2 === 0 ? 100 : -100;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg shadow-md overflow-hidden"
      variants={{
        hidden: { opacity: 0, x: animationDirection },
        visible: { opacity: 1, x: 0 },
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        <p className="text-gray-700 text-sm">{description}</p>
        <button className="flex ring-1 ring-zinc-900 text-xs sm:text-md p-1 rounded-md leading-none">
          Selengkapnya
          <NavigateNext fontSize="xs" />
        </button>
      </div>
    </motion.div>
  );
};

export default function NewsGrid() {
  const [visibleNewsCount, setVisibleNewsCount] = useState(6);

  const handleShowMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 6);
  };

  const handleShowAll = () => {
    setVisibleNewsCount(newsData.length);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Berita Terkini</h1>
        {visibleNewsCount < newsData.length && (
          <button
            onClick={handleShowAll}
            className=" text-xs sm:text-md ring-2 ring-zinc-900 rounded-md  py-1 px-4"
          >
            Lihat Semua Berita
            <NavigateNext fontSize="xs" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {newsData.slice(0, visibleNewsCount).map((news, index) => (
          <NewsCard
            key={news.id}
            title={news.title}
            image={news.image}
            description={news.description}
            index={index}
          />
        ))}
      </div>
      {/* {visibleNewsCount < newsData.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 text-white py-2 px-4 rounded-full"
          >
            Lihat Berita Lain
          </button>
        </div>
      )} */}
    </div>
  );
}
