import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../../layout/defaultLayout';
import ReactPDF, {
  pdf,
  PDFViewer,
  PDFDownloadLink,
  BlobProvider,
} from '@react-pdf/renderer';
import MyDocument from '../../js/docs';
import { Button } from '@headlessui/react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  getRequestDetails,
  getRequestList,
} from '../../api/actions/RequestActions';
import toast from 'react-hot-toast';

export default function WelcomePage() {
  const [page, setPage] = useState(1);

  const [doSetCurrentData, setDoSetCurrentData] = useState(true);
  const [search, setSearch] = useState('');
  const [prevSearch, setPrevSearch] = useState('');
  const [currentData, setCurrentData] = useState(false);
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(true);

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

  const tombol = async () => {
    // const blob = await pdf(<MyDocument />).toBlob();

    // // Create FormData
    // let formData = new FormData();
    // formData.append('file', blob, 'document.pdf');
    // // Log FormData entries
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }

    setCurrentData((prev) => prev + 1);
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
    // reseting count to 0 because data only have 9 per page
    if (count === 9 && count <= RequestList.data.requests.length) {
      setCount((prev) => prev - 9);
      if (page < totalPages) {
        setPage((prev) => prev + 1);
        handleFetchData(page + 1);
        handleFetchRequestDetails(RequestList.data.requests[0].id);
      }
    }
    //
    if (count < RequestList.data.requests.length - 1) {
      setCurrentData(RequestList.data.requests[count + 1].id);
      setCount((prev) => prev + 1);
      handleFetchRequestDetails(RequestList.data.requests[count + 1].id);
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
    // set current page
    // jika page nya lebih dari 1 atau page nya sama dengan total page
    // maka kurangi page nya lalu reset count nya ke 9

    if (count > 0 || count >= RequestList.data.requests.length) {
      setCurrentData(RequestList.data.requests[count - 1].id);
      setCount((prev) => prev - 1);
      handleFetchRequestDetails(RequestList.data.requests[count - 1].id);
    }

    if (count === 0) {
      setCount((prev) => prev + 9);
      if (page > 1 || page === totalPages) {
        setPage((prev) => prev - 1);
        handleFetchData(page - 1);
        handleFetchRequestDetails(RequestList.data.requests[9].id);
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
    if (RequestList && RequestList.data && RequestList.data.requests) {
      console.log(RequestList.data.requests[0].id, 'RequestList');
      if (doSetCurrentData) {
        setCurrentData(RequestList.data.requests[0].id);
        setDoSetCurrentData(false);
        handleFetchRequestDetails(RequestList.data.requests[0].id);
      }
    }
  }, [RequestList]);

  useEffect(() => {
    if (RequestDetails && RequestDetails.data) {
      console.log(RequestDetails.data, 'RequestDetails');
      toast.success(RequestDetails.message, {
        id: 'request-details',
      });

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
      dispatch({ type: 'set', DoGetRequestList: false });
      handleFetchData();
    }
  }, [DoGetRequestList]);

  useEffect(() => {
    if (!DoGetRequestList) {
      dispatch({ type: 'set', DoGetRequestList: true });
    }
  }, []);

  // console.log(DoGetRequestList, 'DoGetRequestList');

  return (
    <DefaultLayout>
      <div className="flex flex-col p-6 bg-white ring-1 ring-zinc-200 shadow-sm h-full text-center">
        <div className="flex flex-row h-full sm:screen w-full">
          {RequestDetails && RequestDetails.data ? (
            <PDFViewer
              showToolbar={false}
              className="w-full h-80 sm:h-screen md:grow"
            >
              <MyDocument
                data={
                  RequestDetails.data[
                    jenisSurat[RequestDetails.data.jenis_pengajuan]
                  ]
                }
              />
            </PDFViewer>
          ) : errorRequestDetails ? (
            'Error'
          ) : (
            <div className="flex flex-col w-full h-screen justify-center items-center ">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <p className="text-zinc-300">Loading</p>
            </div>
          )}
        </div>
        <div className="">
          <div className="flex py-4 justify-between">
            <div className="flex text-center items-center">
              <Link
                to={`/request/process/${currentData}`}
                className="text-blue-500 hover:underline text-xs sm:text-base"
              >
                Lihat Detail
              </Link>
            </div>
            <div className="flex gap-2 sm:gap-4 text-xs sm:text-base">
              <p>Page: {page}</p>
              <p>Current Data: {currentData}</p>
              <p>Total Pages: {totalPages}</p>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="w-1/4">
              {RequestList && RequestList.data ? (
                <div>
                  {page >= totalPages || count > 0 ? (
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
                    onClick={(e) => tombol}
                    disabled={disabled}
                    className="text-white bg-zinc-900 hover:bg-zinc-700 active:bg-zinc-800 font-semibold text-xs sm:text-base rounded-xl px-2 py-2"
                  >
                    Approve
                  </Button>
                  <Button
                    disabled={disabled}
                    className="text-zinc-900 bg-white border hover:bg-zinc-200 active:bg-zinc-300 border-zinc-900 font-semibold text-xs sm:text-base rounded-xl px-2 py-2"
                  >
                    Reject
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
    </DefaultLayout>
  );
}
