import React, { useEffect } from 'react';
import NewsGrid from '../../components/NewsGrid';
import { CalendarMonthSharp, Person } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleDetails } from '../../actions/ArticleActions';
import { SyncLoader } from 'react-spinners';
import moment from 'moment';
import DOMPurify from 'dompurify';

const DOMAIN = process.env.NX_PUBLIC_DOMAIN;
export default function NewsDetails() {
  const { id } = useParams();
  const date = new Date();

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

  const handleFetchArticleDetails = () => {
    dispatch(getArticleDetails(id));
  };

  const transformOembedToIframe = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const oembeds = doc.querySelectorAll('oembed[url]');
    oembeds.forEach((node) => {
      const url = node.getAttribute('url');

      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.includes('youtu.be')
          ? url.split('youtu.be/')[1].split('?')[0]
          : new URL(url).searchParams.get('v');

        const iframe = document.createElement('iframe');
        iframe.setAttribute('width', '560');
        iframe.setAttribute('height', '315');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}`);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute(
          'allow',
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        );
        iframe.setAttribute('allowfullscreen', 'true');

        node.parentNode.replaceChild(iframe, node);
      }
    });

    return doc.body.innerHTML;
  };

  // Scroll to top on initial render
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch({
      type: 'ARTICLE_DETAILS_RESET',
      payload: { data: false, errorMessage: false },
    });
    handleFetchArticleDetails();
  }, [id]);

  useEffect(() => {
    if (DoGetArticleDetails) {
      handleFetchArticleDetails();
      dispatch({ type: 'set', DoGetArticleDetails: false });
      console.log('fetching articles details');
    }
  }, [DoGetArticleDetails, dispatch]);

  useEffect(() => {
    dispatch({ type: 'set', DoGetArticleDetails: true });
  }, [dispatch]);
  return (
    <div className="flex flex-col px-4 py-8 ">
      {/* news title */}
      {ArticleDetails && ArticleDetails.data ? (
        <div>
          <div className="w-full border border-b-0  border-zinc-900/5 px-4 py-8">
            <h1 className="text-2xl font-bold">{ArticleDetails.data.title}</h1>
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
                  {moment(ArticleDetails.data.createdAt).format(
                    'DD MMMM YYYY hh:mm'
                  )}
                </p>
              </div>
            </div>
          </div>
          {/* news body */}
          <div
            className="prose prose-sm max-w-none py-10 ck-content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                transformOembedToIframe(ArticleDetails.data.content),
                {
                  ADD_TAGS: [
                    'iframe',
                    'table',
                    'thead',
                    'tbody',
                    'tfoot',
                    'tr',
                    'td',
                    'th',
                    'figure',
                  ],
                  ADD_ATTR: [
                    'allow',
                    'allowfullscreen',
                    'frameborder',
                    'scrolling',
                    'class',
                    'style',
                    'width',
                    'height',
                    'src',
                    'alt',
                  ],
                }
              ),
            }}
          ></div>

          {/* news footer */}
        </div>
      ) : (
        <div className="w-full border border-b-0  border-zinc-900/5 px-4 py-8">
          {!errorGetArticleDetails && !ArticleDetails ? (
            <div className="flex  justify-center">
              <div className="flex flex-col items-center">
                <SyncLoader color="#848484" margin={3} size={6} />
                <p className="text-zinc-500 animate-pulse">Loading</p>
              </div>
            </div>
          ) : (
            <div className="flex  justify-center">
              <h1>Halaman atau berita yang anda cari tidak ditemukan</h1>
            </div>
          )}
        </div>
      )}

      <div>
        <NewsGrid count={4} />
      </div>
    </div>
  );
}
