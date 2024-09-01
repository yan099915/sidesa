import React, { useEffect } from 'react';
import NewsGrid from '../../components/NewsGrid';
import { CalendarMonthSharp, Person } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleDetails } from '../../actions/ArticleActions';
import { SyncLoader } from 'react-spinners';
import moment from 'moment';
import DOMPurify from 'dompurify';

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
export default function NewsDetails() {
  const { id } = useParams();
  const date = new Date();

  const DoGetArticleDetails = useSelector(
    (state) => state.ReduxState.DoGetArticleDetails
  );
  const ArticleDetails = useSelector(
    (state) => state.ArticlesReducers.GetArticleDetails
  );
  const errorGetArticleDetails = useSelector(
    (state) => state.ArticlesReducers.errorGetArticleDetails
  );

  const dispatch = useDispatch();

  const handleFetchArticleDetails = () => {
    dispatch(getArticleDetails(id));
  };

  // Scroll to top on initial render
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch({
      type: 'ARTICLE_DETAILS_RESET',
      payload: { data: false, errorMessage: false },
    });
    handleFetchArticleDetails();
  }, [id]);

  useEffect(() => {
    if (DoGetArticleDetails) {
      handleFetchArticleDetails();
      dispatch({ type: 'set', DoGetArticleDetails: false });
      console.log('fetching articles details');
    }
  }, [DoGetArticleDetails, dispatch]);

  useEffect(() => {
    dispatch({ type: 'set', DoGetArticleDetails: true });
  }, [dispatch]);
  return (
    <div className="flex flex-col px-4 py-8 ">
      {/* news title */}
      {ArticleDetails && ArticleDetails.data ? (
        <div>
          <div className="w-full border border-b-0  border-zinc-900/5 px-4 py-8">
            <h1 className="text-2xl font-bold">{ArticleDetails.data.title}</h1>
            <div className="flex gap-x-4 ">
              <div className="flex items-center gap-x-1">
                <Person fontSize="sm" />
                <p className="text-xs leading-none align-middle">
                  {/* {newsData[param.id - 1].author} */}
                  admin
                </p>
              </div>
              <div className="flex items-center gap-x-1">
                <CalendarMonthSharp fontSize="sm" />
                <p className="text-xs leading-none align-middle">
                  {moment(ArticleDetails.data.createdAt).format(
                    'DD MMMM YYYY hh:mm'
                  )}
                </p>
              </div>
            </div>
          </div>
          {/* news body */}
          <div className="px-4 border border-t-0  border-zinc-900/5">
            <img
              src={`${DOMAIN}/assets/files/article_thumbnails/${ArticleDetails.data.article_thumbnail.name}`}
              alt={ArticleDetails.data.title}
              className="w-full h-96 object-scale-down sm:object-contain"
            />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(ArticleDetails.data.content),
              }}
              className="py-10"
            ></div>
          </div>
          {/* news footer */}
        </div>
      ) : (
        <div className="w-full border border-b-0  border-zinc-900/5 px-4 py-8">
          {!errorGetArticleDetails && !ArticleDetails ? (
            <div className="flex  justify-center">
              <div className="flex flex-col items-center">
                <SyncLoader color="#848484" margin={3} size={6} />
                <p className="text-zinc-500 animate-pulse">Loading</p>
              </div>
            </div>
          ) : (
            <div className="flex  justify-center">
              <h1>Halaman atau berita yang anda cari tidak ditemukan</h1>
            </div>
          )}
        </div>
      )}

      <div>
        <NewsGrid count={4} />
      </div>
    </div>
  );
}
