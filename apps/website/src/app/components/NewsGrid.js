import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { NavigateNext } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArticle } from '../actions/ArticleActions';

const newsData = [
  {
    id: 1,
    title: 'Keindahan Alam di Desa Rawang',
    image:
      'https://wallpapers.com/images/featured/aesthetic-pictures-hv6f88paqtseqh92.jpg',
    description:
      'Desa Rawang terkenal dengan pemandangan alamnya yang memukau.',
    content:
      'Desa Rawang terkenal dengan pemandangan alamnya yang memukau. Dikelilingi oleh sawah hijau dan perbukitan yang menghijau, desa ini menawarkan suasana tenang dan damai bagi para pengunjung. Banyak wisatawan datang ke sini untuk menikmati keindahan alam yang masih asri dan segar. Selain itu, desa ini juga memiliki berbagai spot menarik untuk berfoto, yang menjadi daya tarik tersendiri bagi para pecinta fotografi.\n\nSelain pemandangan alamnya, Desa Rawang juga memiliki beberapa tempat wisata alam seperti air terjun dan perbukitan yang bisa dijadikan tempat trekking. Wisatawan dapat menikmati udara segar sambil menjelajahi keindahan alam yang ditawarkan oleh desa ini. Keindahan alam yang masih terjaga membuat Desa Rawang menjadi destinasi favorit bagi mereka yang ingin melepas penat dari hiruk-pikuk kota.',
    author: 'Yan SB',
  },
  {
    id: 2,
    title: 'Perkembangan Teknologi di Desa Rawang',
    image:
      'https://cdn.pixabay.com/photo/2023/06/12/00/11/smartphone-8057248_1280.jpg',
    description:
      'Desa Rawang mulai mengadopsi teknologi terbaru untuk memajukan sektor pertaniannya.',
    content:
      'Desa Rawang mulai mengadopsi teknologi terbaru untuk memajukan sektor pertaniannya. Dengan bantuan smartphone dan aplikasi pertanian, para petani dapat memantau kondisi lahan dan tanaman mereka secara real-time, meningkatkan hasil panen dan efisiensi kerja. Teknologi ini juga membantu petani dalam mengelola sumber daya secara lebih efektif dan efisien.\n\nSelain di sektor pertanian, teknologi juga digunakan dalam berbagai aspek kehidupan desa. Misalnya, penggunaan sistem informasi desa yang terintegrasi memudahkan administrasi dan layanan publik. Dengan adanya teknologi ini, warga Desa Rawang dapat mengakses informasi dan layanan dengan lebih cepat dan mudah, yang pada akhirnya meningkatkan kualitas hidup mereka.',
    author: 'Julian Lukman',
  },
  {
    id: 3,
    title: 'Festival Budaya Minangkabau di Desa Rawang',
    image:
      'https://i.pinimg.com/236x/b6/d3/17/b6d3177a526831702d0ecbd96b9a9b6f.jpg',
    description:
      'Desa Rawang secara rutin mengadakan festival budaya yang menampilkan kekayaan tradisi Minangkabau.',
    content:
      'Desa Rawang secara rutin mengadakan festival budaya yang menampilkan kekayaan tradisi Minangkabau. Festival ini meliputi pertunjukan tari, musik tradisional, dan pameran kerajinan tangan. Acara ini menarik banyak pengunjung dari dalam dan luar daerah, yang ingin menyaksikan dan merasakan langsung kebudayaan Minangkabau.\n\nFestival budaya ini juga menjadi ajang untuk memperkenalkan seni dan budaya lokal kepada generasi muda. Dengan demikian, tradisi dan kebudayaan Minangkabau dapat terus dilestarikan dan diwariskan kepada generasi berikutnya. Selain itu, festival ini juga memberikan kesempatan kepada para pengrajin lokal untuk memamerkan dan menjual produk mereka, yang pada akhirnya membantu meningkatkan perekonomian desa.',
    author: 'Angie Gabriella',
  },
  {
    id: 4,
    title: 'Potensi Pariwisata di Desa Rawang',
    image:
      'https://i.pinimg.com/564x/1b/c1/b9/1bc1b99972d680e32f9ff27e9c1ff7ab.jpg',
    description:
      'Desa Rawang memiliki potensi pariwisata yang besar dengan alam yang indah dan budaya yang kaya.',
    content:
      'Desa Rawang memiliki potensi pariwisata yang besar dengan alam yang indah dan budaya yang kaya. Destinasi wisata seperti trekking di perbukitan, mengunjungi lokasi pertanian, dan menikmati kuliner lokal menjadi daya tarik utama bagi wisatawan. Desa ini menawarkan pengalaman wisata yang autentik dan berbeda dari destinasi wisata lainnya.\n\nSelain itu, pemerintah desa juga berupaya untuk mengembangkan infrastruktur dan fasilitas penunjang pariwisata. Dengan adanya fasilitas yang memadai, diharapkan jumlah wisatawan yang datang ke Desa Rawang akan semakin meningkat. Pengembangan pariwisata ini juga diharapkan dapat memberikan dampak positif bagi perekonomian masyarakat setempat.',
    author: 'Yan SB',
  },
  {
    id: 5,
    title: 'Pemandangan Estetik di Desa Rawang',
    image:
      'https://www.bhmpics.com/downloads/pinterest-aesthetic-Wallpapers/46.e613e7e9b5b94e7a1f3b03823a9292a7.jpg',
    description:
      'Desa Rawang dikenal dengan pemandangan estetik yang cocok untuk fotografi.',
    content:
      'Desa Rawang dikenal dengan pemandangan estetik yang cocok untuk fotografi. Pemandangan sawah hijau, perbukitan, dan langit biru menciptakan latar belakang yang sempurna untuk foto-foto estetik yang menarik perhatian di media sosial. Banyak fotografer dan penggemar fotografi yang datang ke desa ini untuk mengabadikan keindahan alamnya.\n\nSelain itu, Desa Rawang juga menawarkan berbagai spot foto yang instagramable. Dari jembatan kayu yang romantis hingga jalan setapak di tengah sawah, setiap sudut desa ini menawarkan pemandangan yang indah. Spot-spot ini menjadi tempat favorit bagi pengunjung untuk berfoto dan mengunggahnya ke media sosial, yang secara tidak langsung juga mempromosikan keindahan Desa Rawang ke dunia luar.',
    author: 'Julian Lukman',
  },
  {
    id: 6,
    title: 'Pemberdayaan Petani di Desa Rawang',
    image:
      'https://www.itl.cat/pngfile/big/287-2871746_iphone-sunflower-wallpaper-aesthetic.jpg',
    description:
      'Desa Rawang berkomitmen untuk memberdayakan petani lokal melalui berbagai pelatihan dan bantuan teknologi.',
    content:
      'Desa Rawang berkomitmen untuk memberdayakan petani lokal melalui berbagai pelatihan dan bantuan teknologi. Dengan pengetahuan baru dan alat yang canggih, petani di Desa Rawang dapat meningkatkan produktivitas dan kualitas hasil pertanian mereka. Program pemberdayaan ini juga mencakup edukasi tentang praktik pertanian berkelanjutan yang ramah lingkungan.\n\nSelain itu, pemerintah desa bekerja sama dengan berbagai lembaga untuk memberikan akses permodalan dan pasar bagi para petani. Dengan dukungan ini, petani tidak hanya dapat meningkatkan hasil panen mereka, tetapi juga memiliki akses yang lebih baik ke pasar, yang pada akhirnya meningkatkan pendapatan mereka. Program pemberdayaan ini diharapkan dapat meningkatkan kesejahteraan petani dan mengurangi tingkat kemiskinan di desa.',
    author: 'Angie Gabriella',
  },
  {
    id: 7,
    title: 'Kegiatan Sosial di Desa Rawang',
    image: 'https://example.com/image7.jpg',
    description:
      'Desa Rawang sering mengadakan berbagai kegiatan sosial seperti gotong royong, pengajian, dan acara kebersamaan lainnya.',
    content:
      'Desa Rawang sering mengadakan berbagai kegiatan sosial seperti gotong royong, pengajian, dan acara kebersamaan lainnya. Kegiatan ini tidak hanya mempererat hubungan antarwarga, tetapi juga membantu menjaga kebersihan dan kenyamanan lingkungan desa. Gotong royong, misalnya, menjadi kegiatan rutin yang melibatkan seluruh warga untuk membersihkan desa dan memperbaiki fasilitas umum.\n\nSelain itu, kegiatan sosial lainnya seperti pengajian dan acara kebersamaan juga menjadi ajang untuk mempererat tali silaturahmi antarwarga. Melalui kegiatan ini, warga Desa Rawang dapat saling bertukar informasi dan berbagi pengalaman, yang pada akhirnya menciptakan komunitas yang harmonis dan solid. Kegiatan sosial ini juga menjadi sarana untuk memperkuat nilai-nilai kebersamaan dan kepedulian sosial di tengah masyarakat.',
    author: 'Yan SB',
  },
];

