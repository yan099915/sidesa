import React, { useEffect } from 'react';
import Editor from '../../components/Editor/ArticleEditor';
import { Button } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'http';
import { useParams } from 'react-router-dom';
import {
  getArticleDetails,
  getArticleStatus,
} from '../../api/actions/ArticleActions';
import { SyncLoader } from 'react-spinners';
import AnnouncementEditor from '../../components/Editor/AnnouncementEditor';
import {
  getAnnouncementDetails,
  getAnnouncementStatus,
  getAnnouncementType,
} from '../../api/actions/AnnouncementActions';

export default function EditAnnouncement() {
  const DoGetAnnouncementDetails = useSelector(
    (state) => state.ReduxState.DoGetAnnouncementDetails
  );
  const AnnouncementDetails = useSelector(
    (state) => state.AnnouncementReducers.GetAnnouncementDetails
  );
  const errorGetAnnouncementDetails = useSelector(
    (state) => state.AnnouncementReducers.errorGetAnnouncementDetails
  );

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (DoGetAnnouncementDetails) {
      dispatch({ type: 'set', DoGetAnnouncementDetails: false });

      dispatch(getAnnouncementType());
      dispatch(getAnnouncementStatus());
      dispatch(getAnnouncementDetails(id));
    }
  }, [DoGetAnnouncementDetails]);

  useEffect(() => {
    if (!DoGetAnnouncementDetails) {
      dispatch({ type: 'set', DoGetAnnouncementDetails: true });
    }

    dispatch({
      type: 'CREATE_ANNOUNCEMENT',
      payload: { data: false, errorMessage: false },
    });
  }, []);

  return (
    <div className="flex flex-col relative">
      {AnnouncementDetails && AnnouncementDetails.data ? (
        <AnnouncementEditor />
      ) : (
        <div className="flex justify-center items-center h-screen">
          {errorGetAnnouncementDetails ? (
            <Button
              onClick={() => {
                dispatch({ type: 'set', DoGetAnnouncementDetails: true });
              }}
              className="inline-flex text-center items-center justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Retry
            </Button>
          ) : (
            <div>
              <SyncLoader color="#848484" margin={3} size={6} />
              <p className="text-zinc-500 animate-pulse">Loading</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
