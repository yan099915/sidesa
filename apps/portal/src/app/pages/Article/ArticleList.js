import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  createArticle,
  deleteArticle,
  getArticle,
} from '../../api/actions/ArticleActions';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  DeleteForever,
  EditNoteOutlined,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import moment from 'moment';
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { verifySession } from '../../api/actions/UsersActions';

export default function () {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const Articles = useSelector((state) => state.ArticlesReducers.GetArticles);
  const DoGetArticles = useSelector((state) => state.ReduxState.DoGetArticles);
  const CreateArticle = useSelector(
    (state) => state.ArticlesReducers.CreateArticle
  );
  const errorCreateArticle = useSelector(
    (state) => state.ArticlesReducers.errorCreateArticle
  );
  const DeleteArticleData = useSelector(
    (state) => state.ArticlesReducers.DeleteArticle
  );
  const errorDeleteArticle = useSelector(
    (state) => state.ArticlesReducers.errorDeleteArticle
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPages = Articles ? Articles.data.totalPages : 1;

  const handleFetchData = (paginationSize, paginationPage) => {
    const params = {
      limit: paginationSize || pageSize,
      page: paginationPage || page,
    };
    dispatch(getArticle(params));
  };

  const handleCreateArticle = () => {
    // handle create new article
    dispatch({
      type: 'CREATE_ARTICLE',
      payload: { data: false, errorMessage: false },
    });
    dispatch(createArticle());
    toast.loading('Creating new article...', {
      id: 'create-article',
    });
    setDisabled(true);
  };

  const handleEditArticle = (id) => {
    // handle edit article
    navigate(`/article/edit/${id}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleFetchData(pageSize, newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);

    handleFetchData(Number(event.target.value), 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      handlePageChange(page - 1);
    }
  };

  const confirmDeleteArticle = () => {
    // handle delete article
    setDisabled(true);
    console.log(articleIdToDelete, 'idtodelete');
    dispatch(deleteArticle(articleIdToDelete));
    toast.loading('Deleting article...', {
      id: 'delete-article',
    });
  };

  const handleCancelDelete = () => {
    setArticleIdToDelete(false);
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      handlePageChange(page + 1);
    }
  };

  useEffect(() => {
    if (CreateArticle) {
      toast.success('Article created successfully', {
        id: 'create-article',
      });
      handleFetchData(10, 1);

      navigate(`/article/edit/${CreateArticle.data.id}`);
    }

    if (errorCreateArticle) {
      toast.error(errorCreateArticle, {
        id: 'create-article',
      });
    }
    setDisabled(false);
  }, [CreateArticle, errorCreateArticle]);

  useEffect(() => {
    if (DeleteArticleData) {
      toast.success('Article deleted successfully', {
        id: 'delete-article',
      });
      handleFetchData(10, 1);
    }

    if (errorDeleteArticle) {
      toast.error(errorDeleteArticle, {
        id: 'delete-article',
      });
    }

    setTimeout(() => {
      dispatch({
        type: 'DELETE_ARTICLE',
        payload: { data: false, errorMessage: false },
      });
      setArticleIdToDelete(false);
      setIsOpen(false);
    }, 1000);
    setDisabled(false);
  }, [DeleteArticleData, errorDeleteArticle]);

  useEffect(() => {
    if (DoGetArticles) {
      dispatch(verifySession());
      dispatch({ type: 'set', DoGetArticles: false });
      handleFetchData(10, 1);
      // dispatch({ type: 'GET_ARTICLES', payload: { data: false, errorMessage: false } });
    }
  }, [DoGetArticles]);

  useEffect(() => {
    if (!DoGetArticles) {
      dispatch({ type: 'set', DoGetArticles: true });
    }
  }, []);

  console.log(Articles, 'Articles');

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
                    Delete Article
                  </DialogTitle>
                  <div>
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this article?
                    </p>
                  </div>
                  <div className="w-full mt-4 justify-end flex gap-x-4 py-2">
                    <Button
                      disabled={disabled}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => confirmDeleteArticle()}
                    >
                      Confirm
                    </Button>
                    <Button
                      disabled={disabled}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => handleCancelDelete()}
                    >
                      Cancel
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* end of confirmation dialog */}
      <div className="flex w-full justify-between items-center mb-4">
        {/* <h1 className="text-zinc-900/40 text-2xl">Articles</h1> */}
        <Button
          onClick={handleCreateArticle}
          disabled={disabled}
          className="px-4 py-2 bg-zinc-900 text-white rounded"
        >
          Buat
        </Button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-t border-b border-zinc-200 text-xs sm:text-base">
              <th className="py-2">ID</th>
              <th className="py-2">Judul</th>
              <th className="py-2">Status</th>
              <th className="py-2">Type</th>
              <th className="py-2">Dibuat</th>
              <th className="py-2">Diperbarui</th>
              <th className="py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Articles &&
            Articles.data &&
            Articles.data.articles &&
            Articles.data.articles.length > 0 ? (
              Articles.data.articles.map((article, index) => (
                <tr
                  key={article.id}
                  // onClick={() => handleRowClick(pengajuan.id)}
                  className="border-b border-zinc-200 hover:bg-zinc-100 cursor-pointer text-xs sm:text-base text-center"
                >
                  <td className="py-2">{article.id}</td>
                  <td className="py-2">{article.title}</td>
                  <td>
                    <span
                      className={
                        (article.article_status.id === 1
                          ? 'bg-zinc-200 rounded-xl px-2 text-zinc-900'
                          : article.article_status.id === 2
                          ? 'bg-green-200 rounded-xl px-2 text-green-900'
                          : 'bg-red-200 rounded-xl px-2 text-red-900') + ' py-1'
                      }
                    >
                      {article.article_status.name}
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        (article.featured
                          ? 'bg-orange-200 rounded-xl text-orange-900'
                          : 'bg-zinc-200 rounded-xl text-zinc-900') +
                        ' px-2 py-1'
                      }
                    >
                      {article.featured ? 'Featured' : 'General'}
                    </span>
                  </td>
                  <td className="py-2">
                    {moment(article.created_at).format('YYYY-MM-DD HH:mm')}
                  </td>
                  <td className="py-2">
                    {moment(article.updated_at).format('YYYY-MM-DD HH:mm')}
                  </td>
                  <td className="flex py-2 justify-center items-center gap-x-2">
                    <Button
                      onClick={(e) => handleEditArticle(article.id)}
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-zinc-200 px-1 py-1 text-sm font-medium text-zinc-900 hover:bg-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <EditNoteOutlined fontSize="sm" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        setIsOpen(true);
                        setArticleIdToDelete(article.id);
                      }}
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-1 py-1 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <DeleteForever fontSize="sm" />
                    </Button>
                  </td>
                  {/* confirmation dialog */}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-2 text-center border-b border-zinc-200"
                >
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col content-center justify-center text-center">
          <div className="flex gap-x-4 items-center text-xs sm:text-base">
            <span className="text-sm/6 font-medium">Ukuran Halaman</span>
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
        <div className="flex items-center justify-center mt-4 text-xs sm:text-base">
          <IconButton onClick={handlePrevious} disabled={currentPage === 1}>
            <ChevronLeftOutlined />
          </IconButton>
          <span className="sm:mx-2">
            {currentPage} dari {totalPages}
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
  );
}
