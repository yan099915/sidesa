import React, { useEffect, useState } from 'react';
import { NavigateNext } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAnnouncements } from '../actions/AnnouncementsActions';

const informasi = [
  {
    id: 1,
    type: 'pengumuman',
    title: 'Pengumuman Pemilihan Kepala Desa',
    date: '12 Agustus 2021',
    content:
      'Pemilihan Kepala Desa akan diadakan pada tanggal 12 Agustus 2021. Semua warga desa diharapkan hadir dan menggunakan hak suaranya dengan bijak.',
  },
  {
    id: 2,
    type: 'agenda',
    title: 'Agenda Kegiatan Desa',
    date: '12 Agustus 2021',
    content:
      'Berikut adalah agenda kegiatan desa yang akan dilaksanakan pada tanggal 12 Agustus 2021. Kegiatan ini meliputi gotong royong dan pertemuan rutin warga.',
  },
  {
    id: 3,
    type: 'pengumuman',
    title: 'Pengumuman Penerimaan Calon PNS',
    date: '12 Agustus 2021',
    content:
      'Pemerintah desa mengumumkan penerimaan calon Pegawai Negeri Sipil (PNS) yang baru. Pendaftaran dibuka hingga tanggal 12 Agustus 2021.',
  },
  {
    id: 4,
    type: 'agenda',
    title: 'Lomba Kebersihan Antar RT',
    date: '15 Agustus 2021',
    content:
      'Dalam rangka memperingati Hari Kemerdekaan, akan diadakan lomba kebersihan antar RT pada tanggal 15 Agustus 2021. Semua RT diharapkan berpartisipasi aktif.',
  },
  {
    id: 5,
    type: 'pengumuman',
    title: 'Pengumuman Pembagian BLT',
    date: '20 Agustus 2021',
    content:
      'Pembagian Bantuan Langsung Tunai (BLT) akan dilaksanakan pada tanggal 20 Agustus 2021 di balai desa. Warga diminta membawa identitas diri saat mengambil bantuan.',
  },
  {
    id: 6,
    type: 'agenda',
    title: 'Rapat Rutin Perangkat Desa',
    date: '22 Agustus 2021',
    content:
      'Rapat rutin perangkat desa akan diadakan pada tanggal 22 Agustus 2021 di balai desa. Semua perangkat desa diwajibkan hadir tepat waktu.',
  },
  {
    id: 7,
    type: 'pengumuman',
    title: 'Pengumuman Kegiatan Posyandu',
    date: '25 Agustus 2021',
    content:
      'Kegiatan Posyandu akan diadakan pada tanggal 25 Agustus 2021. Ibu-ibu yang memiliki balita diharapkan datang untuk memeriksakan kesehatan anak mereka.',
  },
  {
    id: 8,
    type: 'agenda',
    title: 'Pelatihan Kewirausahaan',
    date: '28 Agustus 2021',
    content:
      'Pelatihan kewirausahaan bagi pemuda desa akan diadakan pada tanggal 28 Agustus 2021 di aula desa. Diharapkan para pemuda desa dapat mengikuti pelatihan ini untuk meningkatkan keterampilan mereka.',
  },
  {
    id: 9,
    type: 'pengumuman',
    title: 'Pengumuman Perubahan Jadwal Pelayanan',
    date: '30 Agustus 2021',
    content:
      'Diumumkan kepada seluruh warga bahwa ada perubahan jadwal pelayanan di kantor desa. Jadwal baru mulai berlaku pada tanggal 30 Agustus 2021.',
  },
  {
    id: 10,
    type: 'agenda',
    title: 'Musyawarah Desa',
    date: '1 September 2021',
    content:
      'Musyawarah desa akan diadakan pada tanggal 1 September 2021 di balai desa. Semua warga diundang untuk hadir dan memberikan masukan untuk pembangunan desa.',
  },
  // Penambahan data baru
  {
    id: 11,
    type: 'pengumuman',
    title: 'Pengumuman Penutupan Jalan',
    date: '3 September 2021',
    content:
      'Jalan utama desa akan ditutup sementara pada tanggal 3 September 2021 karena adanya perbaikan. Harap menggunakan jalan alternatif.',
  },
  {
    id: 12,
    type: 'agenda',
    title: 'Pentas Seni Desa',
    date: '5 September 2021',
    content:
      'Akan diadakan pentas seni desa pada tanggal 5 September 2021 di lapangan desa. Semua warga diundang untuk menonton dan meramaikan acara ini.',
  },
  {
    id: 13,
    type: 'pengumuman',
    title: 'Pengumuman Layanan Kesehatan Gratis',
    date: '7 September 2021',
    content:
      'Puskesmas desa akan mengadakan layanan kesehatan gratis pada tanggal 7 September 2021. Warga desa diharapkan memanfaatkan layanan ini.',
  },
  {
    id: 14,
    type: 'agenda',
    title: 'Turnamen Sepak Bola Antar Desa',
    date: '10 September 2021',
    content:
      'Turnamen sepak bola antar desa akan diadakan pada tanggal 10 September 2021 di lapangan utama. Semua tim diharapkan hadir tepat waktu.',
  },
  {
    id: 15,
    type: 'pengumuman',
    title: 'Pengumuman Workshop Kerajinan Tangan',
    date: '12 September 2021',
    content:
      'Workshop kerajinan tangan akan diadakan pada tanggal 12 September 2021 di balai desa. Warga yang berminat dapat mendaftar ke kantor desa.',
  },
  {
    id: 16,
    type: 'agenda',
    title: 'Festival Makanan Tradisional',
    date: '15 September 2021',
    content:
      'Festival makanan tradisional akan diadakan pada tanggal 15 September 2021 di pasar desa. Semua warga diundang untuk menikmati berbagai kuliner tradisional.',
  },
  {
    id: 17,
    type: 'pengumuman',
    title: 'Pengumuman Kegiatan Donor Darah',
    date: '18 September 2021',
    content:
      'Kegiatan donor darah akan diadakan pada tanggal 18 September 2021 di aula desa. Warga yang ingin mendonorkan darahnya diharapkan hadir.',
  },
  {
    id: 18,
    type: 'agenda',
    title: 'Pelatihan Pengelolaan Sampah',
    date: '20 September 2021',
    content:
      'Pelatihan pengelolaan sampah akan diadakan pada tanggal 20 September 2021 di balai desa. Semua warga diundang untuk mengikuti pelatihan ini.',
  },
  {
    id: 19,
    type: 'pengumuman',
    title: 'Pengumuman Pemadaman Listrik',
    date: '23 September 2021',
    content:
      'Akan ada pemadaman listrik pada tanggal 23 September 2021 dari jam 08.00 hingga 16.00 karena pemeliharaan jaringan. Harap maklum.',
  },
  {
    id: 20,
    type: 'agenda',
    title: 'Kegiatan Jalan Sehat',
    date: '25 September 2021',
    content:
      'Kegiatan jalan sehat akan diadakan pada tanggal 25 September 2021. Titik kumpul di balai desa pada pukul 06.00. Semua warga diundang untuk berpartisipasi.',
  },
];

