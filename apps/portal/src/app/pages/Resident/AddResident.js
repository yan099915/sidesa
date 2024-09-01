import React, { useEffect, useState } from 'react';
import { Field, Label, Input, Select } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import jobOptions from '../../js/jobOptions'; // Import job options
import { addResident } from '../../api/actions/ResidentActions';
import { useNavigate } from 'react-router-dom';

const AddResident = () => {
  const [disableFields, setDisableFields] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const addResidentData = useSelector(
    (state) => state.ResidentReducers.AddResident
  );
  const errorAddResident = useSelector(
    (state) => state.ResidentReducers.errorAddResident
  );
  const [formData, setFormData] = useState({
    nomor_ktp: '',
    nomor_kk: '',
    nama: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat: '',
    agama: '',
    status_perkawinan: '',
    golongan_darah: '',
    pekerjaan: '',
    rt: 0,
    rw: 0,
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      toast.loading('Menambahkan data penduduk...', {
        id: 'add-resident-toast',
      });
      setDisableFields(true); // Disable form fields
      dispatch(addResident(dataForm));
    }
  };

  const fields = [
    {
      label: 'Nomor KTP',
      name: 'nomor_ktp',
      type: 'text',
      handleChange: handleNumberChange,
    },
    {
      label: 'Nomor KK',
      name: 'nomor_kk',
      type: 'text',
      handleChange: handleNumberChange,
    },
    { label: 'Nama', name: 'nama', type: 'text' },
    { label: 'Golongan Darah', name: 'golongan_darah', type: 'text' },
    { label: 'Tanggal Lahir', name: 'tanggal_lahir', type: 'date' },
    { label: 'Tempat Lahir', name: 'tempat_lahir', type: 'text' },
    { label: 'Alamat', name: 'alamat', type: 'textarea' },
    { label: 'Agama', name: 'agama', type: 'text' },
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

  useEffect(() => {
    console.log(addResidentData, 'addResidentData');
    if (addResidentData && addResidentData.data) {
      toast.success('Data penduduk berhasil ditambahkan', {
        id: 'add-resident-toast',
      });
      setFormData({
        nomor_ktp: '',
        nomor_kk: '',
        nama: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        alamat: '',
        agama: '',
        status_perkawinan: { value: 'belum kawin', label: 'Belum Kawin' },
        golongan_darah: '',
        pekerjaan: 'Belum / Tidak Bekerja',
        rt: 0,
        rw: 0,
      });

      setTimeout(() => {
        setDisableFields(false);
        setDisabled(false);
        navigate('/resident');
      }, 2000);
    }
  }, [addResidentData]);

  useEffect(() => {
    if (errorAddResident) {
      toast.error(errorAddResident, {
        id: 'add-resident-toast',
      });
    }
    setTimeout(() => {
      dispatch({
        type: 'ADD_RESIDENT',
        payload: { data: false, errorMessage: false },
      });
      setDisableFields(false);
      setDisabled(false);
    }, 1000);
  }, [errorAddResident]);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Add Resident Data</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields
          .filter((field) => !['rt', 'rw'].includes(field.name))
          .map((field) => (
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
                  disabled={disableFields}
                  onChange={field.handleChange || handleChange}
                  className="disabled:bg-zinc-900/20 mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
          focus:ring-0  data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900 outline-zinc-900"
                />
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  disabled={disableFields}
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
            htmlFor="maritalStatus"
            className="text-sm font-medium leading-normal text-gray-900"
          >
            Jenis Kelamin
          </Label>
          <div className="relative">
            <Select
              id="jenis_kelamin"
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              disabled={disableFields}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  jenis_kelamin: e.target.value,
                })
              }
              className="disabled:bg-zinc-900/20 mt-3 block w-full appearance-none rounded-lg ring-1 ring-gray-900/20 border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900 *:text-black"
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
            htmlFor="maritalStatus"
            className="text-sm font-medium leading-normal text-gray-900"
          >
            Status Perkawinan
          </Label>
          <div className="relative">
            <Select
              id="status_perkawinan"
              name="status_perkawinan"
              value={formData.maritalStatus}
              disabled={disableFields}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status_perkawinan: e.target.value,
                })
              }
              className="disabled:bg-zinc-900/20 mt-3 block w-full appearance-none rounded-lg ring-1 ring-gray-900/20 border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900 *:text-black"
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
              id="pekerjaan"
              name="pekerjaan"
              value={formData.pekerjaan}
              disabled={disableFields}
              onChange={(e) =>
                setFormData({ ...formData, pekerjaan: e.target.value })
              }
              className="disabled:bg-zinc-900/20 mt-3 block w-full appearance-none rounded-lg ring-1 ring-gray-900/20 border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-900 *:text-black"
            >
              <option key="" value="">
                Pilih Pekerjaan
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
        className="px-4 py-2 bg-zinc-900 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default AddResident;
