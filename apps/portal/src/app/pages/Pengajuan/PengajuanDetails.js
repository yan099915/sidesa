import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestDetails } from '../../api/actions/RequestActions';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Close, OpenInNew } from '@mui/icons-material';

const DOMAIN = process.env.NX_PUBLIC_DOMAIN;

export default function PengajuanDetails() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  // Mendapatkan data dari Redux store
  const DoGetRequestDetails = useSelector(
    (state) => state.ReduxState.DoGetRequestDetails
  );
  const RequestDetails = useSelector(
    (state) => state.RequestReducers.RequestDetails
  );

  const handlePrint = () => {
    console.log('a');
  };

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

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
    }, 300); // Mengatur timeout untuk menunjukkan loading spinner selama 3 detik
  }, [dispatch]);

  const renderTableRows = (data) => {
    return Object.entries(data)
      .filter(
        ([key]) =>
          key !== 'jenis_pengajuan' &&
          key !== 'status_pengajuan' &&
          key !== 'jenis_ttd' &&
          key !== 'id_pengguna' &&
          key !== 'id_pengajuan' &&
          key !== 'pengguna' &&
          key !== 'penduduk'
      )
      .map(([key, value]) => {
        if (key === 'type' || key === 'status') {
          return (
            <tr key={key}>
              <td className="border border-zinc-200 px-4 py-2">
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
        if (key === 'dokumen' || key === 'surat') {
          return (
            <tr key={key}>
              <td className="border border-zinc-200 px-4 py-2">
                {key.replace(/_/g, ' ')}
              </td>
              <td className="border border-zinc-200 px-4 py-2">
                {value !== null ? (
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => {
                      key === 'dokumen'
                        ? handleViewImage(
                            `${DOMAIN}/assets/files/surat_rs/${value}`
                          )
                        : //  open new window to view surat
                          window.open(
                            `${DOMAIN}/assets/files/surat/${value}`,
                            '_blank'
                          );
                    }}
                  >
                    {key === 'dokumen' ? 'View' : 'Download'}
                  </button>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        }
        if (key === 'created_at' || key === 'updated_at') {
          return (
            <tr key={key}>
              <td className="border border-zinc-200 px-4 py-2">
                {key.replace(/_/g, ' ')}
              </td>
              <td className="border border-zinc-200 px-4 py-2">
                {moment(value).format('YYYY-MM-DD HH:mm')}
              </td>
            </tr>
          );
        }
        if (value !== null && typeof value !== 'object') {
          return (
            <tr key={key}>
              <td className="border border-zinc-200 px-4 py-2">
                {key.replace(/_/g, ' ')}
              </td>
              <td className="border border-zinc-200 px-4 py-2">{value}</td>
            </tr>
          );
        } else if (typeof value === 'object' && value !== null) {
          if (key === 'jenis_tanda_tangan') {
            return (
              <tr key={key}>
                <td className="border border-zinc-200 px-4 py-2">
                  {key.replace(/_/g, ' ')}
                </td>
                <td className="border border-zinc-200 px-4 py-2">
                  {value.name}
                </td>
              </tr>
            );
          }
          return (
            <tr key={key}>
              <td className="border border-zinc-200 px-4 py-2">
                {key.replace(/_/g, ' ')}
              </td>
              <td className="border border-zinc-200 px-4 py-2">
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
          <div className="bg-white ">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl font-bold">Detail Pengajuan</h2>
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="py-2 px-4 bg-zinc-900 text-white rounded-lg hover:bg-zinc-600 transition-colors duration-300"
              >
                Back
              </button>
            </div>
            <div className="overflow-x-auto p-4">
              {RequestDetails && !RequestDetails.error ? (
                <table className="table-auto w-full">
                  <tbody>{renderTableRows(RequestDetails.data)}</tbody>
                </table>
              ) : (
                <p>Error Loading Data</p>
              )}
            </div>
          </div>
        )}
      </div>
      {selectedImage && (
        <div className=" fixed z-9999 inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div
            className={
              'flex w-1/4 relative justify-center items-center content-center'
            }
          >
            <img
              src={selectedImage}
              alt="Preview"
              className="z-9999 max-w-full max-h-full"
            />
            <div className="flex absolute z-99999 top-2 gap-x-4">
              <button
                onClick={closeImageModal}
                className="  text-black bg-white rounded-full p-2"
              >
                <Close className="w-4" />
              </button>
              <button
                onClick={(e) => window.open(`${selectedImage}`, '_blank')}
                className=" text-black bg-white rounded-full p-2"
              >
                <OpenInNew className="w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
