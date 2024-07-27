import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { IconButton } from '@mui/material';
import clsx from 'clsx';
import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  Cancel,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getResidents } from '../../api/actions/ResidentActions';
import { Button, Field, Input, Label } from '@headlessui/react';
import { verifySession } from '../../api/actions/UsersActions';

export default function ResidentList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [prevSearch, setPrevSearch] = useState('');
  const DoGetResidents = useSelector(
    (state) => state.ReduxState.DoGetResidents
  );
  const Residents = useSelector(
    (state) => state.ResidentReducers.ResidentsData
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPages =
    Residents && Residents.data ? Residents.data.totalPages : 1;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleFetchData();
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);
    handleFetchData();
  };

  const handleFetchData = () => {
    const params = {
      limit: pageSize,
      page: page,
    };

    if (search !== '') {
      params.search = search;
    }

    dispatch(getResidents(params));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      handlePageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      handlePageChange(page + 1);
    }
  };

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      //check if search prevState is not equal to current search value
      if (search !== prevSearch) {
        setPrevSearch(search);
        handleFetchData();
      }
    }
  };

  const handleClearSearch = () => {
    setSearch('');
    setPrevSearch('');
  };

  const handleRowClick = (nik) => {
    navigate(`/resident/details/${nik}`);
  };

  useEffect(() => {
    if (DoGetResidents) {
      dispatch(verifySession());
      const param = {
        page: 1,
        limit: 10,
      };
      dispatch(getResidents(param));
      dispatch({ type: 'set', DoGetResidents: false });
    }
  }, [DoGetResidents]);

  useEffect(() => {
    if (!DoGetResidents) {
      dispatch({ type: 'set', DoGetResidents: true });
    }
  }, []);

  // console.log(Residents, 'Residents');
  // Jika ada riwayat pengajuan, tampilkan tabel
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Field className="relative flex justify-center content-center items-center">
          <Button
            onClick={(e) => handleClearSearch()}
            className={
              (search === '' ? 'hidden' : 'block') +
              ' absolute flex right-2 w-5  hover:ring-zinc-900/50 rounded-full justify-center cont items-center'
            }
          >
            <Cancel className="w-3 text-zinc-900/20 hover:text-zinc-900/40 active:text-zinc-900/20" />
          </Button>
          <Input
            placeholder="Cari NIK / Nama / KK"
            onKeyDown={(e) => handleSearchEnter(e)}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="p-2 ring-1 ring-zinc-900/20 rounded-md"
          ></Input>
        </Field>
        <Link to="add" className="px-4 py-2 bg-zinc-900 text-white rounded">
          Tambah
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-t border-b border-zinc-200">
            <th className="py-2">ID</th>
            <th className="py-2">NIK</th>
            <th className="py-2">Nama</th>
            <th className="py-2">KK</th>
          </tr>
        </thead>
        <tbody>
          {Residents &&
          Residents.data &&
          Residents.data.residents.length > 0 ? (
            Residents.data.residents.map((resident) => (
              <tr
                key={resident.id}
                onClick={() => handleRowClick(resident.nomor_ktp)}
                className="border-b border-zinc-200  hover:bg-zinc-100 cursor-pointer text-xs sm:text-base text-center"
              >
                <td className="py-2">{resident.id}</td>
                <td className="py-2">{resident.nomor_ktp}</td>
                <td className="py-2">{resident.nama}</td>
                <td className="py-2">{resident.nomor_kk}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="py-2 text-center border-b border-zinc-200"
              >
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col content-center justify-center text-center">
          <div className="flex gap-x-4 items-center">
            <span className="text-sm/6 font-medium">Page Size</span>
            <div className="relative flex items-center ">
              <select
                className={clsx(
                  'mt-3 block w-[70px] appearance-none rounded-lg ring-1 ring-zinc-900/20 bg-white/5 py-1.5 px-3 text-sm/6',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                  '*:text-black'
                )}
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
              </select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-1/2 right-2 w-4 fill-black/60"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <IconButton onClick={handlePrevious} disabled={currentPage === 1}>
            <ChevronLeftOutlined />
          </IconButton>
          <span className="mx-2">
            {currentPage} of {totalPages}
          </span>
          <IconButton
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <ChevronRightOutlined />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
