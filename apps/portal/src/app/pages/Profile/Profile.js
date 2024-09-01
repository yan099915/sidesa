import React, { useEffect, useState } from 'react';
import ProfilePic from '../../../assets/images/users.jpeg'; // Ganti dengan path gambar profil Anda
import BatikImage from '../../../assets/images/batik.jpg'; // Ganti dengan path gambar batik
import { CheckCircleSharp, CancelSharp } from '@mui/icons-material';
import DefaultLayout from '../../layout/defaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Input, Field, Select } from '@headlessui/react';
import toast, { Toaster } from 'react-hot-toast';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import jobOptions from '../../js/jobOptions'; // Impor daftar pekerjaan
import {
  checkVerificationStatus,
  requestDataVerification,
} from '../../api/actions/VerificationsActions';
import { verifySession } from '../../api/actions/UsersActions';
import { getProfileDetails } from '../../api/actions/UsersActions';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

const GMAPS_APIKEY = process.env.NX_PUBLIC_GMAPS_API_KEY;
const GMAPS_ID = process.env.NX_PUBLIC_GMAPS_ID;
const DOMAIN = process.env.NX_PUBLIC_DOMAIN;

const Profile = () => {
  const UserSession = useSelector((state) => state.UsersReducers.UserSession);
  const RequestVerificationStatus = useSelector(
    (state) => state.VerificationReducers.RequestVerificationStatus
  );
  const RequestVerification = useSelector(
    (state) => state.VerificationReducers.RequestVerification
  );
  const errorRequestVerification = useSelector(
    (state) => state.VerificationReducers.errorRequestVerification
  );
  const ProfileDetails = useSelector(
    (state) => state.UsersReducers.ProfileDetails
  );
  const DoCheckVerificationStatus = useSelector(
    (state) => state.ReduxState.DoCheckVerificationStatus
  );
  const DataGeolocation = useSelector(
    (state) => state.ReduxState.DataGeolocation
  );
  const [showForm, setShowForm] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);

  const [emptyField, setEmptyField] = useState('');
  const [formData, setFormData] = useState({
    foto_diri: '',
    foto_ktp: '',
    foto_kk: '',
    ktpNumber: '',
    kkNumber: '',
    name: '',
    jenis_kelamin: '',
    birthDate: '',
    birthPlace: '',
    address: '',
    dusun: 0,
    religion: '',
    maritalStatus: '',
    gdarah: '',
    job: '',
    rt: '0',
    rw: '0',
    lat: '',
    lng: '',
    hubungan: '',
    pendidikan: '',
  });

  const jenis_kelamin = [
    { value: '', label: 'Pilih Jenis Kelamin' },
    { value: 'PEREMPUAN', label: 'Perempuan' },
    { value: 'LAKI-LAKI', label: 'Laki-laki' },
  ];

  const maritalStatusOptions = [
    { value: '', label: 'Pilih Status Perkawinan' },
    { value: 'Belum Kawin', label: 'Belum Kawin' },
    { value: 'Kawin', label: 'Kawin' },
    { value: 'Cerai Hidup', label: 'Cerai Hidup' },
    { value: 'Cerai Mati', label: 'Cerai Mati' },
  ];

  const hubunganKeluarga = [
    { value: '', label: 'Pilih Hubungan' },
    { value: 'lainnya', label: 'Lainnya' },
    { value: 'kepala', label: 'Kepala Keluarga' },
    { value: 'suami', label: 'Suami' },
    { value: 'istri', label: 'istri' },
    { value: 'anak', label: 'Anak' },
    { value: 'menantu', label: 'Menantu' },
    { value: 'cucu', label: 'Cucu' },
    { value: 'orangtua', label: 'Orangtua' },
    { value: 'mertua', label: 'Mertua' },
    { value: 'famili', label: 'Famili Lain' },
    { value: 'pembantu', label: 'Pembantu' },
  ];

  const golonganDarah = [
    { value: '', label: 'Pilih Golongan Darah' },
    { value: 'tidak tahu', label: 'Tidak Tahu' },
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'AB', label: 'AB' },
    { value: 'O', label: 'O' },
  ];

  const agama = [
    { value: '', label: 'Pilih Agama' },
    { value: 'islam', label: 'Islam' },
    { value: 'protestan', label: 'Protestan' },
    { value: 'katolik', label: 'Katolik' },
    { value: 'budha', label: 'Budha' },
    { value: 'hindu', label: 'Hindu' },
    { value: 'khonghucu', label: 'Khonghucu' },
  ];

  const dusun = [
    { value: '', label: 'Pilih Dusun' },
    { value: 'UTARA', label: 'Utara' },
    { value: 'SELATAN', label: 'Selatan' },
  ];

  const jenisPendidikan = [
    { value: '', label: 'Pilih Pendidikan' },
    { value: 'tidak_pernah_sekolah', label: 'Tidak pernah sekolah' },
    { value: 'tidak_tamat_sd', label: 'Tidak tamat SD/sederajat' },
    { value: 'tamat_sltp', label: 'Tamat SLTP/sederajat' },
    { value: 'tamat_slta', label: 'Tamat SLTA/sederajat' },
    { value: 'tamat_slb_a', label: 'Tamat SLB A/sederajat' },
    { value: 'tamat_sd', label: 'Tamat SD/sederajat' },
    { value: 'tamat_s3', label: 'Tamat S-3/sederajat' },
    { value: 'tamat_s2', label: 'Tamat S-2/sederajat' },
    { value: 'tamat_s1', label: 'Tamat S-1/sederajat' },
    { value: 'tamat_d3', label: 'Tamat D-3/sederajat' },
    { value: 'tamat_d2', label: 'Tamat D-2/sederajat' },
    { value: 'tamat_d1', label: 'Tamat D-1/sederajat' },
    { value: 'sedang_tk', label: 'Sedang TK/Kelompok Bermain' },
    { value: 'sedang_sltp', label: 'Sedang SLTP/sederajat' },
    { value: 'sedang_slta', label: 'Sedang SLTA/sederajat' },
    { value: 'sedang_sd', label: 'Sedang SD/sederajat' },
    { value: 'sedang_s2', label: 'Sedang S-2/sederajat' },
    { value: 'sedang_s1', label: 'Sedang S-1/sederajat' },
    { value: 'sedang_d3', label: 'Sedang D-3/sederajat' },
    { value: 'sedang_d2', label: 'Sedang D-2/sederajat' },
    { value: 'belum_tk', label: 'Belum TK/Kelompok Bermain' },
  ];

  const dispatch = useDispatch();

  const handleCompleteClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (file && validTypes.includes(file.type)) {
      setFormData((prevData) => ({ ...prevData, [name]: file }));
    } else {
      alert('Invalid file type. Please upload a JPG, JPEG, or PNG image.');
      e.target.value = ''; // Reset input file
    }
  };

  const handleChangeLocation = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }));
  };

  const handleDoubleClickMap = (e) => {
    const { lat, lng } = e.detail.latLng;
    setFormData((prevData) => ({ ...prevData, lat: lat, lng: lng }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create FormData instance
    const dataForm = new FormData();
    let hasEmptyField = false;

    // Append data to FormData and check for empty fields
    for (const key in formData) {
      if (formData[key]) {
        dataForm.append(key, formData[key]);
      } else {
        hasEmptyField = true;
        setEmptyField(key);
        break; // Exit loop if any field is empty
      }
    }

    if (hasEmptyField) {
      setError(true); // Set error state if any field is empty

      console.log(formData, 'formData');
    } else {
      setError(false); // Clear error state
      setDisabled(true); // Disable submit button
      toast.loading('Submitting data...', {
        id: 'submitting-data',
      });
      dispatch(requestDataVerification(dataForm));
    }
  };

  useEffect(() => {
    if (RequestVerification && RequestVerification.data) {
      toast.success('Data submitted!', {
        id: 'submitting-data',
      });
      dispatch(checkVerificationStatus());
      setShowForm(false);
      dispatch({
        type: 'REQUEST_VERIFICATION',
        payload: { data: false, errorMessage: false },
      });
      // setDisabled(false);
    }
  }, [RequestVerification, dispatch]);

  useEffect(() => {
    if (errorRequestVerification) {
      toast.error(errorRequestVerification, {
        id: 'submitting-data',
      });
      dispatch({
        type: 'REQUEST_VERIFICATION',
        payload: { data: false, errorMessage: false },
      });
      setDisabled(false);
    }
  }, [errorRequestVerification]);

  useEffect(() => {
    if (UserSession) {
      if (DoCheckVerificationStatus) {
        dispatch(checkVerificationStatus());
        dispatch(verifySession());
        dispatch({ type: 'set', DoCheckVerificationStatus: false });
        if (UserSession.data.verified) {
          dispatch(getProfileDetails(UserSession.data.nik));
        }
      }
    }
  }, [DoCheckVerificationStatus, UserSession, dispatch]);

  useEffect(() => {
    if (
      ProfileDetails &&
      ProfileDetails.data &&
      RequestVerificationStatus.data &&
      !RequestVerificationStatus.data.verifiedStatus
    ) {
      const updatedFormData = { ...formData };
      delete updatedFormData.foto_ktp;
      delete updatedFormData.foto_kk;
      setFormData(updatedFormData);

      setFormData((prevData) => ({
        ...prevData,
        ktpNumber: ProfileDetails.data.nomor_ktp || '',
        kkNumber: ProfileDetails.data.nomor_kk || '',
        name: ProfileDetails.data.nama || '',
        birthDate: ProfileDetails.data.tanggal_lahir || '',
        birthPlace: ProfileDetails.data.tempat_lahir || '',
        address: ProfileDetails.data.alamat || '',
        religion: ProfileDetails.data.agama || '',
        maritalStatus: ProfileDetails.data.status_perkawinan || 'belum kawin',
        gdarah: ProfileDetails.data.golongan_darah || '',
        job: ProfileDetails.data.pekerjaan || '',
        rt: ProfileDetails.data.rt || '0',
        rw: ProfileDetails.data.rw || '0',
      }));
    }
  }, [ProfileDetails]);

  useEffect(() => {
    dispatch({ type: 'set', DoCheckVerificationStatus: true });
  }, []);

  useEffect(() => {
    if (DataGeolocation) {
      setFormData((prevData) => ({
        ...prevData,
        lat: DataGeolocation.lat,
        lng: DataGeolocation.lng,
      }));
    }
  }, [DataGeolocation]);

  const fields = [
    {
      label: 'Foto Diri',
      name: 'foto_diri',
      type: 'file',
      handleChange: handleFileChange,
    },
    {
      label: 'Foto KTP',
      name: 'foto_ktp',
      type: 'file',
      handleChange: handleFileChange,
    },
    {
      label: 'Foto Kartu Keluarga',
      name: 'foto_kk',
      type: 'file',
      handleChange: handleFileChange,
    },
    {
      label: 'Nomor KTP',
      name: 'ktpNumber',
      type: 'text',
      handleChange: handleNumberChange,
    },
    {
      label: 'Nomor KK',
      name: 'kkNumber',
      type: 'text',
      handleChange: handleNumberChange,
    },
    { label: 'Nama', name: 'name', type: 'text' },
    { label: 'Tanggal Lahir', name: 'birthDate', type: 'date' },
    { label: 'Tempat Lahir', name: 'birthPlace', type: 'text' },
    { label: 'Alamat', name: 'address', type: 'textarea' },
    {
      label: 'RT',
      name: 'rt',
      type: 'text',
      handleChange: handleNumberChange,
    },
    {
      label: 'RW',
      name: 'rw',
      type: 'text',
      handleChange: handleNumberChange,
    },
  ];

  const filteredFields =
    ProfileDetails &&
    ProfileDetails.data &&
    RequestVerificationStatus.data &&
    !RequestVerificationStatus.data.verifiedStatus
      ? fields.filter(
          (field) => !['foto_ktp', 'foto_kk', 'rw', 'rt'].includes(field.name)
        )
      : fields.filter((field) => !['rw', 'rt'].includes(field.name));

  console.log(RequestVerificationStatus, 'RequestVerificationStatus');
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center bg-gray-100 p-6">
        <div className="relative w-full bg-white shadow-md rounded-lg">
          {/* Cover Photo */}
          <div
            className="w-full h-56 bg-cover bg-center rounded-t-lg"
            style={{ backgroundImage: `url(${BatikImage})` }}
          >
            {RequestVerificationStatus && RequestVerificationStatus.data ? (
              <button
                className={`absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-md ${
                  RequestVerificationStatus &&
                  RequestVerificationStatus.data.status === 1
                    ? 'hidden'
                    : ''
                }`}
                onClick={handleCompleteClick}
              >
                {UserSession && UserSession.data.verified
                  ? 'Revisi'
                  : 'Lengkapi'}
              </button>
            ) : RequestVerificationStatus && !RequestVerificationStatus.data ? (
              <button
                className={`absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-md`}
                onClick={handleCompleteClick}
              >
                Lengkapi
              </button>
            ) : (
              ''
            )}
          </div>
          {/* Profile Photo */}
          <div className="relative flex justify-center">
            <div className="absolute -top-16 w-32 h-32 rounded-full border-2 bg-white border-blue-500">
              {ProfileDetails.data && ProfileDetails.data.foto_diri ? (
                <img
                  src={`${DOMAIN}/assets/files/foto_diri/${ProfileDetails.data.foto_diri}`}
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <img
                  src={ProfilePic}
                  className="rounded-full w-full h-full object-cover"
                />
              )}

              <div className="absolute flex bottom-1 right-1 bg-white items-center rounded-full w-[25px] h-[25px] text-center">
                {UserSession && UserSession.data.verified ? (
                  <CheckCircleSharp
                    style={{ fontSize: 25 }}
                    className="text-blue-500"
                  />
                ) : (
                  <CancelSharp
                    style={{ fontSize: 25 }}
                    className="text-red-500"
                  />
                )}
              </div>
            </div>
          </div>
          {/* Profile Details */}
          {UserSession && !UserSession.data.verified ? (
            <div className="mt-20 p-4 mb-4 text-sm rounded-lg " role="alert">
              {RequestVerificationStatus && RequestVerificationStatus.data ? (
                <span className="flex font-medium text-yellow-700 bg-yellow-100 p-4 rounded-md">
                  {RequestVerificationStatus.data.status === 1
                    ? 'Data Sedang Diverifikasi'
                    : RequestVerificationStatus.data.status === 3
                    ? `Permohonan ditolak: ${RequestVerificationStatus.data.notes}`
                    : ''}
                </span>
              ) : (
                <span className="flex font-medium text-yellow-700 bg-yellow-100 p-4 rounded-md">
                  Anda belum melengkapi data pribadi. Silahkan lengkapi data
                  pribadi Anda.
                </span>
              )}
            </div>
          ) : (
            <div className="p-10 mt-10">
              <h1 className="text-2xl font-semibold text-center">
                {ProfileDetails &&
                  ProfileDetails.data &&
                  ProfileDetails.data.nama}
              </h1>
              <div className="text-center overflow-x-auto">
                {/* Tabel Data */}
                {ProfileDetails && ProfileDetails.data && (
                  <table
                    className={
                      showForm
                        ? 'hidden'
                        : '' + ' table-auto mt-6 min-w-full bg-white'
                    }
                  >
                    <tbody>
                      {Object.entries(ProfileDetails.data).map(
                        ([key, value]) =>
                          key !== 'id' &&
                          key !== 'nama' &&
                          key !== 'keluarga' &&
                          key !== 'foto_diri' &&
                          key !== 'foto_ktp' &&
                          key !== 'foto_kk' &&
                          key !== 'rt' &&
                          key !== 'rw' &&
                          key !== 'lat' &&
                          key !== 'lng' &&
                          key !== 'createdAt' &&
                          key !== 'updatedAt' && (
                            <tr key={key} className="">
                              <td className="px-4 py-2 text-left font-medium">
                                {key.replace(/_/g, ' ')}
                              </td>
                              <td className="px-4 py-2 text-left">
                                {typeof value === 'string' ||
                                typeof value === 'number'
                                  ? value
                                  : typeof value === 'object' &&
                                    value !== null &&
                                    value.nomor_kk
                                  ? value.nomor_kk
                                  : 'Error Showing Data'}
                              </td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
        {showForm && (
          <div className="w-full bg-white shadow-md rounded-lg mt-6 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Lengkapi Data Pribadi
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFields.map((field) => (
                <Field key={field.name} className="mb-4">
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-medium leading-normal text-gray-900"
                  >
                    {field.label}
                  </Label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={field.handleChange || handleChange}
                      className="mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
                  focus:ring-0  data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900 outline-zinc-900"
                    />
                  ) : (
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      disabled={
                        ProfileDetails &&
                        ProfileDetails.data &&
                        [
                          'ktpNumber',
                          'kkNumber',
                          'name',
                          'birthDate',
                          'birthPlace',
                        ].includes(field.name)
                      }
                      value={
                        field.type === 'file' ? undefined : formData[field.name]
                      }
                      onChange={field.handleChange || handleChange}
                      className="disabled:bg-zinc-900/20 mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6 focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
                    />
                  )}
                </Field>
              ))}
              <Field className="mb-4">
                <Label className="text-sm font-medium leading-normal text-gray-900">
                  Dusun
                </Label>
                <div className="relative">
                  <Select
                    value={formData.dusun}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dusun: e.target.value,
                      })
                    }
                    className="mt-3 block w-full appearance-none rounded-lg ring-1 ring-gray-900/20 border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900 *:text-black"
                  >
                    {dusun.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute top-2.5 right-2.5 w-4 fill-gray-900/60"
                    aria-hidden="true"
                  />
                </div>
              </Field>
              <Field className="mb-4">
                <Label className="text-sm font-medium leading-normal text-gray-900">
                  Agama
                </Label>
                <div className="relative">
                  <Select
                    value={formData.religion}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        religion: e.target.value,
                      })
                    }
                    className="mt-3 block w-full appearance-none rounded-lg ring-1 ring-gray-900/20 border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900 *:text-black"
                  >
                    {agama.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute top-2.5 right-2.5 w-4 fill-gray-900/60"
                    aria-hidden="true"
                  />
                </div>
              </Field>
              <Field className="mb-4">
                <Label
                  htmlFor="jenis_kelamin"
                  className="text-sm font-medium leading-normal text-gray-900"
                >
                  Jenis Kelamin
                </Label>
                <div className="relative">
                  <Select
                    id="jenis_kelamin"
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jenis_kelamin: e.target.value,
                      })
                    }
                    className="mt-3 block w-full appearance-none rounded-lg ring-1 ring-gray-900/20 border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900 *:text-black"
                  >
                    {jenis_kelamin.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute top-2.5 right-2.5 w-4 fill-gray-900/60"
                    aria-hidden="true"
                  />
                </div>
              </Field>
              <Field className="mb-4">
                <Label className="text-sm font-medium leading-normal text-gray-900">
                  Golongan darah
                </Label>
                <div className="relative">
                  <Select
                    value={formData.gdarah}
                    onChange={(e) =>
                      setFormData({ ...formData, gdarah: e.target.value })
                    }
                    className="mt-3 block w-full appearance-none rounded-lg ring-1 ring-gray-900/20 border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900 *:text-black"
                  >
                    {golonganDarah.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute top-2.5 right-2.5 w-4 fill-gray-900/60"
                    aria-hidden="true"
                  />
                </div>
              </Field>
              <Field className="mb-4">
                <Label
                  htmlFor="maritalStatus"
                  className="text-sm font-medium leading-normal text-gray-900"
                >
                  Status Perkawinan
                </Label>
                <div className="relative">
                  <Select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maritalStatus: e.target.value,
                      })
                    }
                    className="mt-3 block w-full appearance-none rounded-lg ring-1 ring-gray-900/20 border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900 *:text-black"
                  >
                    {maritalStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute top-2.5 right-2.5 w-4 fill-gray-900/60"
                    aria-hidden="true"
                  />
                </div>
              </Field>
              <Field className="mb-4">
                <Label
                  htmlFor="job"
                  className="text-sm font-medium leading-normal text-gray-900"
                >
                  Status Pekerjaan
                </Label>
                <div className="relative">
                  <Select
                    id="job"
                    name="job"
                    value={formData.job}
                    onChange={(e) =>
                      setFormData({ ...formData, job: e.target.value })
                    }
                    className="mt-3 block w-full appearance-none rounded-lg ring-1 ring-gray-900/20 border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900 *:text-black"
                  >
                    <option key="" value="">
                      Pilih pekerjaan
                    </option>
                    {jobOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute top-2.5 right-2.5 w-4 fill-gray-900/60"
                    aria-hidden="true"
                  />
                </div>
              </Field>
              <Field className="mb-4">
                <Label className="text-sm font-medium leading-normal text-gray-900">
                  Pendidikan
                </Label>
                <div className="relative">
                  <Select
                    id="job"
                    name="job"
                    value={formData.pendidikan}
                    onChange={(e) =>
                      setFormData({ ...formData, pendidikan: e.target.value })
                    }
                    className="mt-3 block w-full appearance-none rounded-lg ring-1 ring-gray-900/20 border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900 *:text-black"
                  >
                    {jenisPendidikan.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute top-2.5 right-2.5 w-4 fill-gray-900/60"
                    aria-hidden="true"
                  />
                </div>
              </Field>
              <Field className="mb-4">
                <Label
                  htmlFor="job"
                  className="text-sm font-medium leading-normal text-gray-900"
                >
                  Hubungan Dalam Keluarga
                </Label>
                <div className="relative">
                  <Select
                    id="job"
                    name="job"
                    value={formData.hubungan}
                    onChange={(e) =>
                      setFormData({ ...formData, hubungan: e.target.value })
                    }
                    className="mt-3 block w-full appearance-none rounded-lg ring-1 ring-gray-900/20 border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900 *:text-black"
                  >
                    {hubunganKeluarga.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute top-2.5 right-2.5 w-4 fill-gray-900/60"
                    aria-hidden="true"
                  />
                </div>
              </Field>
            </form>
            <Field className="flex flex-col gap-4 mb-6 w-full">
              <Label className="text-sm  font-medium leading-normal text-gray-900">
                Pin Lokasi Rumah
              </Label>
              <APIProvider apiKey={GMAPS_APIKEY} libraries={['marker']}>
                <div className="flex w-full h-[300px]">
                  <Map
                    mapId={GMAPS_ID}
                    defaultZoom={18}
                    defaultCenter={DataGeolocation}
                    gestureHandling={'greedy'}
                    onDblclick={(e) => handleDoubleClickMap(e)}
                  >
                    {/* advanced marker with html-content */}
                    <AdvancedMarker
                      position={{ lat: formData.lat, lng: formData.lng }}
                      onDragEnd={(e) => handleChangeLocation(e)}
                      draggable={true}
                    ></AdvancedMarker>
                  </Map>
                </div>
              </APIProvider>
            </Field>
            {error && (
              <p style={{ color: 'red' }}>
                Harap isi semua field, {emptyField} tidak boleh kosong.
              </p>
            )}
            <button
              disabled={disabled}
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Profile;
