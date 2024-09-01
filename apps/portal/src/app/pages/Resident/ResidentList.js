import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { IconButton } from '@mui/material';
import clsx from 'clsx';
import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  Cancel,
  EditNoteOutlined,
  DeleteForever,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  deleteResident,
  getResidents,
} from '../../api/actions/ResidentActions';
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Listbox,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { verifySession } from '../../api/actions/UsersActions';
import toast from 'react-hot-toast';

export default function ResidentList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [disabled, setDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [residentIdToDelete, setResidentIdToDelete] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [prevSearch, setPrevSearch] = useState('');
  const [filterDusun, setFilterDusun] = useState('');
  const DoGetResidents = useSelector(
    (state) => state.ReduxState.DoGetResidents
  );
  const Residents = useSelector(
    (state) => state.ResidentReducers.ResidentsData
  );
  const DeleteResidentData = useSelector(
    (state) => state.ResidentReducers.DeleteResident
  );
  const errorDeleteResident = useSelector(
    (state) => state.ResidentReducers.errorDeleteResident
  );

  const dusunOption = [
    { value: '', label: 'Semua' },
    { value: 'UTARA', label: 'Utara' },
    { value: 'SELATAN', label: 'Selatan' },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPages =
    Residents && Residents.data ? Residents.data.totalPages : 1;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleFetchData(pageSize, newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);
    handleFetchData(Number(event.target.value), 1);
  };

  const handleFetchData = (newLimit, newPage, dusun) => {
    const params = {
      limit: newLimit || pageSize,
      page: newPage || page,
    };

    if (search !== '') {
      params.search = search;
    }

    if (dusun) {
      params.dusun = filterDusun;
    }

    dispatch(getResidents(params));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      handlePageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      handlePageChange(page + 1);
    }
  };

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      //check if search prevState is not equal to current search value
      if (search !== prevSearch) {
        setPrevSearch(search);
        handleFetchData();
      }
    }
  };

  const handleClearSearch = () => {
    setSearch('');
    setPrevSearch('');
  };

  const handleRowClick = (nik) => {
    navigate(`/resident/details/${nik}`);
  };

  const confirmDeleteResident = () => {
    // handle delete article
    setDisabled(true);
    console.log(residentIdToDelete, 'idtodelete');
    dispatch(deleteResident(residentIdToDelete));
    toast.loading('Menghapus data warga...', {
      id: 'delete-resident',
    });
  };

  const handleCancelDelete = () => {
    setResidentIdToDelete(false);
    setIsOpen(false);
  };

  useEffect(() => {
    if (DoGetResidents) {
      dispatch(verifySession());
      const param = {
        page: 1,
        limit: 10,
      };
      dispatch(getResidents(param));
      dispatch({ type: 'set', DoGetResidents: false });
    }
  }, [DoGetResidents]);

  useEffect(() => {
    if (DeleteResidentData) {
      toast.success('Data Warga Berhasil dihapus!', {
        id: 'delete-resident',
      });
      handleFetchData(10, 1);
    }

    if (errorDeleteResident) {
      toast.error(errorDeleteResident, {
        id: 'delete-resident',
      });
    }

    setTimeout(() => {
      dispatch({
        type: 'DELETE_RESIDENT',
        payload: { data: false, errorMessage: false },
      });
      setResidentIdToDelete(false);
      setIsOpen(false);
    }, 1000);
    setDisabled(false);
  }, [DeleteResidentData, errorDeleteResident]);

  useEffect(() => {
    handleFetchData(pageSize, page, filterDusun);
  }, [filterDusun]);

  useEffect(() => {
    if (!DoGetResidents) {
      dispatch({ type: 'set', DoGetResidents: true });
    }
  }, []);

  // console.log(Residents, 'Residents');
  // Jika ada riwayat pengajuan, tampilkan tabel
  return (
    <div>
      {/* confirmation dialog */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          open={isOpen}
          as="div"
          className="relative z-9999"
          onClose={() => null}
        >
          <TransitionChild
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="flex flex-col items-center w-full transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h2"
                    className="text-lg text-start font-medium leading-6 text-gray-900 !px-0"
                  >
                    Hapus Data Warga
                  </DialogTitle>
                  <div>
                    <p className="text-sm text-gray-500">
                      Yakin ingin menghapus data warga ini?
                    </p>
                  </div>
                  <div className="w-full mt-4 justify-end flex gap-x-4 py-2">
                    <Button
                      disabled={disabled}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => confirmDeleteResident()}
                    >
                      Hapus
                    </Button>
                    <Button
                      disabled={disabled}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => handleCancelDelete()}
                    >
                      Batal
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* end of confirmation dialog */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center mb-4">
        <div className="flex gap-x-4 w-1/2">
          <Field className="relative flex justify-center content-center items-center">
            <Button
              onClick={(e) => handleClearSearch()}
              className={
                (search === '' ? 'hidden' : 'block') +
                ' absolute flex right-2 w-5  hover:ring-zinc-900/50 rounded-full justify-center cont items-center'
              }
            >
              <Cancel className="w-3 text-zinc-900/20 hover:text-zinc-900/40 active:text-zinc-900/20" />
            </Button>
            <Input
              placeholder="Cari NIK / Nama / KK"
              onKeyDown={(e) => handleSearchEnter(e)}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="p-2 ring-1 ring-zinc-900/20 rounded-md"
            ></Input>
          </Field>
          <div className="w-40">
            <Listbox value={filterDusun} onChange={setFilterDusun}>
              <Listbox.Label className="text-xs sm:text-sm font-medium text-gray-700">
                Dusun
              </Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button className="relative text-xs sm:text-sm w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none">
                  <span className="block truncate">
                    {
                      dusunOption.find((option) => option.value === filterDusun)
                        ?.label
                    }
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute text-xs sm:text-sm z-99 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {dusunOption.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                          active
                            ? 'text-amber-900 bg-amber-100'
                            : 'text-gray-900'
                        }`
                      }
                      value={option.value}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {option.label}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <ChevronDownIcon
                                className="w-5 h-5 text-amber-600"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>
        <Link
          to="add"
          className="px-4 py-2 w-fit bg-zinc-900 text-white rounded"
        >
          Tambah
        </Link>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-t border-b text-xs border-zinc-200">
              <th className="py-2">ID</th>
              <th className="py-2">NIK</th>
              <th className="py-2">Nama</th>
              <th className="py-2">KK</th>
              <th className="py-2">Dusun</th>
              <th className="py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Residents &&
            Residents.data &&
            Residents.data.residents.length > 0 ? (
              Residents.data.residents.map((resident) => (
                <tr
                  key={resident.id}
                  className="border-b border-zinc-200  hover:bg-zinc-100 cursor-pointer text-xs text-center"
                >
                  <td className="py-2">{resident.id}</td>
                  <td
                    className="py-2"
                    onClick={() => handleRowClick(resident.nomor_ktp)}
                  >
                    {resident.nomor_ktp}
                  </td>
                  <td
                    className="py-2"
                    onClick={() => handleRowClick(resident.nomor_ktp)}
                  >
                    {resident.nama}
                  </td>
                  <td className="py-2">{resident.nomor_kk}</td>
                  <td className="py-2">{resident.dusun}</td>
                  <td className="py-2">{resident.dusun}</td>
                  <td className="flex py-2 justify-center items-center gap-x-2">
                    {/* <Button
                    // onClick={(e) => handleEditArticle(article.id)}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-zinc-200 px-1 py-1 text-sm font-medium text-zinc-900 hover:bg-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <EditNoteOutlined fontSize="sm" />
                  </Button> */}
                    <Button
                      onClick={(e) => {
                        setIsOpen(true);
                        setResidentIdToDelete(resident.id);
                      }}
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-1 py-1 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <DeleteForever fontSize="sm" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-2 text-center border-b border-zinc-200"
                >
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col content-center justify-center text-center">
            <div className="flex gap-x-4 items-center">
              <span className="text-sm/6 font-medium">Page Size</span>
              <div className="relative flex items-center ">
                <select
                  className={clsx(
                    'mt-3 block w-[70px] appearance-none rounded-lg ring-1 ring-zinc-900/20 bg-white/5 py-1.5 px-3 text-sm/6',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                    '*:text-black'
                  )}
                  value={pageSize}
                  onChange={handlePageSizeChange}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                </select>
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-1/2 right-2 w-4 fill-black/60"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4">
            <IconButton onClick={handlePrevious} disabled={currentPage === 1}>
              <ChevronLeftOutlined />
            </IconButton>
            <span className="mx-2">
              {currentPage} of {totalPages}
            </span>
            <IconButton
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <ChevronRightOutlined />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
