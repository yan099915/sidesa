import React, { useEffect, useState } from 'react';
import ProfilePic from '../../../assets/images/users.jpeg'; // Ganti dengan path gambar profil Anda
import { CheckCircleSharp, CancelSharp } from '@mui/icons-material';
import DefaultLayout from '../../layout/defaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Input, Field, Select } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import jobOptions from '../../js/jobOptions'; // Impor daftar pekerjaan
import {
  checkVerificationStatus,
  requestDataVerification,
} from '../../api/actions/UsersActions';

const Profile = () => {
  const UserSession = useSelector((state) => state.UsersReducers.UserSession);
  const RequestVerificationStatus = useSelector(
    (state) => state.UsersReducers.RequestVerificationStatus
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
    birthDate: '',
    birthPlace: '',
    address: '',
    religion: '',
    maritalStatus: 'belum kawin',
    job: '',
    rt: '',
    rw: '',
  });

  const maritalStatusOptions = [
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
    console.log('submit');

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
    } else {
      setError(false); // Clear error state
      console.log(...dataForm.entries()); // Log to check if data is correctly added
      dispatch(requestDataVerification(dataForm));
    }
  };

  useEffect(() => {
    if (UserSession && !UserSession.data.verified) {
      if (DoCheckVerificationStatus) {
        dispatch(checkVerificationStatus());
        dispatch({ type: 'set', DoCheckVerificationStatus: false });
      }
    }
  }, [DoCheckVerificationStatus, UserSession, dispatch]);

  useEffect(() => {
    if (UserSession && !UserSession.data.verified) {
      dispatch({ type: 'set', DoCheckVerificationStatus: true });
    }
  }, []);

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
        <div className="relative w-full bg-white shadow-md rounded-lg">
          {/* Cover Photo */}
          <div className="w-full h-56 bg-cover bg-center rounded-t-lg bg-zinc-300">
            {UserSession && !UserSession.data.verified && (
              <button
                className={
                  RequestVerificationStatus &&
                  RequestVerificationStatus.data.verificationStatus === 0
                    ? 'hidden'
                    : '' +
                      ' absolute top-4 right-4 bg-zinc-900 text-white px-2 py-1 rounded-md'
                }
                onClick={handleCompleteClick}
              >
                Lengkapi
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
              <span className="flex  font-medium text-yellow-700 bg-yellow-100 p-4 rounded-md">
                {RequestVerificationStatus &&
                RequestVerificationStatus.data.verificationStatus === 0
                  ? 'Data sedang diverifikasi.'
                  : RequestVerificationStatus &&
                    RequestVerificationStatus.data.verificationStatus === 1
                  ? 'Data perlu diperbaiki! Silakan lengkapi data pribadi Anda.'
                  : 'Akun Anda belum terverifikasi! Silakan lengkapi data pribadi Anda.'}
              </span>
            </div>
          ) : (
            <div className="mt-20 text-center">
              <h1 className="text-2xl font-semibold">Danish Heilium</h1>
            </div>
          )}
        </div>
        {showForm && (
          <div className="w-full bg-white shadow-md rounded-lg mt-6 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Lengkapi Data Pribadi
            </h2>
            <form onSubmit={handleSubmit}>
              {[
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
              ].map((field) => (
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
                      value={
                        field.type === 'file' ? undefined : formData[field.name]
                      }
                      onChange={field.handleChange || handleChange}
                      className="mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
                    focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
                    />
                  )}
                </Field>
              ))}
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
                    className={clsx(
                      'mt-3 block w-full appearance-none rounded-lg ring-1 ring-gray-900/20 border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900',
                      '*:text-black'
                    )}
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
                    className={clsx(
                      'mt-3 block w-full appearance-none rounded-lg ring-1 ring-gray-900/20 border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900',
                      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900',
                      '*:text-black'
                    )}
                  >
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
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Profile;