export default function Announcement({ option }) {
  const initialCount = option?.count || 5;
  const [visibleInfoCount, setVisibleInfoCount] = useState(initialCount);

  const handleShowMore = () => {
    setVisibleInfoCount((prevCount) => prevCount + 5); // Menambah 5 informasi lagi saat tombol diklik
  };
  const DoGetAnnouncements = useSelector(
    (state) => state.ReduxState.DoGetAnnouncements
  );
  const Announcements = useSelector(
    (state) => state.AnnouncementReducers.GetAnnouncements
  );

  const dispatch = useDispatch();

  const renderBadge = (type) => {
    if (type === 2) {
      return (
        <span className="border border-blue-500 text-blue-500 font-semibold text-xs px-2 py-1 rounded w-24 text-center">
          Agenda
        </span>
      );
    } else if (type === 1) {
      return (
        <span className="border border-red-500 text-red-500 text-xs px-2 py-1 rounded w-24 text-center">
          Pengumuman
        </span>
      );
    }
  };

  useEffect(() => {
    if (DoGetAnnouncements) {
      dispatch({ type: 'set', DoGetAnnouncements: false });
      dispatch(getAnnouncements());
    }
  }, [DoGetAnnouncements]);

  useEffect(() => {
    if (!DoGetAnnouncements) {
      dispatch({ type: 'set', DoGetAnnouncements: true });
    }
  }, [dispatch]);

  console.log(
    Announcements && Announcements.data && Announcements.data.totalItems > 0,
    'Announcements'
  );

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">INFORMASI RESMI</h1>
        {Announcements &&
          Announcements.data &&
          Announcements.data.totalItems > 0 && (
            <div>
              {visibleInfoCount <= 5 ? (
                <Link
                  to="/announcement"
                  className="text-xs sm:text-md text-white bg-zinc-900 rounded-md py-1 px-4 flex items-center"
                >
                  Lihat Semua Informasi
                  <NavigateNext fontSize="xs" />
                </Link>
              ) : null}
            </div>
          )}
      </div>

      <div className="space-y-2">
        {Announcements &&
          Announcements.data &&
          Announcements.data.totalItems > 0 &&
          Announcements.data.announcements
            .slice(0, visibleInfoCount)
            .map((info, index) => (
              <div key={index} className="flex items-center space-x-4 rounded">
                {renderBadge(info.announcement_type.id)}
                <Link to={`/announcement/${info.id}`} className="flex-grow">
                  <h2 className="text-xs font-semibold">{info.title}</h2>
                  <p className="text-xs text-gray-600">{info.date}</p>
                </Link>
              </div>
            ))}
      </div>
      {Announcements &&
        Announcements.data &&
        visibleInfoCount < Announcements.data.totalItems &&
        initialCount > 6 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleShowMore}
              className="text-xs sm:text-md text-white bg-zinc-900 rounded-md py-1 px-4 flex items-center"
            >
              Lihat Lebih Banyak Informasi
              <NavigateNext fontSize="xs" />
            </button>
          </div>
        )}
    </div>
  );
}
