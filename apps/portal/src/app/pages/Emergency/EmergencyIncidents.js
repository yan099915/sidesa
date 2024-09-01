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
import { Button, Field, Input, Label } from '@headlessui/react';
import { verifySession } from '../../api/actions/UsersActions';
import DefaultLayout from '../../layout/defaultLayout';
import {
  getEmergencyList,
  writeEmergencyViewLog,
} from '../../api/actions/EmergencyActions';
import moment from 'moment';

export default function EmergencyIncidents() {
  const [jenisFilter, setJenisFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [prevSearch, setPrevSearch] = useState('');
  const DoGetEmergencyList = useSelector(
    (state) => state.ReduxState.DoGetEmergencyList
  );
  const Emergencies = useSelector(
    (state) => state.EmergencyReducers.EmergencyList
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPages =
    Emergencies && Emergencies.data ? Emergencies.data.totalPages : 1;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleFetchData(pageSize, newPage);
  };

  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setPage(1);
    handleFetchData(newSize, 1);
  };

  const handleFetchData = (
    paginationSize = pageSize,
    paginationPage = page,
    typeFilter = jenisFilter,
    statsFilter = statusFilter,
    searchFilter = search
  ) => {
    const params = {
      limit: paginationSize,
      page: paginationPage,
    };

    if (searchFilter) {
      params.search = searchFilter;
    }

    if (typeFilter) {
      params.jenis_pengajuan = typeFilter;
    }

    if (statsFilter) {
      params.status_pengajuan = statsFilter;
    }

    dispatch(getEmergencyList(params));
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
    handleFetchData(pageSize, page, jenisFilter, statusFilter, '');
  };

  const handleRowClick = (id) => {
    const data = {
      emergency_id: id,
    };
    dispatch(writeEmergencyViewLog(data));
    navigate(`/emergency/details/${id}`);
  };

  useEffect(() => {
    if (DoGetEmergencyList) {
      dispatch(verifySession());
      const param = {
        page: 1,
        limit: 10,
      };
      dispatch(getEmergencyList(param));
      dispatch({ type: 'set', DoGetEmergencyList: false });
    }
  }, [DoGetEmergencyList]);

  useEffect(() => {
    // console.log(DoGetEmergencyList, 'DoGetEmergencyList');
    if (!DoGetEmergencyList) {
      dispatch({ type: 'set', DoGetEmergencyList: true });
    }
  }, []);

  // console.log(Emergencies, 'Emergencies');
  // Jika ada riwayat pengajuan, tampilkan tabel
  return (
    <div>
      <h2 className="text-xl font-bold">Emergency Incidents</h2>
      <div className="bg-white my-4">
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
              placeholder="Cari ID"
              onKeyDown={(e) => handleSearchEnter(e)}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="p-2 ring-1 ring-zinc-900/20 rounded-md"
            ></Input>
          </Field>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-t border-b border-zinc-200">
              <th className="py-2">ID</th>
              <th className="py-2">Status</th>
              <th className="py-2">Jenis</th>
              <th className="py-2">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {Emergencies &&
            Emergencies.data &&
            Emergencies.data.insident.length > 0 ? (
              Emergencies.data.insident.map((insident) => (
                <tr
                  key={insident.id}
                  onClick={() => handleRowClick(insident.id)}
                  className="border-b border-zinc-200  hover:bg-zinc-100 cursor-pointer text-xs sm:text-base text-center"
                >
                  <td className="py-2">{insident.id}</td>
                  <td
                    className={
                      (insident.status === 'open'
                        ? 'text-red-500'
                        : 'text-green-500') + ' py-2'
                    }
                  >
                    {insident.status}
                  </td>
                  <td className="py-2">{insident.jenis_kejadian}</td>
                  <td className="py-2">
                    {moment(insident.created_at).format('YYYY-MM-DD HH:mm')}
                  </td>
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
    </div>
  );
}
