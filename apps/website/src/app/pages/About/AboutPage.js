import {
  AccountTreeSharp,
  EmojiEventsSharp,
  HistoryEduSharp,
} from '@mui/icons-material';
import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Greetings from '../../components/Greetings';

const About = () => {
  // Scroll to top on initial render
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="container mx-auto p-6 ">
      <Greetings />
      <div>
        <h3 className="text-2xl text-zinc-700 font-bold mb-6 text-center">
          Profil Desa Rawang
        </h3>
        <p className="text-justify">
          Rawang adalah salah satu desa yang masuk dalam wilayah administrasi
          Kecamatan Pariaman Tengah, Kota Pariaman, Sumatra Barat (Sumbar) dan
          merupakan salah satu desa dari 22 desa yang ada di Kec. Pariaman
          Tengah. Desa Rawang dipimpin oleh Kepala Desa Sukri Heriadi Can
          periode 2019-2025. Memiliki luas 0,68 kilometer persegi, Desa Rawang
          terletak ± 1000m dari pinggir pantai pada daerah dataran rendah dengan
          ketinggian 15 meter di atas permukaan laut dengan jumlah penduduk
          berdasarkan Dinas Kependudukan dan Pencatatan Sipil Kota Pariaman pada
          tahun 2023 sebanyak 1621 jiwa yang terdiri dari 795 laki-laki dan 826
          perempuan dengan total persentase 4,85% dari total keseluruhan
          penduduk Kecamatan Pariaman Tengah.
        </p>
      </div>
      <div className="flex gap-x-10 justify-center my-10">
        <Link
          className="flex flex-col justify-center items-center text-zinc-700"
          to="/about/history"
        >
          <HistoryEduSharp />
          <span className="text-sm font-bold">Sejarah</span>
        </Link>
        <Link
          className="flex flex-col justify-center items-center text-zinc-700 "
          to="/about/visi-misi"
        >
          <EmojiEventsSharp />
          <span className="text-sm font-bold">Visi & Misi</span>
        </Link>
        <Link
          className="flex flex-col justify-center items-center text-zinc-700 "
          to="/about/struktur-organisasi"
        >
          <AccountTreeSharp />
          <span className="text-sm font-bold">Struktur</span>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default About;
