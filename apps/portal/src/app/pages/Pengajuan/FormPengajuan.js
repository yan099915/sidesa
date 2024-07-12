// FormPengajuan.js
import React, { useEffect, useState } from 'react';
import { jenisPengajuan } from '../../js/formPengajuan';
import {
  Input,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getResidentDetails } from '../../api/actions/ResidentActions';
import { createRequest } from '../../api/actions/RequestActions';
import toast from 'react-hot-toast';
import { getFamilyInfo } from '../../api/actions/FamilyActions';

const FormPengajuan = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [pengajuan, setPengajuan] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [newOptions, setNewOptions] = useState(true);
  const [FamilyMember, setFamilyMember] = useState([]);

  const UserSession = useSelector((state) => state.UsersReducers.UserSession);
  const CreateRequest = useSelector(
    (state) => state.RequestReducers.CreateRequest
  );
  const errorCreateRequest = useSelector(
    (state) => state.RequestReducers.errorCreateRequest
  );
  const FamilyInfo = useSelector((state) => state.FamilyReducers.FamilyInfo);
  const ResidentDetails = useSelector(
    (state) => state.ResidentReducers.ResidentDetails
  );
  const DoGetRequestRequiredData = useSelector(
    (state) => state.ReduxState.DoGetRequestRequiredData
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeForm = (e) => {
    const initialFormData = {};

    e.form.forEach((field) => {
      initialFormData[field.name] = '';
    });

    setFormData(initialFormData);
    setPengajuan(e);
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

  const validateForm = () => {
    for (let key in formData) {
      if (formData[key] === '') {
        setError(key);
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqData = formData;
    reqData.jenis_pengajuan = pengajuan.value;
    reqData.nomor_ktp = UserSession.data.nik;
    reqData.nomor_kk = UserSession.data.nkk;

    if (
      pengajuan.name === 'surat_kematian' ||
      pengajuan.name === 'surat_kelahiran'
    ) {
      reqData.anggota_keluarga = formData.anggota_keluarga.value;
    }

    if (validateForm()) {
      console.log(formData, 'ISIANNN');
      toast.loading('Membuat pengajuan...', {
        id: 'create-request',
      });
      setDisabled(true);
      dispatch(createRequest(reqData));
    }
  };

  useEffect(() => {
    if (CreateRequest) {
      toast.success(CreateRequest.message, {
        id: 'create-request',
      });

      setTimeout(() => {
        navigate('/request');
      }, 2000);
    }

    if (errorCreateRequest) {
      toast.error(errorCreateRequest, {
        id: 'create-request',
      });
    }

    dispatch({
      type: 'CREATE_REQUEST',
      payload: { data: false, errorMessage: false },
    });

    setDisabled(false);

    setTimeout(() => {
      toast.dismiss('create-request');
    }, 2000);
  }, [CreateRequest]);

  useEffect(() => {
    if (DoGetRequestRequiredData) {
      dispatch({ type: 'set', DoGetRequestRequiredData: false });
      if (UserSession && UserSession.data.verified) {
        dispatch(getResidentDetails(UserSession.data.nik));
        const params = {
          nomor_kk: UserSession.data.nkk,
        };
        dispatch(getFamilyInfo(params));
      }
    }
  }, [DoGetRequestRequiredData, pengajuan]);

  useEffect(() => {
    // add existing data to form
    if (pengajuan.name === 'keterangan_domisili') {
      if (ResidentDetails && ResidentDetails.data) {
        setFormData((prevData) => ({
          ...prevData,
          nomor_ktp: ResidentDetails.data.nomor_ktp || '',
          nomor_kk: ResidentDetails.data.nomor_kk || '',
          nama: ResidentDetails.data.nama || '',
          jenis_kelamin: ResidentDetails.data.jenis_kelamin || '',
          tanggal_lahir: ResidentDetails.data.tanggal_lahir || '',
          tempat_lahir: ResidentDetails.data.tempat_lahir || '',
          alamat: ResidentDetails.data.alamat || '',
          agama: ResidentDetails.data.agama || '',
          status_perkawinan:
            ResidentDetails.data.status_perkawinan || 'belum kawin',
          golongan_darah: ResidentDetails.data.golongan_darah || '',
          job: ResidentDetails.data.pekerjaan || '',
          rt: ResidentDetails.data.rt || '',
          rw: ResidentDetails.data.rw || '',
        }));
      }
    }

    if (pengajuan.name === 'surat_kelahiran') {
      if (ResidentDetails && ResidentDetails.data) {
        setFormData((prevData) => ({
          ...prevData,
          nomor_ktp: ResidentDetails.data.nomor_ktp || '',
          nomor_kk: ResidentDetails.data.nomor_kk || '',
          nama: ResidentDetails.data.nama || '',
        }));
      }
    }
  }, [pengajuan, ResidentDetails]);

  useEffect(() => {
    if (FamilyInfo && FamilyInfo.data) {
      const options = FamilyInfo.data.anggota_keluarga.map((member) => ({
        value: member.nomor_ktp,
        label: member.nama,
      }));

      setFamilyMember(options); // Isi variabel FamilyMember
      // setNewOptions(false);
      console.log(pengajuan.form, 'FORMNYA');
    }
  }, [pengajuan, FamilyInfo]);

  useEffect(() => {
    if (!DoGetRequestRequiredData) {
      dispatch({ type: 'set', DoGetRequestRequiredData: true });
    }
  }, []);

  if (UserSession && UserSession.data.verified === false) {
    return (
      <div>
        <div className="flex flex-col gap-y-2 bg-yellow-100 p-4">
          <h1 className="text-zinc-900">
            Akun anda belum terverifikasi, harap lengkapi data pribadi anda.
          </h1>
          <Link
            to="/profile"
            className="bg-zinc-900 py-2 px-4 w-fit rounded-md text-white hover:bg-zinc-800 transition-colors duration-300"
          >
            Lengkapi data pribadi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col gap-y-10 ">
      <div className="flex justify-end">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="py-2 px-4 bg-zinc-900 text-white rounded-lg mt-4 hover:bg-zinc-600 transition-colors duration-300"
        >
          Back
        </button>
      </div>
      <div className="relative">
        <Listbox value={pengajuan} onChange={(e) => handleChangeForm(e)}>
          <ListboxButton className="mt-3 block w-full  rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6 outline-zinc-900">
            {pengajuan.label || 'Pilih Jenis Pengajuan'}
            <ChevronDownIcon
              className="pointer-events-none absolute top-1/2 right-2.5 w-4 fill-gray-900/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {jenisPengajuan.map((option) => (
              <ListboxOption
                key={option.label}
                value={option}
                className={({ active }) =>
                  `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                    active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-semibold' : 'font-normal'
                      }`}
                    >
                      {option.label}
                    </span>
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
      <h1 className="text-center text-2xl font-bold">
        {pengajuan.label ? `Form Pengajuan ${pengajuan.label}` : ''}
      </h1>
      {pengajuan.form && (
        <div>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            {pengajuan.form.map((field) => (
              <div key={field.name} className="mb-4">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium leading-normal text-gray-900"
                >
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    disabled={field.disabled}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6 focus:ring-0  disabled:bg-zinc-900/20 outline-zinc-900"
                  />
                ) : field.type === 'select' ? (
                  <div className="relative">
                    <Listbox
                      value={formData[field.name]}
                      onChange={(value) => handleChange(field.name, value)}
                      disabled={field.disabled}
                    >
                      <ListboxButton className="mt-3 block w-full  rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6 disabled:bg-zinc-900/20 outline-zinc-900">
                        {formData[field.name] && formData[field.name].label
                          ? formData[field.name].label
                          : formData[field.name] ||
                            `Pilih ${field.label.toLowerCase()}`}
                        <ChevronDownIcon
                          className="pointer-events-none absolute top-2.5 right-2.5 w-4 fill-gray-900/60"
                          aria-hidden="true"
                        />
                      </ListboxButton>
                      <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {field.name === 'anggota_keluarga'
                          ? FamilyMember.map((option) => (
                              <ListboxOption
                                key={option.value}
                                value={option}
                                className={({ active }) =>
                                  `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                                    active
                                      ? 'text-amber-900 bg-amber-100'
                                      : 'text-gray-900'
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal'
                                      }`}
                                    >
                                      {option.label}
                                    </span>
                                  </>
                                )}
                              </ListboxOption>
                            ))
                          : field.options.length > 0 &&
                            field.options.map((option) => (
                              <ListboxOption
                                key={
                                  typeof option === 'string'
                                    ? option
                                    : option.label
                                }
                                value={
                                  typeof option === 'string' ? option : option
                                }
                                className={({ active }) =>
                                  `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                                    active
                                      ? 'text-amber-900 bg-amber-100'
                                      : 'text-gray-900'
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal'
                                      }`}
                                    >
                                      {typeof option === 'string'
                                        ? option
                                        : option.label}
                                    </span>
                                  </>
                                )}
                              </ListboxOption>
                            ))}
                      </ListboxOptions>
                    </Listbox>
                  </div>
                ) : (
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={
                      field.type === 'file'
                        ? undefined
                        : formData[field.name] || ''
                    }
                    disabled={field.disabled}
                    onChange={
                      field.type === 'file'
                        ? handleFileChange
                        : (e) => handleChange(field.name, e.target.value)
                    }
                    className="disabled:bg-zinc-900/20 mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6 focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
                  />
                )}
              </div>
            ))}
          </form>
          {error !== '' && (
            <p style={{ color: 'red' }}>{`${error} wajib diisi`}</p>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default FormPengajuan;
