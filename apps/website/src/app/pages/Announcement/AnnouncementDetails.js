import React, { useEffect } from 'react';
import NewsGrid from '../../components/NewsGrid';
import { CalendarMonthSharp, Person } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
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
];
export default function AnnouncementDetails() {
  const param = useParams();
  const date = new Date();

  // Scroll to top on initial render
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [param]);
  return (
    <div className="flex flex-col px-4 py-8 ">
      {/* news title */}
      <div className="w-full border border-b-0  border-zinc-900/5 px-4 py-8">
        <h1 className="text-2xl font-bold">{informasi[param.id - 1].title}</h1>
        <div className="flex items-center ">
          <CalendarMonthSharp fontSize="sm" />
          <p className="text-xs leading-none align-middle">{date.toString()}</p>
        </div>
        {/* <div className="flex items-center">
          <Person fontSize="sm" />
          <p className="text-xs leading-none align-middle">
            {informasi[param.id - 1].author}
          </p>
        </div> */}
      </div>
      {/* news body */}
      <div className="px-4 border border-t-0  border-zinc-900/5">
        {/* <img
          src={informasi[param.id - 1].image}
          alt={informasi[param.id - 1].title}
          className="w-full h-96 object-cover"
        /> */}
        <p className="text-sm leading-relaxed mt-4 text-justify">
          {informasi[param.id - 1].content}
        </p>
      </div>
      {/* news footer */}
      <div>
        <NewsGrid count={4} />
      </div>
    </div>
  );
}
