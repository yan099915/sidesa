import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getVerificationData } from '../../api/actions/VerificationsActions';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import clsx from 'clsx';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function VerificationRequest() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const DoGetVerificationData = useSelector(
    (state) => state.ReduxState.DoGetVerificationData
  );

  const VerificationRequestData = useSelector(
    (state) => state.VerificationReducers.GetVerificationData
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPages = VerificationRequestData
    ? VerificationRequestData.data.totalPages
    : 1;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleFetchData();
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);
    handleFetchData();
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
    navigate(`/resident/confirm/${id}`);
  };

  const handleFetchData = () => {
    const params = {
      limit: pageSize,
      page: page,
    };
    dispatch(getVerificationData(params));
  };

  useEffect(() => {
    if (DoGetVerificationData) {
      const params = {
        limit: pageSize,
        page: page,
      };
      dispatch(getVerificationData(params));
      dispatch({ type: 'set', DoGetVerificationData: false });
    }
  }, [DoGetVerificationData, dispatch]);

  useEffect(() => {
    if (!DoGetVerificationData) {
      dispatch({ type: 'set', DoGetVerificationData: true });
    }
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Permintaan Verifikasi</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-t border-b border-zinc-200">
            <th className="py-2">ID</th>
            <th className="py-2">Nama</th>
            <th className="py-2">Status</th>
            <th className="py-2">Created</th>
            <th className="py-2">Updated</th>
          </tr>
        </thead>
        <tbody>
          {VerificationRequestData &&
          VerificationRequestData.data.verifications ? (
            VerificationRequestData.data.verifications.map((data) => (
              <tr
                key={data.id}
                onClick={() => handleRowClick(data.id)}
                className="border-b border-zinc-200 text-center hover:bg-zinc-100 cursor-pointer text-xs sm:text-base"
              >
                <td className="py-2">{data.id}</td>
                <td className="py-2">{data.nama}</td>
                <td className="py-2">
                  <p
                    className={data.status ? 'text-green-500' : 'text-red-500'}
                  >
                    {data.status
                      ? 'Approved'
                      : !data.status && data.notes
                      ? 'Need to revise'
                      : 'Pending'}
                  </p>
                </td>
                <td className="py-2">
                  {moment(data.created_at).format('YYYY-MM-DD HH:mm')}
                </td>
                <td className="py-2">
                  {moment(data.updated_at).format('YYYY-MM-DD HH:mm')}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="col-span-5 text-center">No Data Found</td>
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
