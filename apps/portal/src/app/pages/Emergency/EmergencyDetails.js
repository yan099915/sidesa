import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeEmergencyIncident,
  getEmergencyDetails,
} from '../../api/actions/EmergencyActions';
import moment from 'moment';
import { Close, OpenInNew } from '@mui/icons-material';
import { getResidentDetails } from '../../api/actions/ResidentActions';
import {
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import toast from 'react-hot-toast';
const GMAPS_APIKEY = process.env.NX_PUBLIC_GMAPS_API_KEY;
const GMAPS_ID = process.env.NX_PUBLIC_GMAPS_ID;
const DOMAIN = process.env.NX_PUBLIC_DOMAIN;

export default function EmergencyDetails() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [disabled, setDisabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const DoGetEmergencyDetails = useSelector(
    (state) => state.ReduxState.DoGetEmergencyDetails
  );
  const EmergencyDetails = useSelector(
    (state) => state.EmergencyReducers.EmergencyDetails
  );
  const ResidentDetails = useSelector(
    (state) => state.ResidentReducers.ResidentDetails
  );
  const CloseEmergency = useSelector(
    (state) => state.EmergencyReducers.CloseEmergency
  );
  const errorCloseEmergency = useSelector(
    (state) => state.EmergencyReducers.errorCloseEmergency
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleCloseIncident = () => {
    setDisabled(true);
    toast.loading('Closing Incident', { id: 'closeIncident' });
    dispatch(closeEmergencyIncident(EmergencyDetails.data.id));
  };

  useEffect(() => {
    if (EmergencyDetails && EmergencyDetails.data) {
      // get detail penduduk yang mengirimkan info darurat
      dispatch(getResidentDetails(EmergencyDetails.data.pengguna.nomor_ktp));
    }
  }, [EmergencyDetails]);

  useEffect(() => {
    if (DoGetEmergencyDetails) {
      dispatch(getEmergencyDetails(id));
      dispatch({ type: 'set', DoGetEmergencyDetails: false });
    }
  }, [DoGetEmergencyDetails]);

  useEffect(() => {
    if (CloseEmergency) {
      toast.success('Incident Closed', { id: 'closeIncident' });
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    }
    if (errorCloseEmergency) {
      toast.error('Failed to Close Incident', { id: 'closeIncident' });
      setDisabled(false);
    }
    dispatch({
      type: 'CLOSE_EMERGENCY',
      payload: { data: false, errorMessage: false },
    });
  }, [CloseEmergency, errorCloseEmergency]);

  useEffect(() => {
    // Mengatur loading state
    if (!DoGetEmergencyDetails) {
      dispatch({ type: 'set', DoGetEmergencyDetails: true });
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000); // Mengatur timeout untuk menunjukkan loading spinner selama 3 detik
  }, []);

  return (
    <div>
      <div className="min-h-[600px]">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="bg-white">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl font-bold">Emergency Incident Details</h2>
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="py-2 px-4 bg-zinc-900 text-white rounded-lg hover:bg-zinc-600 transition-colors duration-300"
              >
                Back
              </button>
            </div>
            {EmergencyDetails && EmergencyDetails.data && (
              <div>
                <div className="p-4">
                  <APIProvider apiKey={GMAPS_APIKEY} libraries={['marker']}>
                    <div className="flex w-full h-[300px]">
                      <Map
                        mapId={GMAPS_ID}
                        defaultZoom={18}
                        defaultCenter={{
                          lat: Number(EmergencyDetails.data.lat),
                          lng: Number(EmergencyDetails.data.lng),
                        }}
                        gestureHandling={'greedy'}
                      >
                        {/* advanced marker with html-content */}
                        <AdvancedMarker
                          position={{
                            lat: Number(EmergencyDetails.data.lat),
                            lng: Number(EmergencyDetails.data.lng),
                          }}
                          // onDrag={(e) => console.log(e)}
                          onDrag={(e) => {
                            console.log(e);
                          }}
                          draggable={false}
                        ></AdvancedMarker>
                      </Map>
                    </div>
                  </APIProvider>
                </div>
                <div className="flex w-full px-4">
                  <TabGroup className="w-full">
                    <TabList className="flex gap-4">
                      <Tab
                        key="details"
                        className="rounded-md py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-zinc-900/10 data-[hover]:bg-zinc-900/5 data-[selected]:data-[hover]:bg-zinc-900/10 data-[focus]:outline-1 data-[focus]:outline-white"
                      >
                        Details
                      </Tab>
                      <Tab
                        key="logs"
                        className="rounded-md py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-zinc-900/10 data-[hover]:bg-zinc-900/5 data-[selected]:data-[hover]:bg-zinc-900/10 data-[focus]:outline-1 data-[focus]:outline-white"
                      >
                        View Logs
                      </Tab>
                    </TabList>
                    <TabPanels className="mt-3">
                      <TabPanel
                        key="details"
                        className="rounded-xl bg-zinc-900/5 p-3"
                      >
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex flex-col sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">ID</div>
                            <div>{EmergencyDetails.data.id}</div>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between  bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">Status</div>
                            <div
                              className={
                                (EmergencyDetails.data.status === 'open'
                                  ? 'text-red-500'
                                  : 'text-green-500') + ' font-semibold'
                              }
                            >
                              {EmergencyDetails.data.status}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between  bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">Waktu Insiden</div>
                            <div className="text-red-500">
                              {moment(EmergencyDetails.data.created_at).format(
                                'YYYY-MM-DD HH:mm'
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between  bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">
                              Waktu Penanganan
                            </div>
                            <div className="text-green-500">
                              {moment(EmergencyDetails.data.updated_at).format(
                                'YYYY-MM-DD HH:mm'
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between  bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">Agen</div>
                            <div>
                              {EmergencyDetails.data.agent
                                ? EmergencyDetails.data.agent.email
                                : '-'}
                            </div>
                          </div>
                          <div className="flex flex-col justify-between  bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">Pengirim</div>
                            {ResidentDetails && ResidentDetails.data && (
                              <table>
                                <tbody>
                                  <tr>
                                    <td>Id Pengguna:</td>
                                    <td>:</td>
                                    <td>{EmergencyDetails.data.pengguna.id}</td>
                                  </tr>
                                  <tr>
                                    <td>Nama</td>
                                    <td>:</td>
                                    <td>{ResidentDetails.data.nama}</td>
                                  </tr>
                                  <tr>
                                    <td>No KTP</td>
                                    <td>:</td>
                                    <td>{ResidentDetails.data.nomor_ktp}</td>
                                  </tr>
                                  <tr>
                                    <td>Details</td>
                                    <td>:</td>
                                    <td>
                                      <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() =>
                                          navigate(
                                            '/resident/details/' +
                                              EmergencyDetails.data.pengguna
                                                .nomor_ktp
                                          )
                                        }
                                      >
                                        View
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            )}
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between  bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">Foto Kejadian</div>
                            <div>
                              {EmergencyDetails.data.foto ? (
                                <button
                                  className="text-blue-500 hover:underline"
                                  onClick={() =>
                                    handleViewImage(
                                      `${DOMAIN}/assets/files/foto_emergency/${EmergencyDetails.data.foto}`
                                    )
                                  }
                                >
                                  View
                                </button>
                              ) : (
                                '-'
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between  bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">Keterangan</div>
                            <div>{EmergencyDetails.data.deskripsi}</div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel
                        key="logs"
                        className="rounded-xl bg-zinc-900/5 p-3 max-h-40 overflow-y-auto"
                      >
                        <div className="grid grid-cols-1 gap-2">
                          {EmergencyDetails.data &&
                            EmergencyDetails.data.view_log &&
                            EmergencyDetails.data.view_log.map((log) => (
                              <div className="flex flex-col sm:flex-row justify-between  bg-zinc-900/5 p-2 rounded-md">
                                <div className="font-semibold">
                                  {log.agent.email}
                                </div>
                                <div> {log.created_at}</div>
                              </div>
                            ))}
                        </div>
                      </TabPanel>
                    </TabPanels>
                  </TabGroup>
                </div>
              </div>
            )}
            <div className="p-4">
              {EmergencyDetails &&
                EmergencyDetails.data &&
                EmergencyDetails.data.status === 'open' && (
                  <Button
                    disabled={disabled}
                    className="bg-blue-500 p-2 rounded-md text-white"
                    onClick={handleCloseIncident}
                  >
                    Close Incident
                  </Button>
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
