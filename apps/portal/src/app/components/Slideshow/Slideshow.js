import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getFeaturedArticles } from '../../api/actions/ArticleActions';

const DOMAIN = process.env.NX_PUBLIC_DOMAIN;

export default function Slideshow() {
  const [imageIndex, setImageIndex] = useState(0);
  const [articleLength, setArticleLength] = useState(0);
  const ArticleList = useSelector(
    (state) => state.ArticlesReducers.GetArticles
  );
  const DoGetFeaturedArticles = useSelector(
    (state) => state.ReduxState.DoGetFeaturedArticles
  );
  const featuredArticles = useSelector(
    (state) => state.ArticlesReducers.GetFeaturedArticles
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const variants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const navigateToNews = (id) => {
    const url = `${DOMAIN}/#/news/${id}`;
    window.open(url, '_blank');
  };

  const handleFetchFeaturedArticles = () => {
    dispatch(getFeaturedArticles());
  };

  useEffect(() => {
    const length =
      featuredArticles &&
      featuredArticles.data &&
      featuredArticles.data.count > 0
        ? featuredArticles.data.count
        : ArticleList && ArticleList.data && ArticleList.data.totalItems > 0
        ? ArticleList.data.articles.totalItems
        : 0;
    setArticleLength(length);

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % length);
    }, 10000);
    return () => clearInterval(interval);
  }, [featuredArticles, ArticleList]);

  useEffect(() => {
    if (DoGetFeaturedArticles) {
      handleFetchFeaturedArticles();
      dispatch({ type: 'set', DoGetFeaturedArticles: false });
    }
  }, [DoGetFeaturedArticles, dispatch]);

  useEffect(() => {
    if (!DoGetFeaturedArticles) {
      dispatch({ type: 'set', DoGetFeaturedArticles: true });
    }
  }, [dispatch]);

  return (
    <div className="relative flex items-start justify-center w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] overflow-hidden">
      <AnimatePresence initial={false}>
        {featuredArticles &&
        featuredArticles.data &&
        featuredArticles.data.count > 0
          ? featuredArticles.data.rows.map((article, index) => (
              <motion.div
                className="w-full h-auto flex absolute"
                key={index}
                variants={variants}
                initial="enter"
                animate={imageIndex === index ? 'center' : 'enter'}
                exit="exit"
                transition={{
                  opacity: { duration: 1 },
                }}
                onClick={(e) => navigateToNews(article.id)}
              >
                <img
                  className="h-full w-full object-cover"
                  src={`${DOMAIN}/assets/files/article_thumbnails/${article.article_thumbnail.name}`}
                />
              </motion.div>
            ))
          : ArticleList && ArticleList.data && ArticleList.data.totalItems > 0
          ? ArticleList.data.articles.map((article, index) => (
              <motion.div
                className="w-full h-screen flex absolute"
                key={index}
                variants={variants}
                initial="enter"
                animate={imageIndex === index ? 'center' : 'enter'}
                exit="exit"
                transition={{
                  opacity: { duration: 1 },
                }}
                onClick={(e) => navigateToNews(article.id)}
              >
                <img
                  className="h-full w-full object-cover"
                  src={`${DOMAIN}/assets/files/article_thumbnails/${article.article_thumbnail.name}`}
                />
              </motion.div>
            ))
          : ''}
      </AnimatePresence>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer bg-white rounded-full h-8 w-8 flex justify-center items-center shadow-lg">
        <NavigateNext
          onClick={() => setImageIndex((prev) => (prev + 1) % articleLength)}
        />
      </div>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer bg-white rounded-full h-8 w-8 flex justify-center items-center shadow-lg">
        <NavigateBefore
          onClick={() =>
            setImageIndex((prev) => (prev - 1 + articleLength) % articleLength)
          }
        />
      </div>
    </div>
  );
}
