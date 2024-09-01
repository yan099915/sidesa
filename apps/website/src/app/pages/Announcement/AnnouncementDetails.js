import React, { useEffect } from 'react';
import NewsGrid from '../../components/NewsGrid';
import { CalendarMonthSharp, Person } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetAnnouncementDetails } from '../../actions/AnnouncementsActions';
import moment from 'moment/moment';
import DOMPurify from 'dompurify';
import { SyncLoader } from 'react-spinners';

export default function AnnouncementDetails() {
  const param = useParams();
  const date = new Date();

  const dispatch = useDispatch();

  const DoGetAnnouncementDetails = useSelector(
    (state) => state.ReduxState.DoGetAnnouncementDetails
  );
  const AnnouncementDetails = useSelector(
    (state) => state.AnnouncementReducers.GetAnnouncementDetails
  );

  const errorGetAnnouncementDetails = useSelector(
    (state) => state.AnnouncementReducers.errorGetAnnouncementDetails
  );

  // Scroll to top on initial render
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [param]);

  useEffect(() => {
    if (DoGetAnnouncementDetails) {
      dispatch({ type: 'set', DoGetAnnouncementDetails: false });
      dispatch(GetAnnouncementDetails(param.id));
    }
  }, [DoGetAnnouncementDetails]);

  useEffect(() => {
    if (!DoGetAnnouncementDetails) {
      dispatch({ type: 'set', DoGetAnnouncementDetails: true });
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col px-4 py-8 ">
      {/* news body */}
      {AnnouncementDetails && AnnouncementDetails.data ? (
        <div>
          <div className="w-full border border-b-0  border-zinc-900/5 px-4 py-8">
            <h1 className="text-2xl font-bold">
              {AnnouncementDetails.data.title}
            </h1>
            <div className="flex gap-x-4 ">
              <div className="flex items-center gap-x-1">
                <Person fontSize="sm" />
                <p className="text-xs leading-none align-middle">
                  {/* {newsData[param.id - 1].author} */}
                  admin
                </p>
              </div>
              <div className="flex items-center gap-x-1">
                <CalendarMonthSharp fontSize="sm" />
                <p className="text-xs leading-none align-middle">
                  {moment(AnnouncementDetails.data.createdAt).format(
                    'DD MMMM YYYY hh:mm'
                  )}
                </p>
              </div>
              <div>
                {AnnouncementDetails.data.announcement_type.id === 2 ? (
                  <span className="border border-blue-500 text-blue-500 font-semibold text-xs px-2 py-1 rounded w-24 text-center">
                    {AnnouncementDetails.data.announcement_type.name}
                  </span>
                ) : AnnouncementDetails.data.announcement_type.id === 1 ? (
                  <span className="border border-red-500 text-red-500 text-xs px-2 py-1 rounded w-24 text-center">
                    {AnnouncementDetails.data.announcement_type.name}
                  </span>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          {/* news body */}
          <div className="px-4 border border-t-0  border-zinc-900/5">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(AnnouncementDetails.data.content),
              }}
              className="py-10"
            ></div>
          </div>
          {/* news footer */}
        </div>
      ) : (
        <div className="w-full border border-b-0  border-zinc-900/5 px-4 py-8">
          {!errorGetAnnouncementDetails && !AnnouncementDetails ? (
            <div className="flex  justify-center">
              <div className="flex flex-col items-center">
                <SyncLoader color="#848484" margin={3} size={6} />
                <p className="text-zinc-500 animate-pulse">Loading</p>
              </div>
            </div>
          ) : (
            <div className="flex  justify-center">
              <h1>Halaman atau pengumuman yang anda cari tidak ditemukan</h1>
            </div>
          )}
        </div>
      )}
      {/* news footer */}
      <div>
        <NewsGrid count={4} />
      </div>
    </div>
  );
}
