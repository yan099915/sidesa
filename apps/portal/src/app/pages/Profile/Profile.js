import React, { useEffect, useState } from 'react';
import ProfilePic from '../../../assets/images/users.jpeg'; // Ganti dengan path gambar profil Anda
import { CheckCircleSharp, CancelSharp } from '@mui/icons-material';
import DefaultLayout from '../../layout/defaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Input, Field, Select } from '@headlessui/react';
import toast, { Toaster } from 'react-hot-toast';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import jobOptions from '../../js/jobOptions'; // Impor daftar pekerjaan
import {
  checkVerificationStatus,
  requestDataVerification,
} from '../../api/actions/VerificationsActions';
import { verifySession } from '../../api/actions/UsersActions';
import { getResidentDetails } from '../../api/actions/ResidentActions';

const Profile = () => {
  const UserSession = useSelector((state) => state.UsersReducers.UserSession);
  const RequestVerificationStatus = useSelector(
    (state) => state.VerificationReducers.RequestVerificationStatus
  );
  const RequestVerification = useSelector(
    (state) => state.VerificationReducers.RequestVerification
  );
  const ResidentDetails = useSelector(
    (state) => state.ResidentReducers.ResidentDetails
  );
  const DoCheckVerificationStatus = useSelector(
    (state) => state.ReduxState.DoCheckVerificationStatus
  );
  const [showForm, setShowForm] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
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
    religion: '',
    maritalStatus: { value: 'belum kawin', label: 'Belum Kawin' },
    gdarah: '',
    job: '',
    rt: '',
    rw: '',
  });

  const jenis_kelamin = [
    { value: '', label: 'Pilih Jenis Kelamin' },
    { value: 'PEREMPUAN', label: 'Perempuan' },
    { value: 'LAKI-LAKI', label: 'Laki-laki' },
  ];

  const maritalStatusOptions = [
    { value: '', label: 'Pilih Status Perkawinan' },
    { value: 'belum kawin', label: 'Belum Kawin' },
    { value: 'kawin', label: 'Kawin' },
    { value: 'cerai hidup', label: 'Cerai Hidup' },
    { value: 'cerai mati', label: 'Cerai Mati' },
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
  }, [RequestVerification]);

  useEffect(() => {
    if (UserSession) {
      if (DoCheckVerificationStatus) {
        dispatch(checkVerificationStatus());
        dispatch(verifySession());
        dispatch({ type: 'set', DoCheckVerificationStatus: false });
        if (UserSession.data.verified) {
          dispatch(getResidentDetails(UserSession.data.nik));
        }
      }
    }
  }, [DoCheckVerificationStatus, UserSession, dispatch]);

  useEffect(() => {
    if (
      ResidentDetails &&
      ResidentDetails.data &&
      RequestVerificationStatus.data &&
      !RequestVerificationStatus.data.verifiedStatus
    ) {
      const updatedFormData = { ...formData };
      delete updatedFormData.foto_ktp;
      delete updatedFormData.foto_kk;
      setFormData(updatedFormData);

      setFormData((prevData) => ({
        ...prevData,
        ktpNumber: ResidentDetails.data.nomor_ktp || '',
        kkNumber: ResidentDetails.data.nomor_kk || '',
        name: ResidentDetails.data.nama || '',
        birthDate: ResidentDetails.data.tanggal_lahir || '',
        birthPlace: ResidentDetails.data.tempat_lahir || '',
        address: ResidentDetails.data.alamat || '',
        religion: ResidentDetails.data.agama || '',
        maritalStatus: ResidentDetails.data.status_perkawinan || 'belum kawin',
        gdarah: ResidentDetails.data.golongan_darah || '',
        job: ResidentDetails.data.pekerjaan || '',
        rt: ResidentDetails.data.rt || '',
        rw: ResidentDetails.data.rw || '',
      }));
    }
  }, [ResidentDetails]);

  useEffect(() => {
    if (UserSession) {
      dispatch({ type: 'set', DoCheckVerificationStatus: true });
    }
  }, []);

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
    { label: 'Golongan Darah', name: 'gdarah', type: 'text' },
    { label: 'Tanggal Lahir', name: 'birthDate', type: 'date' },
    { label: 'Tempat Lahir', name: 'birthPlace', type: 'text' },
    { label: 'Alamat', name: 'address', type: 'textarea' },
    { label: 'Agama', name: 'religion', type: 'text' },
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
    ResidentDetails &&
    ResidentDetails.data &&
    RequestVerificationStatus.data &&
    !RequestVerificationStatus.data.verifiedStatus
      ? fields.filter((field) => !['foto_ktp', 'foto_kk'].includes(field.name))
      : fields;

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center bg-gray-100 p-6">
        <div className="relative w-full bg-white shadow-md rounded-lg">
          {/* Cover Photo */}
          <div className="w-full h-56 bg-cover bg-center rounded-t-lg bg-zinc-300">
            {RequestVerificationStatus && RequestVerificationStatus.data && (
              <span
                className={`absolute top-4 left-4 bg-red-900 text-white  px-2 py-1 rounded-md `}
              >
                {RequestVerificationStatus &&
                !RequestVerificationStatus.data.verificationStatus &&
                !RequestVerificationStatus.data.notes
                  ? 'Revisi sedang di proses.'
                  : `Notes: ${RequestVerificationStatus.data.notes}`}
              </span>
            )}
            {RequestVerificationStatus && RequestVerificationStatus.data ? (
              <button
                className={`absolute top-4 right-4 bg-zinc-900 text-white px-2 py-1 rounded-md ${
                  RequestVerificationStatus &&
                  !RequestVerificationStatus.data.verificationStatus &&
                  !RequestVerificationStatus.data.notes
                    ? 'hidden'
                    : ''
                }`}
                onClick={handleCompleteClick}
              >
                {UserSession && UserSession.data.verified
                  ? 'Revisi'
                  : 'Lengkapi'}
              </button>
            ) : (
              <button
                className={`absolute top-4 right-4 bg-zinc-900 text-white px-2 py-1 rounded-md `}
                onClick={handleCompleteClick}
              >
                {UserSession && UserSession.data.verified
                  ? 'Revisi'
                  : 'Lengkapi'}
              </button>
            )}
          </div>
          {/* Profile Photo */}
          <div className="relative flex justify-center">
            <div className="absolute -top-16 w-32 h-32 rounded-full border-4 border-white">
              <img
                src={ProfilePic}
                alt="Profile"
                className="rounded-full w-full h-full object-cover"
              />
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
                  {!RequestVerificationStatus.data.verificationStatus &&
                  RequestVerificationStatus.data.notes
                    ? `Permohonan ditolak: ${RequestVerificationStatus.data.notes}`
                    : !RequestVerificationStatus.data.verificationStatus &&
                      !RequestVerificationStatus.data.notes
                    ? 'Data Sedang Diverifikasi'
                    : 'Anda belum melengkapi data pribadi. Silahkan lengkapi data pribadi Anda.'}
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
                {ResidentDetails &&
                  ResidentDetails.data &&
                  ResidentDetails.data.nama}
              </h1>
              <div className="text-center overflow-x-auto">
                {/* Tabel Data */}
                {ResidentDetails && ResidentDetails.data && (
                  <table
                    className={
                      showForm
                        ? 'hidden'
                        : '' + ' table-auto mt-6 min-w-full bg-white'
                    }
                  >
                    <tbody>
                      {Object.entries(ResidentDetails.data).map(
                        ([key, value]) =>
                          key !== 'id' &&
                          key !== 'nama' &&
                          key !== 'foto_diri' &&
                          key !== 'foto_ktp' &&
                          key !== 'foto_kk' && (
                            <tr key={key} className="">
                              <td className="px-4 py-2 text-left font-medium">
                                {key.replace(/_/g, ' ')}
                              </td>
                              <td className="px-4 py-2 text-left">
                                {typeof value === 'string'
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
                        ResidentDetails &&
                        ResidentDetails.data &&
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
              {error && <p style={{ color: 'red' }}>Harap isi semua field</p>}
            </form>
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
