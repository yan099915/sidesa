import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Input,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/id';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getRequestDetails,
  updateRequest,
} from '../../api/actions/RequestActions';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { OpenInNew, Close, CrisisAlertOutlined } from '@mui/icons-material';
import FormatSuratDomisili from '../../js/FormatSuratDomisili';
import FormatSuratKematian from '../../js/FormatSuratKetMD';

const DOMAIN = process.env.NX_PUBLIC_DOMAIN;
moment.locale('id');

export default function PengajuanProcess() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filePdf, setFilePdf] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newPengajuanData, setNewPengajuanData] = useState(false);

  const DoGetRequestDetails = useSelector(
    (state) => state.ReduxState.DoGetRequestDetails
  );
  const RequestDetails = useSelector(
    (state) => state.RequestReducers.RequestDetails
  );
  const UpdateRequest = useSelector(
    (state) => state.RequestReducers.UpdateRequest
  );
  const errorUpdateRequest = useSelector(
    (state) => state.RequestReducers.errorUpdateRequest
  );

  const jenis_pengajuan = [
    'undefined',
    'surat_domisili',
    'surat_kelahiran',
    'surat_kematian',
  ];

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const bulanRomawi = (bulan) => {
    const romawi = [
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
      'X',
      'XI',
      'XII',
    ];
    return romawi[bulan - 1];
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // valid type is pdf only
    const validTypes = ['application/pdf'];

    if (file && validTypes.includes(file.type)) {
      setFilePdf(file);
    } else {
      alert('Invalid file type. Please upload a PDF only.');
      e.target.value = ''; // Reset input file
    }
  };

  const handleBukaSuratJadi = () => {
    // open pdf file
    switch (RequestDetails.data.jenis_pengajuan) {
      case 1:
        window.open(
          `${DOMAIN}/assets/files/surat/${RequestDetails.data.surat_domisili.surat}`,
          '_blank'
        );
        break;
      case 2:
        // surat kelahiran
        break;
      case 3:
        window.open(
          `${DOMAIN}/assets/files/surat/${RequestDetails.data.surat_kematian.surat}`,
          '_blank'
        );
        break;
      default:
        break;
    }
  };

  const handlePrintSurat = () => {
    let data = {};
    data.tanggal = moment().format('LL');
    data.bulan = bulanRomawi(moment().month() + 1);
    data.tahun = moment().format('YYYY');
    data.kepala_desa = 'SUKRI HERIADI CAN';

    // get data from RequestDetails.data where
    switch (RequestDetails.data.jenis_pengajuan) {
      case 1:
        // isi data untuk surat domisili dengan data dari RequestDetails.data.surat_domisili.penduduk tanpa menghapus isian dari data
        data = { ...data, ...RequestDetails.data.surat_domisili.penduduk };
        data.jenis_ttd = RequestDetails.data.surat_domisili.jenis_ttd;
        data.tanggal_lahir = moment(data.tanggal_lahir).format('DD-MM-YYYY');
        FormatSuratDomisili(data);
        break;
      case 2:
        break;
      case 3:
        data = { ...data, ...RequestDetails.data.surat_kematian.penduduk };
        data.hari_kematian = moment(
          RequestDetails.data.surat_kematian.tanggal_kematian
        ).format('dddd');
        data.tanggal_kematian = moment(
          RequestDetails.data.surat_kematian.tanggal_kematian
        ).format('DD-MM-YYYY');
        data.tanggal_pemakaman = moment(
          RequestDetails.data.surat_kematian.tanggal_pemakaman
        ).format('LL');
        data.tanggal_lahir = moment(data.tanggal_lahir).format('DD-MM-YYYY');

        data.tempat_kematian =
          RequestDetails.data.surat_kematian.tempat_kematian;

        data.tempat_pemakaman =
          RequestDetails.data.surat_kematian.tempat_pemakaman;

        data.jenis_ttd = RequestDetails.data.surat_kematian.jenis_ttd;
        FormatSuratKematian(data);
        break;
      default:
        break;
    }
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleUpdateWithFile = () => {
    if (filePdf === '') {
      window.alert('Mohon menyertakan pdf surat!!');
    }
    const data = {
      id: id,
      status_pengajuan: 3, // 3 adalah value selesai
      surat: filePdf,
    };

    setDisabled(true);
    dispatch(updateRequest(data));
  };

  const handleUpdatePengajuan = (status, jenis_ttd) => {
    console.log(status, jenis_ttd, 'status dan jenis ttd');
    // check apakah jenis ttd dan status pengajuan
    if (status >= 2 && jenis_ttd === 2) {
      setIsOpen(true);
      // jika iya maka open modal untuk upload file pdf untuk menyelesaikan pengajuan
    } else {
      // jika tidak maka update status pengajuan
      const data = {
        id: id,
        status_pengajuan: 2, // 2 adalah value pengajuan diproses
      };
      setDisabled(true);
      dispatch(updateRequest(data));
    }
  };

  useEffect(() => {
    if (DoGetRequestDetails) {
      const params = { id: id };
      dispatch(getRequestDetails(params));
      dispatch({ type: 'set', DoGetRequestDetails: false });
    }
  }, [DoGetRequestDetails]);

  useEffect(() => {
    if (!DoGetRequestDetails) {
      dispatch({ type: 'set', DoGetRequestDetails: true });
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (UpdateRequest) {
      toast.success(UpdateRequest.message, { id: 'update_request' });
      dispatch({ type: 'set', DoGetRequestDetails: true });
    }
    if (errorUpdateRequest) {
      toast.error(errorUpdateRequest, { id: 'update_request' });
    }
    setTimeout(() => {
      setIsOpen(false);
      setDisabled(false);
      dispatch({
        type: 'UPDATE_REQUEST',
        payload: { data: false, errorMessage: false },
      });
    }, 1000);
  }, [UpdateRequest, errorUpdateRequest]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div>
              <div className="flex justify-between items-center p-4">
                <h2 className="text-xl font-bold">Process Pengajuan</h2>
                <button
                  onClick={() => navigate(-1)}
                  type="button"
                  className="py-2 px-4 bg-zinc-900 text-white rounded-lg hover:bg-zinc-600 transition-colors duration-300"
                >
                  Back
                </button>
              </div>
              <div className="flex w-full p-4">
                <TabGroup className="w-full">
                  <TabList className="flex gap-4 overflow-x-auto">
                    <Tab
                      key="details"
                      className="rounded-md py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-zinc-900/10 data-[hover]:bg-zinc-900/5 data-[selected]:data-[hover]:bg-zinc-900/10 data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                      Details Pengajuan
                    </Tab>
                    <Tab
                      key="detailsSurat"
                      className="rounded-md py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-zinc-900/10 data-[hover]:bg-zinc-900/5 data-[selected]:data-[hover]:bg-zinc-900/10 data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                      Details Surat
                    </Tab>
                    <Tab
                      key="printLogs"
                      className="rounded-md py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-zinc-900/10 data-[hover]:bg-zinc-900/5 data-[selected]:data-[hover]:bg-zinc-900/10 data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                      Print Logs
                    </Tab>
                  </TabList>
                  <TabPanels className="mt-3">
                    {/* details data pengajuan */}
                    <TabPanel
                      key="details"
                      className="rounded-xl bg-zinc-900/5 p-3"
                    >
                      {RequestDetails && RequestDetails.data ? (
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex flex-col sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">ID</div>
                            <div>{RequestDetails.data.id}</div>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">Jenis Pengajuan</div>
                            <div>{RequestDetails.data.type.nama}</div>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">
                              Status Pengajuan
                            </div>
                            <div
                              className={
                                (RequestDetails.data.status.nama === 'Menunggu'
                                  ? 'text-yellow-600'
                                  : RequestDetails.data.status.nama ===
                                    'Diproses'
                                  ? 'text-blue-600'
                                  : RequestDetails.data.status.nama ===
                                    'Selesai'
                                  ? 'text-green-600'
                                  : RequestDetails.data.status.nama
                                  ? 'text-red-600'
                                  : '') + ' '
                              }
                            >
                              {RequestDetails.data.status.nama}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">Create Date</div>
                            <div>
                              {moment(RequestDetails.data.created_at).format(
                                'YYYY-MM-DD HH:mm'
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">
                              Last Update Date
                            </div>
                            <div>
                              {moment(RequestDetails.data.updated_at).format(
                                'YYYY-MM-DD HH:mm'
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">
                              Jenis Tanda Tangan
                            </div>
                            <div>
                              {RequestDetails.data.jenis_ttd === 1
                                ? 'Digital'
                                : 'Basah'}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">
                              Keterangan Tambahan
                            </div>
                            <div>{RequestDetails.data.keterangan}</div>
                          </div>
                          <div className="sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md">
                            <Disclosure>
                              <DisclosureButton className="group flex w-full font-semibold justify-between items-center gap-2">
                                Detail Data Pengaju
                                <ChevronDownIcon className="w-5 group-data-[open]:rotate-180" />
                              </DisclosureButton>
                              <DisclosurePanel>
                                <table className="w-full">
                                  <tbody>
                                    {Object.entries(
                                      RequestDetails.data.pengguna.penduduk
                                    ).map(([key, value]) => {
                                      if (
                                        value !== null &&
                                        typeof value !== 'object'
                                      ) {
                                        return (
                                          <tr key={key}>
                                            <td className="border border-zinc-200 px-4 py-2">
                                              {key.replace(/_/g, ' ')}
                                            </td>
                                            <td className="border border-zinc-200 px-4 py-2">
                                              {key.startsWith('foto_') ? (
                                                <button
                                                  className="text-blue-500 hover:underline"
                                                  onClick={() =>
                                                    handleViewImage(
                                                      `${DOMAIN}/assets/files/${key}/${value}`
                                                    )
                                                  }
                                                >
                                                  View
                                                </button>
                                              ) : (
                                                value
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      }
                                    })}
                                  </tbody>
                                </table>
                              </DisclosurePanel>
                            </Disclosure>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {!RequestDetails || !RequestDetails.data
                            ? 'No Data Found'
                            : ''}
                        </div>
                      )}
                    </TabPanel>
                    {/* details data dalam surat */}
                    <TabPanel
                      key="detailsSurat"
                      className="rounded-xl bg-zinc-900/5 p-3"
                    >
                      {RequestDetails &&
                      RequestDetails.data &&
                      RequestDetails.data.jenis_pengajuan ? (
                        <div className="grid grid-cols-1 gap-2">
                          {Object.entries(
                            RequestDetails.data[
                              jenis_pengajuan[
                                RequestDetails.data.jenis_pengajuan
                              ]
                            ]
                          )
                            .filter(
                              ([key]) =>
                                key !== 'jenis_ttd' &&
                                key !== 'id' &&
                                key !== 'id_pengajuan' &&
                                key !== 'nomor_ktp' &&
                                key !== 'jenis_tanda_tangan' &&
                                key !== 'penduduk'
                            )
                            .map(([key, value]) => {
                              if (typeof value === 'object' && value !== null) {
                                return Object.entries(value).map(
                                  ([subKey, subValue]) => (
                                    <div
                                      key={subKey}
                                      className="flex sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md"
                                    >
                                      <div className="font-semibold">
                                        {subKey.replace(/_/g, ' ')}
                                      </div>
                                      <div>{subValue}</div>
                                    </div>
                                  )
                                );
                              }
                              return (
                                <div
                                  key={key}
                                  className="flex sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md"
                                >
                                  <div className="font-semibold">
                                    {key.replace(/_/g, ' ')}
                                  </div>
                                  <div>
                                    {key === 'dokumen' || key === 'surat' ? (
                                      value ? (
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
                                          {key === 'dokumen'
                                            ? 'View'
                                            : 'Download'}
                                        </button>
                                      ) : (
                                        '-'
                                      )
                                    ) : value !== null ? (
                                      value.toString()
                                    ) : (
                                      '-'
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          {/* template surat untuk di print perangkat desa */}
                          <div className="flex sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md">
                            <div className="font-semibold">Template Surat</div>
                            <div>
                              <button
                                className="text-blue-500 hover:underline"
                                onClick={(e) => handlePrintSurat()}
                              >
                                Print Surat
                              </button>
                            </div>
                          </div>
                          <div className="sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md">
                            <Disclosure>
                              <DisclosureButton className="group flex w-full font-semibold justify-between items-center gap-2">
                                Data penduduk dalam surat
                                <ChevronDownIcon className="w-5 group-data-[open]:rotate-180" />
                              </DisclosureButton>
                              <DisclosurePanel>
                                <table className="w-full">
                                  <tbody>
                                    {RequestDetails &&
                                      RequestDetails.data &&
                                      Object.entries(
                                        RequestDetails.data[
                                          jenis_pengajuan[
                                            RequestDetails.data.jenis_pengajuan
                                          ]
                                        ]?.penduduk
                                      ).map(([key, value]) => {
                                        if (
                                          value !== null &&
                                          typeof value !== 'object'
                                        ) {
                                          return (
                                            <tr key={key}>
                                              <td className="border border-zinc-200 px-4 py-2">
                                                {key.replace(/_/g, ' ')}
                                              </td>
                                              <td className="border border-zinc-200 px-4 py-2">
                                                {key.startsWith('foto_') ? (
                                                  <button
                                                    className="text-blue-500 hover:underline"
                                                    onClick={() =>
                                                      handleViewImage(
                                                        `${DOMAIN}/assets/files/${key}/${value}`
                                                      )
                                                    }
                                                  >
                                                    View
                                                  </button>
                                                ) : (
                                                  value
                                                )}
                                              </td>
                                            </tr>
                                          );
                                        }
                                      })}
                                  </tbody>
                                </table>
                              </DisclosurePanel>
                            </Disclosure>
                          </div>
                        </div>
                      ) : (
                        <div className="sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md">
                          {!RequestDetails || !RequestDetails.data
                            ? 'No Data Found'
                            : ''}
                        </div>
                      )}
                    </TabPanel>
                    <TabPanel
                      key="printLogs"
                      className="rounded-xl bg-zinc-900/5 p-3 max-h-40 overflow-y-auto"
                    >
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex flex-col sm:flex-row justify-between bg-zinc-900/5 p-2 rounded-md">
                          <div className="font-semibold">Print Log</div>
                          <div>Print Log</div>
                        </div>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>
              {/* button process dan reject */}
              {RequestDetails && RequestDetails.data && (
                <div className="w-full">
                  {((RequestDetails.data.status_pengajuan === 1 &&
                    RequestDetails.data.jenis_ttd === 1) ||
                    (RequestDetails.data.status_pengajuan < 3 &&
                      RequestDetails.data.jenis_ttd === 2)) && (
                    <div className="flex mx-4 justify-between">
                      <button
                        onClick={(e) =>
                          handleUpdatePengajuan(
                            RequestDetails.data.status_pengajuan,
                            RequestDetails.data.jenis_ttd
                          )
                        }
                        disabled={disabled}
                        className="text-white bg-blue-500 rounded-md px-4 py-2"
                      >
                        Process
                      </button>
                      <button
                        disabled={disabled}
                        className="text-white bg-red-500 rounded-md px-4 py-2"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {selectedImage && (
        <div className="fixed z-9999 inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="flex w-1/4 relative justify-center items-center content-center">
            <img
              src={selectedImage}
              alt="Preview"
              className="z-9999 max-w-full max-h-full"
            />
            <div className="flex absolute z-99999 top-2 gap-x-4">
              <button
                onClick={closeImageModal}
                className="text-black bg-white rounded-full p-2"
              >
                <Close className="w-4" />
              </button>
              <button
                onClick={(e) => window.open(`${selectedImage}`, '_blank')}
                className="text-black bg-white rounded-full p-2"
              >
                <OpenInNew className="w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-9999 focus:outline-none"
        onClose={handleCloseDialog} // Memperbaiki pemanggilan fungsi di sini
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-zinc-900/40">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel className="max-w-lg space-y-6 bg-white p-12 data-[closed]:scale-95 data-[closed]:opacity-0">
              <DialogTitle
                as="h3"
                className="text-xl text-red-500 font-bold text-center"
              >
                Menyelesaikan pengajuan
              </DialogTitle>
              <div className="flex flex-col text-justify items-center gap-4">
                <p className="text-sm text-gray-500">
                  Upload surat untuk menyelesaikan pengajuan.
                </p>
                <p className="text-sm text-red-500">
                  Surat bisa didownload dibagian detail surat.
                </p>
                <input
                  type="file"
                  // value={filePdf}
                  disabled={disabled}
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="disabled:bg-zinc-900/20 mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6 focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
                />
              </div>
              <div className="flex justify-between">
                <Button
                  disabled={disabled}
                  onClick={handleUpdateWithFile} // Menambahkan aksi pada tombol
                  className="inline-flex items-center gap-2 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-700"
                >
                  Submit
                </Button>
                <Button
                  disabled={disabled}
                  onClick={handleCloseDialog} // Menambahkan aksi pada tombol
                  className="inline-flex items-center gap-2 rounded-md bg-zinc-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-zinc-700"
                >
                  Close
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
