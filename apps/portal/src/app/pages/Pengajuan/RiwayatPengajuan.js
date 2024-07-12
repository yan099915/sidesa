import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { requestHistory } from '../../api/actions/RequestActions';
import moment from 'moment';

export default function RiwayatPengajuan() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const DoGetRequestHistory = useSelector(
    (state) => state.ReduxState.DoGetRequestHistory
  );
  const RequestHistoryData = useSelector(
    (state) => state.RequestReducers.RequestHistory
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPages = RequestHistoryData
    ? RequestHistoryData.data.totalPages
    : 1;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleFetchData(pageSize, newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);

    handleFetchData(Number(event.target.value), 1);
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
    navigate(`/request/details/${id}`);
  };

  const handleFetchData = (paginationSize, paginationPage) => {
    const params = {
      limit: paginationSize || pageSize,
      page: paginationPage || page,
    };
    dispatch(requestHistory(params));
  };

  useEffect(() => {
    if (DoGetRequestHistory) {
      handleFetchData();
      dispatch({ type: 'set', DoGetRequestHistory: false });
    }
  }, [DoGetRequestHistory]);

  useEffect(() => {
    if (!DoGetRequestHistory) {
      dispatch({ type: 'set', DoGetRequestHistory: true });
    }
  }, []);

  // Jika ada riwayat pengajuan, tampilkan tabel
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex w-full justify-end items-center mb-4">
          {/* <Field className="relative flex justify-center content-center items-center">
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
          </Field> */}
          <Link to="form" className="px-4 py-2 bg-zinc-900 text-white rounded">
            Buat
          </Link>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-t border-b border-zinc-200">
            <th className="py-2">Kode</th>
            <th className="py-2">Jenis Pengajuan</th>
            <th className="py-2">Tanggal</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {RequestHistoryData &&
          RequestHistoryData.data &&
          RequestHistoryData.data.requests &&
          RequestHistoryData.data.requests.length > 0 ? (
            RequestHistoryData.data.requests.map((pengajuan) => (
              <tr
                key={pengajuan.id}
                onClick={() => handleRowClick(pengajuan.id)}
                className="border-b border-zinc-200 hover:bg-zinc-100 cursor-pointer text-xs sm:text-base text-center"
              >
                <td className="py-2">{pengajuan.id}</td>
                <td className="py-2">{pengajuan.type.nama}</td>
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
