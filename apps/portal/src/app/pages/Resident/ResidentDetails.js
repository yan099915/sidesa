import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getResidentDetails } from '../../api/actions/ResidentActions';
import { OpenInNew, Close } from '@mui/icons-material';

const DOMAIN = process.env.NX_PUBLIC_DOMAIN;
export default function ResidentDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nik } = useParams();
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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (DoGetVerificationDetails) {
      dispatch(getResidentDetails(nik));
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

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div>
        {/* Form Pengajuan */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold pb-4">Details Penduduk</h2>
          <div className="my-4">
            <button
              type="button"
              onClick={() => navigate('/resident')}
              className="px-4 py-2 bg-zinc-900 text-white rounded"
            >
              Back
            </button>
          </div>
        </div>
        <div>
          {ResidentDetails && ResidentDetails.data ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="border-t border-b border-gray-200">
                    <th className="py-2 px-4 text-left">Field</th>
                    <th className="py-2 px-4 text-left">Data Penduduk</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(ResidentDetails.data)
                    .filter(
                      (key) =>
                        !['id_pengguna', 'status', 'id', 'agent_id'].includes(
                          key
                        )
                    )
                    .map((key) => (
                      <tr key={key} className="border-b border-zinc-900/20">
                        <td className="py-2 px-4 font-bold">{key}</td>
                        <td className="py-2 px-4">
                          {key.startsWith('foto') ? (
                            <button
                              className="text-blue-500 hover:underline"
                              onClick={() =>
                                handleViewImage(
                                  `${DOMAIN}/assets/files/${key}/${ResidentDetails.data[key]}`
                                )
                              }
                            >
                              View
                            </button>
                          ) : typeof ResidentDetails.data[key] === 'string' ||
                            typeof ResidentDetails.data[key] === 'number' ? (
                            ResidentDetails.data[key]
                          ) : typeof ResidentDetails.data[key] === 'object' &&
                            ResidentDetails.data[key] !== null &&
                            ResidentDetails.data[key].nomor_kk ? (
                            ResidentDetails.data[key].nomor_kk
                          ) : (
                            'Error Showing Data'
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            ''
          )}
        </div>
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
