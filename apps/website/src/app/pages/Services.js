import React from 'react';
import {
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';

export default function Services() {
  return (
    <div className="container mx-auto p-6 ">
      <div>
        <h3 className="text-2xl text-zinc-700 font-bold mb-6 text-center">
          Pelayanan Desa Rawang
        </h3>
        <div className="w-full flex justify-center my-4">
          <Button className="inline-flex items-center gap-2 rounded-md bg-zinc-900 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-600 data-[open]:bg-zinc-700 data-[focus]:outline-1 data-[focus]:outline-white">
            Masuk ke portal layanan desa
          </Button>
        </div>
        <p className="text-justify">
          Untuk meningkatkan pelayanan kepada masyarakat, Desa Rawang
          menyediakan portal layanan online yang dapat diakses oleh masyarakat.
          Portal layanan desa ini memudahkan masyarakat dalam mengajukan
          permohonan surat-surat administrasi kependudukan dan surat-surat
          lainnya.
          <ul className="list-decimal text-xs sm:text-sm">
            <li>Pembuatan Surat Keterangan</li>
            <li>Pembuatan Surat Keterangan Pindah</li>
            <li>Pembuatan Surat Keterangan Usaha</li>
            <li>Pembuatan Surat Keterangan Tidak Mampu</li>
            <li>Pembuatan Surat Keterangan Kelahiran</li>
            <li>Pembuatan Surat Keterangan Kematian</li>
            <li>Pembuatan Surat Keterangan Domisili</li>
            <li>Pembuatan Surat Keterangan Nikah</li>
            <li>Pembuatan Surat Keterangan Cerai</li>
            <li>Pembuatan Surat Keterangan Kehilangan</li>
            <li>Pembuatan Surat Keterangan Kepolisian</li>
            <li>Pembuatan Surat Keterangan Bepergian</li>
            <li>Pembuatan Surat Keterangan Lainnya</li>
          </ul>
          {/* layananan desa */}
        </p>
        <TabGroup>
          <TabList>
            <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-zinc-900 focus:outline-none data-[selected]:bg-zinc-900/10 data-[hover]:bg-zinc-900/5 data-[selected]:data-[hover]:bg-zinc-900/10 data-[focus]:outline-1 data-[focus]:outline-zinc-900">
              Tab 1
            </Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Content 1</TabPanel>
            <TabPanel>Content 2</TabPanel>
            <TabPanel>Content 3</TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
