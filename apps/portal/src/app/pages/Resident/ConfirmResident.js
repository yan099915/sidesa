import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getVerificationDataDetails,
  verificationApproval,
} from '../../api/actions/VerificationsActions';
import { Cancel, CheckCircle, OpenInNew, Close } from '@mui/icons-material';
import { getResidentDetails } from '../../api/actions/ResidentActions';
import toast from 'react-hot-toast';
import { getFile } from '../../api/actions/FilesActions';

const API_URL = process.env.NX_PUBLIC_API_URL;

export default function ConfirmResident() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [submitVerification, setSubmitVerification] = useState(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const DoGetVerificationDetails = useSelector(
    (state) => state.ReduxState.DoGetVerificationDetails
  );
  const VerificationRequestDetails = useSelector(
    (state) => state.VerificationReducers.VerificationRequestDetails
  );
  const ResidentDetails = useSelector(
    (state) => state.ResidentReducers.ResidentDetails
  );
  const ErrorResidentDetails = useSelector(
    (state) => state.ResidentReducers.errorResidentDetails
  );
  const VerificationApproval = useSelector(
    (state) => state.VerificationReducers.VerificationApproval
  );
  const errorVerificationApproval = useSelector(
    (state) => state.VerificationReducers.errorVerificationApproval
  );

  const FileImage = useSelector((state) => state.FileReducers.File);

  const handleViewImage = (key, type) => {
    setLoadingImage(true);
    console.log(key, 'key');
    const param = {
      type: key,
      filename:
        type === 'verification'
          ? VerificationRequestDetails.data[key]
          : ResidentDetails.data[key],
    };
    dispatch(getFile(param));
    // setSelectedImage(imageUrl);
    setSelectedImage(
      `${API_URL}/file/${key}/${
        type === 'verification'
          ? VerificationRequestDetails.data[key]
          : ResidentDetails.data[key]
      }`
    );
  };

  const closeImageModal = () => {
    dispatch({
      type: 'GET_FILE',
      payload: { data: false, errorMessage: false },
    });
    setSelectedImage(null);
  };

  const handleSubmitModal = (e) => {
    setSubmitVerification(e);
    if (e === 'confirm') setStatus(2);
    if (e === 'reject') setStatus(3);
  };

  const closeSubmitModal = () => {
    setSubmitVerification(null);
    setStatus(null);
  };

  const submitVerificationData = () => {
    // setDisableSubmit(true);
    const data = {
      id,
      status,
      notes,
    };
    dispatch(verificationApproval(data));
    setSubmitVerification(null);

    toast.loading('Validating data...', {
      id: 'verification-data',
    });
  };

  function prettifyLabel(text) {
    const cleaned = text.replace(/_/g, ' ');
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  useEffect(() => {
    //    wait until image available
    if (FileImage) {
      console.log(FileImage, 'datanya');
      // setSelectedImage(FileImage);
    }
    console.log('set loading image false');
    setTimeout(() => {
      setLoadingImage(false);
    }, 2000);
  }, [FileImage]);

  useEffect(() => {
    if (DoGetVerificationDetails) {
      dispatch(getVerificationDataDetails(id));
      dispatch({ type: 'set', DoGetVerificationDetails: false });
    }
  }, [DoGetVerificationDetails, dispatch]);

  useEffect(() => {
    if (!DoGetVerificationDetails) {
      dispatch({ type: 'set', DoGetVerificationDetails: true });
    }
  }, [dispatch]);

  useEffect(() => {
    if (VerificationRequestDetails && VerificationRequestDetails.data) {
      dispatch(getResidentDetails(VerificationRequestDetails.data.nomor_ktp));
    }
  }, [VerificationRequestDetails, dispatch]);

  useEffect(() => {
    console.log(
      ResidentDetails,
      ErrorResidentDetails,
      'ResidentDetails,ErrorResidentDetails'
    );
  }, [ResidentDetails, ErrorResidentDetails]);

  useEffect(() => {
    if (VerificationApproval) {
      toast.success(VerificationApproval.message, {
        id: 'verification-data',
      });

      setTimeout(() => {
        navigate('/resident');
      }, 2000);
    }

    if (errorVerificationApproval) {
      toast.error(errorVerificationApproval, {
        id: 'verification-data',
      });
    }

    dispatch({
      type: 'VERIFICATION_APPROVAL',
      payload: { data: false, errorMessage: false },
    });

    setTimeout(() => {
      toast.dismiss('verification-data');
      // setDisableSubmit(true);
    }, 2000);

    setStatus(null);
  }, [VerificationApproval, errorVerificationApproval]);

  return (
    <div>
      <div>
        {/* Form Pengajuan */}
        <h2 className="text-xl font-semibold pb-4">Verifikasi Data Penduduk</h2>
        <div className=" py-10">
          {ResidentDetails && !ResidentDetails.data ? (
            <span className="bg-red-500 text-white p-2 rounded-md">
              Tidak ada data penduduk yang cocok.
            </span>
          ) : (
            <span className="bg-green-500 text-white p-2 rounded-md">
              Ditemukan data penduduk yang cocok.
            </span>
          )}
        </div>
        <div>
          {VerificationRequestDetails && VerificationRequestDetails.data ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="border-t border-b border-gray-200">
                    <th className="py-2 px-4 text-left">Nama</th>
                    <th className="py-2 px-4 text-left">Data Pemohon</th>
                    <th className="py-2 px-4 text-left">Data Desa</th>
                    <th className="py-2 px-4 text-left">Kecocokan</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(VerificationRequestDetails.data)
                    .filter(
                      (key) =>
                        ![
                          'id_pengguna',
                          'status',
                          'id',
                          'agent_id',
                          'notes',
                          'verification_status',
                          'rt',
                          'rw',
                          'createdAt',
                          'updatedAt',
                          'lat',
                          'lng',
                        ].includes(key)
                    )
                    .map((key) => (
                      <tr key={key} className="border-b border-zinc-900/20">
                        <td className="py-2 px-4 font-bold">
                          {prettifyLabel(key)}
                        </td>
                        <td className="py-2 px-4">
                          {key.startsWith('foto') ? (
                            <button
                              className="text-blue-500 hover:underline"
                              onClick={() =>
                                handleViewImage(key, 'verification')
                              }
                            >
                              Lihat gambar
                            </button>
                          ) : (
                            prettifyLabel(VerificationRequestDetails.data[key])
                          )}
                        </td>
                        <td className="py-2 px-4">
                          {ResidentDetails.data && ResidentDetails.data[key] ? (
                            key.startsWith('foto') ? (
                              <button
                                className="text-blue-500 hover:underline"
                                onClick={() => handleViewImage(key, 'resident')}
                              >
                                Lihat Gambar
                              </button>
                            ) : (
                              prettifyLabel(ResidentDetails.data[key])
                            )
                          ) : (
                            <span className="text-gray-500 italic">
                              Tidak ada gambar
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-4">
                          {!key.startsWith('foto') &&
                            ResidentDetails.data &&
                            (VerificationRequestDetails.data[key] ===
                            ResidentDetails.data[key] ? (
                              <CheckCircle className="text-green-500 w-4" />
                            ) : (
                              <Cancel className="text-red-500 w-4" />
                            ))}
                        </td>
                      </tr>
                    ))}
                  <tr className="border-b border-zinc-900/20 ">
                    <td className="py-2 px-4 font-bold">Requester</td>
                    <td colSpan={3} className="text-center">
                      {VerificationRequestDetails.data.id_pengguna
                        ? VerificationRequestDetails.data.id_pengguna
                        : '-'}
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-900/20 ">
                    <td className="py-2 px-4 font-bold">Last Updated By</td>
                    <td colSpan={3} className="text-center">
                      {VerificationRequestDetails.data.agent_id
                        ? VerificationRequestDetails.data.agent_id
                        : '-'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            ''
          )}
        </div>
        <form>
          {VerificationRequestDetails &&
            VerificationRequestDetails.data.verification_status.id === 1 && (
              <div className="my-4">
                <label className="block text-gray-700">Catatan*</label>
                <textarea
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={status !== null}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Catatan penjelasan wajib diisi minimal 10 karakter*"
                />
              </div>
            )}
          <div className="flex justify-between">
            {VerificationRequestDetails &&
              VerificationRequestDetails.data.verification_status.id === 1 && (
                <div className="inline-flex space-x-4">
                  <button
                    onClick={() => handleSubmitModal('confirm')}
                    disabled={
                      (status !== null && notes === '') || notes.length < 10
                    }
                    type="button"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Konfirmasi
                  </button>
                  <button
                    onClick={() => handleSubmitModal('reject')}
                    disabled={
                      (status !== null && notes === '') || notes.length < 10
                    }
                    type="button"
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Tolak
                  </button>
                </div>
              )}
            <button
              onClick={() => navigate('/resident')}
              disabled={status !== null}
              type="button"
              className="mt-4 px-4 py-2 bg-zinc-900 text-white rounded"
            >
              Kembali
            </button>
          </div>
        </form>
      </div>
      {selectedImage && (
        <div className=" fixed z-9999 inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div
            className={
              'flex w-1/4 relative justify-center items-center content-center'
            }
          >
            {loadingImage ? (
              <div className="z-9999 max-w-full max-h-full p-20">
                Memuat
                <svg
                  className="size-5 animate-spin text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              </div>
            ) : (
              <img
                src={selectedImage}
                alt="Preview"
                className="z-9999 max-w-full max-h-full"
              />
            )}
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
      {submitVerification && (
        <div className="fixed z-9999 inset-0 bg-zinc-900/40 flex items-center justify-center">
          <div className="flex flex-col gap-y-10 bg-white p-10 shadow-md  rounded-sm">
            <h1 className="font-bold text-xl">
              Apakah anda yakin akan{' '}
              {submitVerification === 'confirm' ? 'menyetujui' : 'menolak'} data
              ini??
            </h1>
            <div className="flex justify-between">
              <button
                onClick={submitVerificationData}
                // disabled={disableSubmit}
                className="  text-white bg-blue-500 rounded-md px-4 py-2"
              >
                Kirim
              </button>
              <button
                onClick={closeSubmitModal}
                // disabled={disableSubmit}
                className="  text-white bg-red-500 rounded-md px-4 py-2"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
