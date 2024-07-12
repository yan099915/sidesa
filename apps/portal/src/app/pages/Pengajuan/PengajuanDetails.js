import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestDetails } from '../../api/actions/RequestActions';
import { useParams } from 'react-router-dom';
import moment from 'moment';

export default function PengajuanDetails() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  // Mendapatkan data dari Redux store
  const DoGetRequestDetails = useSelector(
    (state) => state.ReduxState.DoGetRequestDetails
  );
  const RequestDetails = useSelector(
    (state) => state.RequestReducers.RequestDetails
  );

  useEffect(() => {
    // Memanggil action untuk mendapatkan detail pengajuan
    if (DoGetRequestDetails) {
      const params = {
        id: id,
      };
      dispatch(getRequestDetails(params));
      dispatch({ type: 'set', DoGetRequestDetails: false });
    }
  }, [DoGetRequestDetails]);

  useEffect(() => {
    // Mengatur loading state
    if (!DoGetRequestDetails) {
      dispatch({ type: 'set', DoGetRequestDetails: true });
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Mengatur timeout untuk menunjukkan loading spinner selama 3 detik
  }, []);

  const renderTableRows = (data) => {
    return Object.entries(data)
      .filter(
        ([key]) => key !== 'jenis_pengajuan' && key !== 'status_pengajuan'
      )
      .map(([key, value]) => {
        if (key === 'type' || key === 'status') {
          return (
            <tr key={key}>
              <td className="border border border-zinc-200 px-4 py-2">
                {key.replace(/_/g, ' ')}
              </td>
              <td
                className={
                  (key === 'status' && value.nama === 'Menunggu'
                    ? 'text-yellow-600'
                    : key === 'status' && value.nama === 'Diproses'
                    ? 'text-blue-600'
                    : key === 'status' && value.nama === 'Selesai'
                    ? 'text-green-600'
                    : key === 'status'
                    ? 'text-red-600'
                    : '') + ' border border-zinc-200 px-4 py-2'
                }
              >
                {value.nama}
              </td>
            </tr>
          );
        }
        if (key === 'created_at' || key === 'updated_at') {
          return (
            <tr key={key}>
              <td className="border border border-zinc-200 px-4 py-2">
                {key.replace(/_/g, ' ')}
              </td>
              <td className="border border border-zinc-200 px-4 py-2">
                {moment(value).format('YYYY-MM-DD HH:mm')}
              </td>
            </tr>
          );
        }
        if (value !== null && typeof value !== 'object') {
          return (
            <tr key={key}>
              <td className="border border border-zinc-200 px-4 py-2">
                {key.replace(/_/g, ' ')}
              </td>
              <td className="border border border-zinc-200 px-4 py-2">
                {value}
              </td>
            </tr>
          );
        } else if (typeof value === 'object' && value !== null) {
          return (
            <tr key={key}>
              <td className="border border border-zinc-200 px-4 py-2">
                {key.replace(/_/g, ' ')}
              </td>
              <td className="border border border-zinc-200 px-4 py-2">
                <table className="table-auto w-full">
                  <tbody>{renderTableRows(value)}</tbody>
                </table>
              </td>
            </tr>
          );
        }
        return null;
      });
  };

  return (
    <div className="container mx-auto">
      <div className="mt-8">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="bg-white">
            <h2 className="text-xl font-bold mb-4">Detail Pengajuan</h2>
            {RequestDetails && !RequestDetails.error ? (
              <table className="table-auto w-full">
                <tbody>{renderTableRows(RequestDetails.data)}</tbody>
              </table>
            ) : (
              <p>{RequestDetails.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
