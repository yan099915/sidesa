import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Textarea,
  ListboxOptions,
  ListboxOption,
  Listbox,
  ListboxButton,
  Checkbox,
} from '@headlessui/react';
import { CrisisAlertOutlined, MyLocationOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Gmaps from '../Gmaps/Gmaps';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { createEmergency } from '../../api/actions/EmergencyActions';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function EmergencyButton() {
  const [notifying, setNotifying] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    jenis_kejadian: '',
    deskripsi: '',
    lat: '',
    lng: '',
    foto_emergency: '',
  });
  const [location, setLocation] = useState({
    lat: -0.622021873736297,
    lng: 100.12498761558196,
  });

  const CreateEmergency = useSelector(
    (state) => state.EmergencyReducers.CreateEmergency
  );
  const errorCreateEmergency = useSelector(
    (state) => state.EmergencyReducers.errorCreateEmergency
  );

  const UserSession = useSelector((state) => state.UsersReducers.UserSession);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const optionsKejadian = [
    { value: '', label: 'Pilih Jenis Kejadian' },
    { value: 'kriminal', label: 'Kriminal' },
    { value: 'kebakaran', label: 'Kebakaran' },
    { value: 'bencana', label: 'Bencana Alam' },
    { value: 'kecelakaan', label: 'Kecelakaan' },
  ];

  // ask permission to get user location
  const askPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          dispatch({
            type: 'set',
            UserGeolocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            DataGeolocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
          setLocationPermission(true);
        },
        () => {
          setLocationPermission(false);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleClickButton = () => {
    console.log(UserSession, 'UserSession');
    if (UserSession && UserSession.data && UserSession.data.verified) {
      console.log('verifikasi');
      setIsOpen(true);
    } else {
      toast.error('Akun anda belum terverifikasi', {
        id: 'emergency',
      });
      setTimeout(() => {
        toast.dismiss('emergency');
        navigate('/profile');
      }, 1000);
    }
  };

  const handleChangeKejadian = (value) => {
    if (value.value !== formData.jenis_kejadian) {
      setFormData({ ...formData, jenis_kejadian: value.value });
    } else {
      // console.log('repeat');
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (file && validTypes.includes(file.type)) {
      // console.log(file, 'FILENYA');
      setFormData((prevData) => ({ ...prevData, foto_emergency: file }));
    } else {
      alert('Invalid file type. Please upload a JPG, JPEG, or PNG image.');
      e.target.value = ''; // Reset input file
    }
  };

  const handleSubmit = () => {
    // check if enabled is true or note
    if (!enabled) {
      alert('Mohon untuk mencentang persetujuan');
      return;
    }

    // check if form not empty with looping
    for (const key in formData) {
      if (formData[key] === '' && key !== 'foto_emergency') {
        // console.log('Form is empty', key);
        setError(key);
        return;
      }
    }

    toast.loading('Mengirimkan pesan darurat...', {
      id: 'emergency-alert',
    });

    setDisabled(true);

    dispatch(createEmergency(formData));
  };

  useEffect(() => {
    if (CreateEmergency) {
      setTimeout(() => {
        toast.success('Pesan darurat berhasil dikirim', {
          id: 'emergency-alert',
        });
        setIsOpen(false);
        setDisabled(false);
      }, 1000);
      dispatch({
        type: 'CREATE_EMERGENCY',
        payload: { data: false, errorMessage: false },
      });
    }
  }, [CreateEmergency]);

  useEffect(() => {
    if (errorCreateEmergency) {
      toast.error('Gagal mengirimkan pesan darurat', {
        id: 'emergency-alert',
      });
      setDisabled(false);
      dispatch({
        type: 'CREATE_EMERGENCY',
        payload: { data: false, errorMessage: false },
      });
    }
  }, [errorCreateEmergency]);

  useEffect(() => {
    if (
      location.lat !== -0.622021873736297 &&
      location.lng !== 100.12498761558196
    ) {
      setFormData({
        ...formData,
        lat: location.lat,
        lng: location.lng,
      });
      dispatch({
        type: 'set',
        DataGeolocation: {
          lat: location.lat,
          lng: location.lng,
        },
      });
    }
  }, [location]);

  useEffect(() => {
    askPermission();
    if (location) {
      dispatch({
        type: 'set',
        DataGeolocation: {
          lat: location.lat,
          lng: location.lng,
        },
      });
    }
  }, []);

  // console.log(formData, 'formdata');

  return (
    <div className="flex relative active:opacity-80">
      <Button
        onClick={(e) => handleClickButton()}
        className="relative has-tooltip flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <span className="tooltip rounded text-[10px] shadow-lg mt-14 leading-none py-[2px] px-1 bg-black text-white">
          Emergency
        </span>
        <div className="flex items-center justify-center h-7 w-7 rounded-full overflow-hidden">
          <CrisisAlertOutlined fontSize="xs" className="text-red-500" />
        </div>
      </Button>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-9999 focus:outline-none"
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-zinc-900/40">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel className="max-w-lg space-y-4 bg-white p-12 data-[closed]:scale-95 data-[closed]:opacity-0">
              <DialogTitle as="h3" className="text-xl text-black font-bold">
                Kirim Pesan Darurat
              </DialogTitle>
              <Field className="flex flex-col gap-y-2">
                <Label>
                  Izinkan Akses Lokasi<span className="text-red-500">*</span>
                </Label>
                <Button
                  disabled={disabled}
                  onClick={askPermission}
                  className="flex flex-col items-center bg-zinc-200 active:bg-zinc-300 w-fit p-2 shadow-md shadow-inner ring-[0.5px] ring-zinc-900/40"
                >
                  <MyLocationOutlined fontSize="xs" className="text-black" />
                </Button>
                {location.lat === -0.622021873736297 &&
                location.lng === 100.12498761558196 ? (
                  'Mohon Izinkan Akses Lokasi'
                ) : (
                  <Gmaps draggable={false} />
                )}
              </Field>
              <Field>
                <Label>Deskripsi Kejadian</Label>
                <Textarea
                  disabled={disabled}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  value={formData.deskripsi}
                  className="disabled:bg-zinc-900/20 mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6 focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
                />
              </Field>
              <Field className="relative">
                <Label>Jenis Kejadian</Label>
                <Listbox
                  value={
                    formData?.jenis_kejadian === ''
                      ? 'Pilih Jenis Kejadian'
                      : formData?.jenis_kejadian
                  }
                  disabled={disabled}
                  onChange={(value) => handleChangeKejadian(value)}
                  // disabled={disabled}
                >
                  <ListboxButton className="flex flex-col block w-full mt-3 rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6 disabled:bg-zinc-900/20 outline-zinc-900">
                    {formData?.jenis_kejadian === ''
                      ? 'Pilih Jenis Kejadian'
                      : formData?.jenis_kejadian}
                    <ChevronDownIcon
                      className="pointer-events-none absolute my-auto right-2.5 w-4 fill-gray-900/60"
                      aria-hidden="true"
                    />
                  </ListboxButton>
                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {optionsKejadian.map((option) => (
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
              </Field>
              <Field>
                <Label>Foto kejadian</Label>
                <Input
                  onChange={(e) => handleFileChange(e)}
                  disabled={disabled}
                  type="file"
                  className="disabled:bg-zinc-900/20 mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6 focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
                />
              </Field>
              <Field className="relative flex gap-x-2">
                <Checkbox
                  checked={enabled}
                  disabled={disabled}
                  onChange={setEnabled}
                  className="group block w-4 h-4 rounded border bg-white data-[checked]:bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500"
                >
                  <svg
                    className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Checkbox>
                <p className="text-sm w-4/5 text-justify leading-none">
                  Saya memahami bahwa mengirimkan informasi palsu dapat
                  dikenakan pidana hukum
                </p>
              </Field>
              <p className="mt-2 text-sm text-red text-justify">
                Apakah anda yakin ingin mengirim notifikasi darurat?
              </p>
              <span
                className={
                  (error !== '' ? 'block' : 'hidden') + ' text-xs text-red-500'
                }
              >
                {error === 'lokasi'
                  ? 'Mohon Izinkan Akses Lokasi'
                  : `Field ${error} tidak boleh kosong`}
              </span>
              <div className="mt-4 flex justify-between">
                <Button
                  disabled={disabled}
                  className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 bg-red-500 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
                  onClick={handleSubmit}
                >
                  Kirim
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 bg-zinc-900 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
                  onClick={() => setIsOpen(false)}
                >
                  Batal
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
