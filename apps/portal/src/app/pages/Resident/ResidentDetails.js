import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getResidentDetails } from '../../api/actions/ResidentActions';
import { OpenInNew, Close } from '@mui/icons-material';
import { Field, Label } from '@headlessui/react';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { getFile } from '../../api/actions/FilesActions';

const API_URL = process.env.NX_PUBLIC_API_URL;
const GMAPS_APIKEY = process.env.NX_PUBLIC_GMAPS_API_KEY;
const GMAPS_ID = process.env.NX_PUBLIC_GMAPS_ID;
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
  const FileImage = useSelector((state) => state.FileReducers.File);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);

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

  const handleViewImage = (key) => {
    setLoadingImage(true);
    const param = {
      type: key,
      filename: ResidentDetails.data[key],
    };
    dispatch(getFile(param));
    // setSelectedImage(imageUrl);
    setSelectedImage(`${API_URL}/file/${key}/${ResidentDetails.data[key]}`);
  };

  const closeImageModal = () => {
    dispatch({
      type: 'GET_FILE',
      payload: { data: false, errorMessage: false },
    });
    setSelectedImage(null);
  };

  // console.log({
  //   lat: ResidentDetails?.data?.lat,
  //   lng: ResidentDetails?.data?.lng,
  // });

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
                        ![
                          'id_pengguna',
                          'status',
                          'id',
                          'agent_id',
                          'keluarga',
                          'lat',
                          'lng',
                          'rt',
                          'rw',
                        ].includes(key)
                    )
                    .map((key) => (
                      <tr key={key} className="border-b border-zinc-900/20">
                        <td className="py-2 px-4 font-bold">{key}</td>
                        <td className="py-2 px-4">
                          {key.startsWith('foto') ? (
                            ResidentDetails.data[key] ? (
                              <button
                                className="text-blue-500 hover:underline"
                                onClick={() => handleViewImage(key)}
                              >
                                Lihat gambar
                              </button>
                            ) : (
                              <span className="text-gray-500 italic">
                                Tidak ada gambar
                              </span>
                            )
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
              <Field className="flex flex-col gap-4 my-6 w-full">
                <Label className="text-sm  font-bold leading-normal text-gray-900">
                  Lokasi Rumah
                </Label>
                {ResidentDetails && ResidentDetails.data && (
                  <APIProvider apiKey={GMAPS_APIKEY} libraries={['marker']}>
                    <div className="flex w-full h-[300px]">
                      <Map
                        mapId={GMAPS_ID}
                        defaultZoom={18}
                        defaultCenter={{
                          lat: Number(ResidentDetails?.data?.lat),
                          lng: Number(ResidentDetails?.data?.lng),
                        }}
                        gestureHandling={'greedy'}
                        // onDblclick={(e) => handleDoubleClickMap(e)}
                      >
                        {/* advanced marker with html-content */}
                        <AdvancedMarker
                          position={{
                            lat: Number(ResidentDetails?.data?.lat),
                            lng: Number(ResidentDetails?.data?.lng),
                          }}
                          // onDragEnd={(e) => handleChangeLocation(e)}
                          // draggable={true}
                        ></AdvancedMarker>
                      </Map>
                    </div>
                  </APIProvider>
                )}
              </Field>
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
            {loadingImage ? (
              <div className="z-9999 max-w-full max-h-full p-20">
                memuat
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
    </div>
  );
}
