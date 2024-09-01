import React, { useEffect, useRef, useState, Fragment } from 'react';
import DefaultLayout from '../../layout/defaultLayout';
import ReactPDF, {
  pdf,
  PDFViewer,
  PDFDownloadLink,
  BlobProvider,
} from '@react-pdf/renderer';
import SuratDomisili from '../../js/docs/SuratDomisili';
import {
  Button,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  getRequestDetails,
  getRequestList,
  updateRequest,
} from '../../api/actions/RequestActions';
import toast from 'react-hot-toast';
import { BeatLoader, SyncLoader } from 'react-spinners';
import { DialogTitle } from '@mui/material';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import SuratKematian from '../../js/docs/SuratKematian';
import { verifySession } from '../../api/actions/UsersActions';

export default function WelcomePage() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [doSetCurrentData, setDoSetCurrentData] = useState(true);
  const [search, setSearch] = useState('');
  const [prevSearch, setPrevSearch] = useState('');
  const [currentData, setCurrentData] = useState(false);
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [waitingPrevRequestList, setwaitingPrevRequestList] = useState(false);
  const [waitingNextRequestList, setwaitingNextRequestList] = useState(false);
  const [doGetDetailsAfterUpdate, setDoGetDetailsAfterUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    status_pengajuan: '',
    surat: '',
  });
  const [buttonClicked, setButtonClicked] = useState(null);
  const DoGetRequestList = useSelector(
    (state) => state.ReduxState.DoGetRequestList
  );
  const RequestList = useSelector((state) => state.RequestReducers.RequestList);
  const RequestDetails = useSelector(
    (state) => state.RequestReducers.RequestDetails
  );
  const errorRequestDetails = useSelector(
    (state) => state.RequestReducers.errorRequestDetails
  );
  const UpdateRequest = useSelector(
    (state) => state.RequestReducers.UpdateRequest
  );
  const errorUpdateRequest = useSelector(
    (state) => state.RequestReducers.errorUpdateRequest
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPages = RequestList ? RequestList.data.totalPages : 1;
  const totalData = RequestList ? RequestList.data.requests.length : 0;

  const jenisSurat = [
    'unknown',
    'surat_domisili',
    'surat_kelahiran',
    'surat_kematian',
  ];

  const handleModalButton = (button) => {
    if (button === 1) {
      // sign
      setDisabled(true);
      dispatch(updateRequest(formData));
      toast.loading('Signing document', {
        id: 'update-request',
      });
    } else {
      console.log('cancel', buttonClicked);
      setIsOpen(false);
      setButtonClicked(null);
    }
  };

  const handleButton = async (button, data) => {
    setButtonClicked(button);
    if (button === 1) {
      const blob = await pdf(getTemplateSurat(data)).toBlob();
      // Create FormData
      formData.surat = new File([blob], 'document.pdf');
      formData.id = data.id;
      formData.status_pengajuan = 3;
    } else {
      formData.id = data.id;
      formData.status_pengajuan = 4;
      formData.surat = null;
    }
    setIsOpen(true);
  };

  const handleFetchData = (paginationPage = page) => {
    const params = {
      page: paginationPage,
      status_pengajuan: 2,
      jenis_ttd: 1,
    };

    // if (searchFilter) {
    //   params.search = searchFilter;
    // }

    dispatch(getRequestList(params));
  };

  const handleFetchRequestDetails = (id) => {
    const params = {
      id: id,
    };

    dispatch(getRequestDetails(params));
    // navigate(`/request/${id}`);
  };

  const handleNext = () => {
    //
    if (count < RequestList.data.requests.length - 1) {
      setCurrentData(RequestList.data.requests[count + 1].id);
      setCount((prev) => prev + 1);
      handleFetchRequestDetails(RequestList.data.requests[count + 1].id);
    }

    // reseting count to 0 because data only have 9 per page
    if (count === 9 && count <= RequestList.data.requests.length) {
      setCount((prev) => prev - 9);
      if (page < totalPages) {
        setPage((prev) => prev + 1);
        handleFetchData(page + 1);
        // console.log(RequestList.data.requests[0].id, 'data yang diambil');
        dispatch({
          type: 'REQUEST_LIST',
          payload: { data: false, errorMessage: false },
        });
        // handleFetchRequestDetails(RequestList.data.requests[0].id);
        setwaitingNextRequestList(true);
      }
    }

    // clean redux data first
    dispatch({
      type: 'REQUEST_DETAILS',
      payload: { data: false, errorMessage: false },
    });
    toast.loading('Getting data', {
      id: 'request-details',
    });
    setDisabled(true);
  };

  const handlePrev = () => {
    // jika page nya lebih dari 1 atau page nya sama dengan total page
    if (count > 0 || count >= RequestList.data.requests.length) {
      setCurrentData(RequestList.data.requests[count - 1].id);
      setCount((prev) => prev - 1);
      handleFetchRequestDetails(RequestList.data.requests[count - 1].id);
    }

    // maka kurangi page nya lalu reset count nya ke 9
    if (count === 0) {
      setCount((prev) => prev + 9);
      if (page > 1 || page === totalPages) {
        setPage((prev) => prev - 1);
        handleFetchData(page - 1);

        dispatch({
          type: 'REQUEST_LIST',
          payload: { data: false, errorMessage: false },
        });
        // setTimeout(() => {
        // if (
        //   RequestList.data &&
        //   RequestList.data.requests &&
        //   RequestList.data.requests[9].id
        // ) {
        //   handleFetchRequestDetails(RequestList.data.requests[9].id);
        // } else {
        setwaitingPrevRequestList(true);
        // }
        // }, 1000);
      }
    }

    // clean redux data first
    dispatch({
      type: 'REQUEST_DETAILS',
      payload: { data: false, errorMessage: false },
    });
    toast.loading('Getting data', {
      id: 'request-details',
    });
    setDisabled(true);
  };

  useEffect(() => {
    if (UpdateRequest) {
      toast.success(UpdateRequest.message, { id: 'update-request' });
      setDoGetDetailsAfterUpdate(true);
      dispatch({
        type: 'REQUEST_LIST',
        payload: { data: false, errorMessage: false },
      });
      dispatch({ type: 'set', DoGetRequestList: true });
      // window.location.reload();
    }
    if (errorUpdateRequest) {
      toast.error(errorUpdateRequest, { id: 'update-request' });
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

  useEffect(() => {
    if (RequestList && RequestList.data && RequestList.data.requests) {
      // console.log(RequestList.data.requests[0].id, 'RequestList');
      if (doSetCurrentData) {
        if (RequestList.data && RequestList.data.requests.length > 0) {
          setCurrentData(RequestList.data.requests[0].id);
          setDoSetCurrentData(false);
          handleFetchRequestDetails(RequestList.data.requests[0].id);
        }
      }

      if (RequestList.data.requests.length === 0) {
        dispatch({
          type: 'REQUEST_LIST',
          payload: { data: false, errorMessage: false },
        });
        dispatch({
          type: 'REQUEST_DETAILS',
          payload: { data: false, errorMessage: false },
        });
      }

      if (doGetDetailsAfterUpdate) {
        if (RequestList.data && RequestList.data.requests.length) {
          const validIndex =
            count > RequestList.data.requests.length
              ? RequestList.data.requests.length - 1
              : count;
          handleFetchRequestDetails(RequestList.data.requests[validIndex].id);
        }
        setDoGetDetailsAfterUpdate(false);
      }
      if (waitingPrevRequestList) {
        handleFetchRequestDetails(RequestList.data.requests[9].id);
        setwaitingPrevRequestList(false);
      }

      if (waitingNextRequestList) {
        handleFetchRequestDetails(RequestList.data.requests[0].id);
        setwaitingNextRequestList(false);
      }
    }
  }, [RequestList]);

  useEffect(() => {
    if (RequestDetails && RequestDetails.data) {
      console.log(RequestDetails.data, 'RequestDetails');
      toast.success(RequestDetails.message, {
        id: 'request-details',
      });
      setCurrentData(RequestDetails.data.id);
      setTimeout(() => {
        setDisabled(false);
        toast.dismiss('request-details');
      }, 1000);
    }

    if (errorRequestDetails) {
      toast.error(errorRequestDetails, {
        id: 'request-details',
      });

      setDisabled(false);
      setTimeout(() => {
        toast.dismiss('request-details');
      }, 1000);
    }
  }, [RequestDetails, errorRequestDetails]);

  useEffect(() => {
    if (DoGetRequestList) {
      dispatch(verifySession());
      dispatch({ type: 'set', DoGetRequestList: false });
      handleFetchData();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [DoGetRequestList]);

  useEffect(() => {
    if (!DoGetRequestList) {
      setTimeout(() => {
        dispatch({ type: 'set', DoGetRequestList: true });
      }, 1000);
    }
  }, []);

  // console.log(DoGetRequestList, 'DoGetRequestList');
  const getTemplateSurat = (data) => {
    switch (data.jenis_pengajuan) {
      case 1:
        return <SuratDomisili data={data[jenisSurat[data.jenis_pengajuan]]} />;
      case 2:
        // return <SuratKelahiran data={data} />;
        break;
      case 3:
        return <SuratKematian data={data[jenisSurat[data.jenis_pengajuan]]} />;

      default:
        return <SuratDomisili data={data} />;
    }
  };

  return (
    <DefaultLayout>
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
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h2"
                    className="text-lg text-start font-medium leading-6 text-gray-900 !px-0"
                  >
                    {buttonClicked === 1
                      ? 'Menandatangani Surat'
                      : 'Tolak Surat'}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {buttonClicked === 1
                        ? 'Apakah anda yakin ingin menandatangani surat ini?'
                        : 'Apakah anda yakin ingin menolak surat ini?'}
                    </p>
                  </div>
                  <div className="flex mt-4 justify-between">
                    <button
                      disabled={disabled}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleModalButton(1)}
                    >
                      Confirm
                    </button>
                    <button
                      disabled={disabled}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => handleModalButton(0)}
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* end of confirmation dialog */}
      {loading ? (
        <div className="flex flex-col p-6 justify-center bg-white ring-1 ring-zinc-200 shadow-sm h-screen text-center">
          <div>
            <SyncLoader color="#848484" margin={3} size={6} />
            <p className="text-zinc-500 animate-pulse">Loading</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col p-6 bg-white ring-1 ring-zinc-200 shadow-sm h-full text-center">
          <div className="flex flex-row h-full sm:screen w-full">
            {RequestDetails && RequestDetails.data ? (
              <PDFViewer
                showToolbar={false}
                className="w-full h-80 sm:h-screen md:grow"
              >
                {getTemplateSurat(RequestDetails.data)}
              </PDFViewer>
            ) : errorRequestDetails ? (
              'Error'
            ) : (
              <div className="flex flex-col w-full h-screen justify-center items-center ">
                {RequestList && RequestList.data.requests.length > 0 ? (
                  <div>
                    <SyncLoader color="#848484" margin={3} size={6} />
                    <p className="text-zinc-500 animate-pulse">Loading</p>
                  </div>
                ) : (
                  <p className="text-zinc-500">
                    Tidak ada surat yang perlu di tandatangani
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="">
            <div className="flex py-4 justify-between">
              <div className="flex text-center items-center">
                {RequestDetails && RequestDetails.data ? (
                  <Link
                    to={`/request/process/${currentData}`}
                    className="text-blue-500 hover:underline text-xs sm:text-base"
                  >
                    Lihat Detail
                  </Link>
                ) : null}
              </div>
              <div className="flex gap-2 sm:gap-4 text-xs sm:text-base">
                <p>Page: {page}</p>
                {/* <p>Current Data: {currentData}</p> */}
                <p>Total Pages: {totalPages}</p>
                <p>Count: {count}</p>
              </div>
            </div>
            <div className="flex justify-evenly">
              <div className="w-1/4">
                {RequestList && RequestList.data ? (
                  <div>
                    {page >= totalPages && count > 0 ? (
                      <Button
                        onClick={() => handlePrev()}
                        disabled={disabled}
                        className="text-zinc-900 bg-white bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 rounded-xl px-2 py-2"
                      >
                        <ChevronLeft className="text-zinc-900 " />
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="flex w-1/2 ">
                {RequestDetails && RequestDetails.data ? (
                  <div className="flex w-full justify-evenly">
                    <Button
                      onClick={(e) => handleButton(1, RequestDetails.data)}
                      disabled={disabled}
                      className="inline-flex text-center items-center justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      {disabled ? (
                        <BeatLoader color="#848484" margin={3} size={6} />
                      ) : (
                        <>
                          <CheckIcon className="block sm:hidden h-5 w-5" />{' '}
                          <p className="hidden sm:block">Approve</p>
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={(e) => handleButton(0, RequestDetails.data)}
                      disabled={disabled}
                      className="inline-flex text-center items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                      {disabled ? (
                        <BeatLoader color="#848484" margin={3} size={6} />
                      ) : (
                        <>
                          <XMarkIcon className="block sm:hidden h-5 w-5" />{' '}
                          <p className="hidden sm:block">Reject</p>
                        </>
                      )}
                    </Button>
                  </div>
                ) : null}
              </div>
              <div className="w-1/4">
                {RequestList && RequestList.data ? (
                  <div>
                    {page < totalPages || count < totalData - 1 ? (
                      <Button
                        onClick={() => handleNext()}
                        disabled={disabled}
                        className="text-zinc-900 bg-white bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 rounded-xl px-2 py-2"
                      >
                        <ChevronRight className="text-zinc-900" />
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* <PDFDownloadLink
            document={<MyDocument data={data} />}
            fileName="test.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink> */}
          {/* <BlobProvider document={<MyDocument data={data} />}>
            {({ blob, url, loading, error }) => {
              // Do whatever you need with blob here
              return loading ? (
                <Button
                  disabled={true}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-700"
                >
                  Loading
                </Button>
              ) : (
                <Button
                  onClick={() => tombol}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-700"
                >
                  Sign
                </Button>
              );
            }}
          </BlobProvider> */}
        </div>
      )}
    </DefaultLayout>
  );
}
