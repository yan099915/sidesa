import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/defaultLayout';
import LineChart from '../../components/Charts/LineChart';
import BarChart from '../../components/Charts/BarChart';
import PieChart from '../../components/Charts/PieChart';
import MultiLineChart from '../../components/Charts/MultiLineChart';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Listbox } from '@headlessui/react';
import { get } from 'http';
import {
  getPortalReport,
  getResidentReport,
} from '../../api/actions/ReportActions';
import HorizontalBarChart from '../../components/Charts/HorizontalBarChart';
import moment from 'moment';
import { SyncLoader } from 'react-spinners';

export default function Report() {
  const [filterDusun, setFilterDusun] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [prevFilterYear, setPrevFilterYear] = useState('');
  const [prevFilterDusun, setPrevFilterDusun] = useState('');
  const [totalPenduduk, setTotalPenduduk] = useState(0);
  const DoGetReport = useSelector((state) => state.ReduxState.DoGetReport);
  const ResidentReport = useSelector(
    (state) => state.ReportReducers.GetResidentReport
  );
  const PortalReport = useSelector(
    (state) => state.ReportReducers.GetPortalReport
  );

  const dispatch = useDispatch();
  const dusunOption = [
    { value: '', label: 'Semua' },
    { value: 'UTARA', label: 'Utara' },
    { value: 'SELATAN', label: 'Selatan' },
  ];
  // Tahun awal tetap dimulai dari 2024
  const tahunMulai = 2024;

  // Tahun sekarang
  const tahunSekarang = moment().year();

  // Membuat array tahun dari 2024 hingga tahun sekarang menggunakan moment
  const tahunOption = Array.from(
    { length: tahunSekarang - tahunMulai + 1 },
    (v, i) => ({
      value: tahunMulai + i,
      label: tahunMulai + i,
    })
  );

  const [filterTahun, setFilterTahun] = useState(tahunOption[0].value); // Default tahun adalah 2024

  const handleFetchDataResident = (dusun) => {
    // fetching data
    const param = {
      dusun: dusun || filterDusun !== '' ? filterDusun : null,
    };
    dispatch({
      type: 'GET_RESIDENT_REPORT',
      payload: { data: false, errorMessage: false },
    });
    dispatch(getResidentReport(param));
  };

  const handlePortalData = (year) => {
    // fetching data
    const param = {
      year: year || filterYear !== '' ? filterYear : null,
    };

    console.log(param, 'param');
    dispatch(getPortalReport(param));
  };

  const handleChangeFilterTahun = (value) => {
    setPrevFilterYear(filterYear);
    setFilterTahun(value);
  };

  const handleChangeFilterDusun = (filter) => {
    setPrevFilterDusun(filterDusun);
    setFilterDusun(filter);
  };

  useEffect(() => {
    if (prevFilterDusun !== filterDusun) {
      handleFetchDataResident(filterDusun);
    }

    if (prevFilterYear !== filterYear) {
      handlePortalData(filterYear);
    }
  }, [filterDusun, filterYear]);

  useEffect(() => {
    if (
      ResidentReport &&
      ResidentReport.data &&
      ResidentReport.data?.PendudukData
    ) {
      setTotalPenduduk(
        ResidentReport.data?.PendudukData[0].total +
          ResidentReport.data?.PendudukData[1].total
      );
    }
  }, [ResidentReport]);

  useEffect(() => {
    // console.log('DoGetReport', DoGetReport);
    if (DoGetReport) {
      dispatch({ type: 'set', DoGetReport: false });
      handleFetchDataResident(filterDusun);
      handlePortalData(filterYear);
    }
  }, [DoGetReport, dispatch]);

  useEffect(() => {
    if (!DoGetReport) {
      dispatch({ type: 'set', DoGetReport: true });
    }
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div className="flex flex-col h-full gap-2">
        <div className="flex flex-col bg-white  rounded-md lg:flex-row gap-2">
          <div className="flex flex-col lg:w-1/2 text-zinc-900/60 p-2">
            <div className="flex justify-between p-2">
              <div>
                <h1 className="text-2xl font-bold">Status Darurat</h1>
                <p>Total Status Darurat</p>
              </div>
            </div>
            {PortalReport &&
            PortalReport.data &&
            PortalReport.data.EmergencyData.length > 0 ? (
              <div className="relative h-64 lg:h-96 w-full">
                <LineChart database={PortalReport.data.EmergencyData} />
              </div>
            ) : (
              <div className="flex relative h-64 lg:h-96 w-full justify-center text-center items-center">
                {PortalReport.data ? (
                  <h1>Tidak ada data</h1>
                ) : (
                  <SyncLoader color="#848484" margin={3} size={6} />
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col bg-white lg:w-1/2 rounded-md text-zinc-900/60 p-2 overflow-auto">
            <div className="flex justify-between p-2">
              <div>
                <h1 className="text-2xl font-bold">Pengajuan</h1>
                <p>Total Pengajuan</p>
              </div>
              <div className="w-40">
                <Listbox value={filterTahun} onChange={handleChangeFilterTahun}>
                  <Listbox.Label className="text-xs sm:text-sm font-medium text-gray-700">
                    Tahun
                  </Listbox.Label>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative text-xs sm:text-sm w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none">
                      <span className="block truncate">
                        {
                          tahunOption.find(
                            (option) => option.value === filterTahun
                          )?.label
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
                      {tahunOption.map((option) => (
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
            {PortalReport &&
            PortalReport.data &&
            PortalReport.data.RequestData.length > 0 ? (
              <div className="relative h-64 lg:h-96 w-full">
                <LineChart database={PortalReport.data.RequestData} />
              </div>
            ) : (
              <div className="flex relative h-64 lg:h-96 w-full justify-center text-center items-center">
                {PortalReport.data ? (
                  <h1>Tidak ada data</h1>
                ) : (
                  <SyncLoader color="#848484" margin={3} size={6} />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col bg-white w-full rounded-md text-zinc-900/60 p-2">
          <h1 className="text-2xl font-bold text-center">Data Warga Desa</h1>
          <div className="flex justify-between p-2">
            <p>Total Warga: {totalPenduduk} Jiwa</p>
            <div className="w-40">
              <Listbox value={filterDusun} onChange={handleChangeFilterDusun}>
                <Listbox.Label className="text-xs sm:text-sm font-medium text-gray-700">
                  Dusun
                </Listbox.Label>
                <div className="relative mt-1">
                  <Listbox.Button className="relative text-xs sm:text-sm w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none">
                    <span className="block truncate">
                      {
                        dusunOption.find(
                          (option) => option.value === filterDusun
                        )?.label
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
          {ResidentReport && ResidentReport.data ? (
            <div className="flex flex-col gap-y-12">
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="flex flex-col lg:w-1/2 text-zinc-900/60 p-2">
                  <h1 className="text-lg font-bold">Jenis Kelamin</h1>
                  {ResidentReport.data?.PendudukData ? (
                    <div className="relative h-64 md:h-96 w-full">
                      <PieChart
                        database={ResidentReport.data?.PendudukData}
                        label="Jenis Kelamin"
                      />
                    </div>
                  ) : (
                    <div className="relative h-64 md:h-96 w-full">
                      <h1>Tidak ada data</h1>
                    </div>
                  )}
                </div>
                <div className="flex flex-col lg:w-1/2 text-zinc-900/60 p-2">
                  <h1 className="text-lg font-bold">Usia</h1>
                  {ResidentReport.data?.PendudukUsia ? (
                    <div className="relative h-64 md:h-96 w-full">
                      <PieChart
                        database={ResidentReport.data?.PendudukUsia}
                        label="Jenis Kelamin"
                      />
                    </div>
                  ) : (
                    <div className="relative h-64 md:h-96 w-full">
                      <h1>Tidak ada data</h1>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="flex flex-col w-full text-zinc-900/60 p-2">
                  <h1 className="text-lg font-bold">
                    Warga yang belum/tidak bekerja
                  </h1>
                  {ResidentReport.data?.PendudukTidakBekerja ? (
                    <div className="relative h-64 md:h-96 w-full">
                      <HorizontalBarChart
                        database={ResidentReport.data?.PendudukTidakBekerja}
                        label="Jenis Kelamin"
                      />
                    </div>
                  ) : (
                    <div className="relative h-64 md:h-96 w-full">
                      <h1>Tidak ada data</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {!ResidentReport.data ? (
                <h1 className="text-center">Tidak ada data warga</h1>
              ) : (
                <h1>Memuat Data...</h1>
              )}
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
