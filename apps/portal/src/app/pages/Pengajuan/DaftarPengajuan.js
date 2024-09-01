import React, { useEffect, useState } from 'react';
import {
  Select,
  Listbox,
  Field,
  Button,
  Input,
  Label,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  Cancel,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestList } from '../../api/actions/RequestActions';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const jenisOptions = [
  { value: '', label: 'Semua' },
  { value: '1', label: 'Keterangan Domisili' },
  // { value: '2', label: 'Surat Kelahiran' },
  { value: '3', label: 'Surat Kematian' },
];

const statusOptions = [
  { value: '', label: 'Semua' },
  { value: '1', label: 'Menunggu' },
  { value: '2', label: 'Diproses' },
  { value: '3', label: 'Selesai' },
  { value: '4', label: 'Ditolak' },
];

export default function DaftarPengajuan() {
  const [jenisFilter, setJenisFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [prevSearch, setPrevSearch] = useState('');

  const RequestList = useSelector((state) => state.RequestReducers.RequestList);
  const DoGetRequestList = useSelector(
    (state) => state.ReduxState.DoGetRequestList
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPages = RequestList ? RequestList.data.totalPages : 1;

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

  const handleRowClick = (id) => {
    navigate(`/request/process/${id}`);
  };

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      if (search !== prevSearch) {
        setPrevSearch(search);
        handleFetchData(pageSize, page, jenisFilter, statusFilter, search);
      }
    }
  };

  const handleClearSearch = () => {
    setSearch('');
    setPrevSearch('');
    handleFetchData(pageSize, page, jenisFilter, statusFilter, '');
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

    dispatch(getRequestList(params));
  };

  useEffect(() => {
    handleFetchData(pageSize, page, jenisFilter, statusFilter);
  }, [jenisFilter, statusFilter]);

  useEffect(() => {
    if (DoGetRequestList) {
      handleFetchData();
      dispatch({ type: 'set', DoGetRequestList: false });
    }
  }, [DoGetRequestList]);

  useEffect(() => {
    if (!DoGetRequestList) {
      dispatch({ type: 'set', DoGetRequestList: true });
    }
  }, []);

  return (
    <div>
      <div className="mb-4 flex flex-row justify-end space-x-4">
        <div className="flex items-center mb-4">
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
              placeholder="Cari Kode"
              onKeyDown={(e) => handleSearchEnter(e)}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="text-xs sm:text-sm p-2 ring-1 ring-zinc-900/20 rounded-md"
            ></Input>
          </Field>
        </div>
      </div>
      <div className="mb-4 flex flex-row space-x-4">
        <div className="w-1/2">
          <Listbox value={jenisFilter} onChange={setJenisFilter}>
            <Listbox.Label className="text-xs sm:text-sm font-medium text-gray-700">
              Jenis Pengajuan:
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button className="relative text-xs sm:text-sm w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none">
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
              <Listbox.Options className="absolute text-xs sm:text-sm z-99 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
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
            <Listbox.Label className="text-xs sm:text-sm font-medium text-gray-700">
              Status:
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button className="relative text-xs sm:text-sm w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none">
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
              <Listbox.Options className="absolute text-xs sm:text-sm z-99 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
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
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-t border-b border-zinc-200 text-xs sm:text-base">
              <th className="py-2">Kode</th>
              <th className="py-2">Jenis Pengajuan</th>
              <th className="py-2">Jenis TTD</th>
              <th className="py-2">Tanggal</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {RequestList &&
            RequestList.data &&
            RequestList.data.requests &&
            RequestList.data.requests.length > 0 ? (
              RequestList.data.requests.map((pengajuan) => (
                <tr
                  key={pengajuan.id}
                  onClick={() => handleRowClick(pengajuan.id)}
                  className="border-b border-zinc-200 hover:bg-zinc-100 cursor-pointer text-xs sm:text-base text-center"
                >
                  <td className="py-2">{pengajuan.id}</td>
                  <td className="py-2">{pengajuan.type.nama}</td>
                  <td className="py-2">
                    {pengajuan.jenis_ttd === 2 ? 'Basah' : 'Digital'}
                  </td>
                  <td className="py-2">
                    {moment(pengajuan.created_at).format('YYYY-MM-DD HH:mm')}
                  </td>
                  <td
                    className={
                      (pengajuan.status_pengajuan === 1
                        ? 'text-yellow-600'
                        : pengajuan.status_pengajuan === 2
                        ? 'text-blue-600'
                        : pengajuan.status_pengajuan === 3
                        ? 'text-green-600'
                        : 'text-red-600') + ' py-2'
                    }
                  >
                    {pengajuan.status.nama}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-2 text-center border-b border-zinc-200"
                >
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col content-center justify-center text-center">
          <div className="flex gap-x-4 items-center text-xs sm:text-base">
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
        <div className="flex items-center justify-center mt-4 text-xs sm:text-base">
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
