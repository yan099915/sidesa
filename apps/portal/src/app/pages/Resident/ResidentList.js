import React from 'react';
import { Link } from 'react-router-dom';

export default function ResidentList() {
  // Contoh data riwayat pengajuan (biasanya dari state atau props)
  const riwayatPengajuan = [
    { id: 1, jenis: 'John Doe', tanggal: '2024-06-18', status: 'Pending' },
    // Tambahkan data lainnya jika ada
  ];

  // Pengecekan jika tidak ada riwayat pengajuan
  if (riwayatPengajuan.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-semibold mb-4">Riwayat Pengajuan Surat</h2>
        <p className="text-gray-600 mb-4">
          Anda belum memiliki riwayat pengajuan layanan.
        </p>
        <Link to="form" className="px-4 py-2 bg-blue-500 text-white rounded">
          Buat Pengajuan
        </Link>
      </div>
    );
  }

  // Jika ada riwayat pengajuan, tampilkan tabel
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Riwayat Pengajuan Surat</h2>
        <Link to="form" className="px-4 py-2 bg-zinc-900 text-white rounded">
          Tambah
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-t border-b border-zinc-200">
            <th className="py-2">ID</th>
            <th className="py-2">Jenis Pengajuan</th>
            <th className="py-2">Tanggal</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {riwayatPengajuan.map((pengajuan) => (
            <tr
              key={pengajuan.id}
              className="border-b border-zinc-200 text-center"
            >
              <td className="py-2">{pengajuan.id}</td>
              <td className="py-2">{pengajuan.jenis}</td>
              <td className="py-2">{pengajuan.tanggal}</td>
              <td className="py-2">{pengajuan.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
