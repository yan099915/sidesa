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

const jenisOptions = [
  { value: '', label: 'Semua' },
  { value: 'Type A', label: 'Type A' },
  { value: 'Type B', label: 'Type B' },
  { value: 'Type C', label: 'Type C' },
];

const statusOptions = [
  { value: '', label: 'Semua' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Rejected', label: 'Rejected' },
];

export default function DaftarPengajuan() {
  const [jenisFilter, setJenisFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredData = dataPengajuan.filter((pengajuan) => {
    return (
      (jenisFilter === '' || pengajuan.jenis === jenisFilter) &&
      (statusFilter === '' || pengajuan.status === statusFilter)
    );
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Daftar Pengajuan</h2>
      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <Listbox value={jenisFilter} onChange={setJenisFilter}>
            <Listbox.Label className="text-sm font-medium text-gray-700">
              Jenis Pengajuan:
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none">
                <span className="block truncate">
                  {
                    jenisOptions.find((option) => option.value === jenisFilter)
                      ?.label
                  }
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {jenisOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${
                        active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                      }`
                    }
                    value={option.value}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <ChevronDownIcon
                              className="w-5 h-5 text-amber-600"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        <div className="w-1/2">
          <Listbox value={statusFilter} onChange={setStatusFilter}>
            <Listbox.Label className="text-sm font-medium text-gray-700">
              Status:
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none">
                <span className="block truncate">
                  {
                    statusOptions.find(
                      (option) => option.value === statusFilter
                    )?.label
                  }
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {statusOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${
                        active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                      }`
                    }
                    value={option.value}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <ChevronDownIcon
                              className="w-5 h-5 text-amber-600"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
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
          {filteredData.map((pengajuan) => (
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