const DOMAIN = process.env.NX_PUBLIC_DOMAIN;
const NewsCard = ({ id, title, image, description, index }) => {
  const animationDirection = index % 2 === 0 ? 100 : -100;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const navigate = useNavigate();

  const navigateToNews = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <motion.div
      key={id}
      ref={ref}
      className="flex flex-col justify-between bg-white rounded-lg shadow-md overflow-hidden"
      variants={{
        hidden: { opacity: 0, x: animationDirection },
        visible: { opacity: 1, x: 0 },
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="w-full h-48  relative">
        <img
          className="absolute top-0 left-0 w-full h-full object-contain sm:object-cover"
          src={`${DOMAIN}/assets/files/article_thumbnails/${image}`}
          alt={title}
        />
      </div>
      <div className="flex flex-col h-1/2 justify-between p-4">
        <div>
          <h2 className="font-bold text-lg mb-2">{title}</h2>
          <p className="text-gray-700 text-sm">{description}</p>
        </div>
        <button
          onClick={(e) => navigateToNews(id)}
          className="flex bg-zinc-900 text-white text-xs sm:text-md p-2 rounded-md leading-none w-fit"
        >
          Selengkapnya
          <NavigateNext fontSize="xs" />
        </button>
      </div>
    </motion.div>
  );
};

export default function NewsGrid(option) {
  const [visibleNewsCount, setVisibleNewsCount] = useState(6);
  const dispatch = useDispatch();
  const DoGetArticles = useSelector((state) => state.ReduxState.DoGetArticles);
  const ArticleList = useSelector(
    (state) => state.ArticlesReducers.GetArticles
  );
  const errorGetArticles = useSelector(
    (state) => state.ArticlesReducers.errorGetArticles
  );

  const handleFetchArticles = (page, limit) => {
    dispatch(getArticle({ page: page, limit: limit }));
  };

  const handleShowMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 6);
    handleFetchArticles(1, visibleNewsCount + 6);
  };

  useEffect(() => {
    // Set initial count from option
    setVisibleNewsCount(option.count);
  }, [option.count]);

  useEffect(() => {
    if (DoGetArticles) {
      handleFetchArticles(1, 10);
      dispatch({ type: 'set', DoGetArticles: false });
    }
  }, [DoGetArticles, dispatch]);

  useEffect(() => {
    if (!DoGetArticles) {
      dispatch({ type: 'set', DoGetArticles: true });
    }
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">BERITA TERKINI</h1>
        {ArticleList &&
          visibleNewsCount < ArticleList.data.totalItems &&
          option.count <= 6 && (
            <Link
              to="/news"
              className=" text-xs sm:text-md text-white bg-zinc-900 rounded-md  py-1 px-4"
            >
              Semua Berita
              <NavigateNext fontSize="xs" />
            </Link>
          )}
      </div>
      <div
        className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}
      >
        {ArticleList && ArticleList.data && ArticleList.data.totalItems > 0
          ? ArticleList.data.articles
              .slice(0, visibleNewsCount)
              .map((article, index) => (
                <NewsCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  image={article.article_thumbnail.name}
                  // image={'1722799787818.png'}
                  // description={article.content}
                  index={index}
                />
              ))
          : ''}
      </div>
      {ArticleList &&
        visibleNewsCount < ArticleList.data.totalItems &&
        option.count > 6 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleShowMore}
              className="bg-zinc-900 text-white py-2 px-4 rounded-md"
            >
              Lihat Berita Lain
            </button>
          </div>
        )}
    </div>
  );
}
