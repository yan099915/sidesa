import React, { useState } from 'react';
import { Select, Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

const dataPengajuan = [
  { id: 1, jenis: 'Type A', tanggal: '2024-06-18', status: 'Pending' },
  { id: 2, jenis: 'Type B', tanggal: '2024-06-19', status: 'Approved' },
  { id: 3, jenis: 'Type C', tanggal: '2024-06-20', status: 'Rejected' },
  // Tambahkan data lainnya
];

export default function VerificationRequest() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Permintaan Verifikasi</h2>
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
          {dataPengajuan.map((pengajuan) => (
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
