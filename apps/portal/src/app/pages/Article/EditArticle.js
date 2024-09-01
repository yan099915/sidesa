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
import ArticleEditor from '../../components/Editor/ArticleEditor';

export default function EditArticle() {
  const DoGetArticleDetails = useSelector(
    (state) => state.ReduxState.DoGetArticleDetails
  );
  const ArticleDetails = useSelector(
    (state) => state.ArticlesReducers.GetArticleDetails
  );
  const errorGetArticleDetails = useSelector(
    (state) => state.ArticlesReducers.errorGetArticleDetails
  );

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (DoGetArticleDetails) {
      dispatch({ type: 'set', DoGetArticleDetails: false });

      dispatch(getArticleStatus());
      dispatch(getArticleDetails(id));
    }
  }, [DoGetArticleDetails]);

  useEffect(() => {
    if (!DoGetArticleDetails) {
      dispatch({ type: 'set', DoGetArticleDetails: true });
    }

    dispatch({
      type: 'CREATE_ARTICLE',
      payload: { data: false, errorMessage: false },
    });
  }, []);

  return (
    <div className="flex flex-col relative">
      {ArticleDetails && ArticleDetails.data ? (
        <ArticleEditor />
      ) : (
        <div className="flex justify-center items-center h-screen">
          {errorGetArticleDetails ? (
            <Button
              onClick={() => {
                dispatch({ type: 'set', DoGetArticleDetails: true });
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
