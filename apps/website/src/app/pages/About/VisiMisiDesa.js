import React from 'react';

export default function VisiMisiDesa() {
  return (
    <div className="flex  flex-col gap-y-2">
      <h1 className="text-xl font-bold text-center">
        Visi dan Misi Desa Rawang
      </h1>
      <p className="text-justify leading-relaxed">
        Desa Rawang memiliki visi dalam “MEWUJUDKAN MASYARAKAT DESA RAWANG YANG
        RELIGIUS, MANDIRI, ADIL DAN SEJAHTERA”. Dalam membangun masyarakat Desa
        Rawang yang makmur dan sejahtera, Desa Rawang mengambil langkah dengan
        menetapkan misi sebagai berikut:
      </p>
      <ol className="list-decimal px-4 my-2">
        <li>
          Melakukan optimalisasi Masjid Al-Furqan sebagai dasar pembaharuan
          keagamaan masyarakat Desa Rawang
        </li>
        <li>
          Meningkatkan tata kelola pemerintahan Desa Rawang yang baik dan
          terbebas dari pungutan liar sebagai langkah penerapan Good Government
        </li>
        <li>
          Memperkuat perekonomian masyarakat Desa Rawang dengan memaksimalkan
          sumber daya secara maksimal
        </li>
        <li>
          Bersinergi dengan lembaga desa yang ada untuk kemajuan Desa Rawang
        </li>
        <li>
          Melakukan pembangunan serta peningkatan kualitas kesehatan masyarakat
          Desa Rawang
        </li>
        <li>
          Mengembangkan lembaga pendidikan informal yang ada di Desa Rawang
        </li>
      </ol>
    </div>
  );
}
