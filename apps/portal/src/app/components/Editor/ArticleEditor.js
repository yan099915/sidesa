import { useState, useEffect, useRef, Fragment } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  Essentials,
  FindAndReplace,
  FontSize,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Table,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import './ArticleEditor.css';

import { BeatLoader } from 'react-spinners';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { AddAPhoto, CheckBoxTwoTone } from '@mui/icons-material';
import axios from '../../api/config/index';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getThumbnails,
  updateArticle,
  uploadArticleThumbnail,
} from '../../api/actions/ArticleActions';
import toast from 'react-hot-toast';
const DOMAIN = process.env.NX_PUBLIC_DOMAIN;
export default function ArticleEditor() {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [editorData, setEditorData] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState('');
  const [uploadedThumbnail, setUploadedThumbnail] = useState(null);
  const [thumbnailLimit, seThumbnailLimit] = useState(10);
  const [disabledUploadButton, setDisabledUploadButton] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    thumbnail: '',
    status: '',
    content: '',
    featured: '',
  });

  const articleType = [
    {
      id: 0,
      name: 'General',
    },
    {
      id: 1,
      name: 'Featured',
    },
  ];

  const ArticleDetails = useSelector(
    (state) => state.ArticlesReducers.GetArticleDetails
  );
  const ArticleStatus = useSelector(
    (state) => state.ArticlesReducers.GetArticleStatus
  );
  const UploadThumbnail = useSelector(
    (state) => state.ArticlesReducers.UploadArticleThumbnail
  );
  const errorUploadThumbnail = useSelector(
    (state) => state.ArticlesReducers.errorUploadArticleThumbnail
  );
  const ArticleThumbnails = useSelector(
    (state) => state.ArticlesReducers.GetThumbnails
  );
  const errorGetThumbnails = useSelector(
    (state) => state.ArticlesReducers.errorGetThumbnails
  );

  const UpdateArticleData = useSelector(
    (state) => state.ArticlesReducers.UpdateArticle
  );
  const errorUpdateArticle = useSelector(
    (state) => state.ArticlesReducers.errorUpdateArticle
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSaveEdit = () => {
    setDisabled(true);

    const reqData = formData;
    reqData.status = formData.status.id;
    reqData.featured = formData.featured.id || 0;

    toast.loading('Updating article...', {
      id: 'update-article',
    });

    console.log(reqData, 'formData editor');
    dispatch(updateArticle(reqData));
  };

  const handleCancel = () => {
    navigate(-1);
    dispatch({
      type: 'GET_ARTICLE_DETAILS',
      payload: { data: false, errorMessage: false },
    });
  };

  const handleContentChange = (event, editor) => {
    setFormData({ ...formData, content: editor.getData() });
  };

  const handleSelectImage = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadThumbnail = () => {
    setDisabledUploadButton(true);
    const formData = new FormData();

    console.log(uploadedThumbnail, 'fileInputRef.current.files[0]');
    formData.append('article_thumbnails', uploadedThumbnail);

    toast.loading('Uploading thumbnail...', {
      id: 'uploading-thumbnail',
    });
    dispatch(uploadArticleThumbnail(formData));
  };

  const HandleGetThumbnails = (newLimit) => {
    const params = {
      limit: newLimit || thumbnailLimit,
    };
    dispatch(getThumbnails(params));
  };

  const handleStatusChange = (value) => {
    setFormData({ ...formData, status: value });
  };

  const handleFeaturedChange = (value) => {
    setFormData({ ...formData, featured: value });
  };

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleSelectThumbnail = () => {
    HandleGetThumbnails();
    setIsOpen(true);
  };

  const handleSelectedThumbnail = () => {
    setFormData({ ...formData, thumbnail: selectedThumbnail });
    setIsOpen(false);
  };

  const handleCancelSelectThumbnail = () => {
    setIsOpen(false);
    setSelectedThumbnail(ArticleDetails.data.thumbnail || '');
  };

  const uploadPlugin = (editor) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return {
        upload: () => {
          return loader.file.then((file) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append('article_image', file);
              formData.append('article_id', ArticleDetails.data.id);

              axios
                .post('/article-image', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                })
                .then((response) => {
                  if (response.data) {
                    const imageUrl = `${DOMAIN}/assets/files/article_image/${response.data.url}`;
                    setImageUrls((prevUrls) => [...prevUrls, imageUrl]);
                    resolve({
                      default: imageUrl,
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                  reject(error);
                });
            });
          });
        },
      };
    };
  };

  useEffect(() => {
    if (ArticleDetails && ArticleDetails.data) {
      setFormData({
        id: ArticleDetails.data.id || '',
        title: ArticleDetails.data.title || '',
        thumbnail: ArticleDetails.data.thumbnail || '',
        status: ArticleDetails.data.article_status || '',
        content: ArticleDetails.data.content || '',
        featured: ArticleDetails.data.featured
          ? { id: 1, name: 'Featured' }
          : { id: 0, name: 'General' },
      });
      setSelectedThumbnail(ArticleDetails.data.thumbnail || '');
    }
  }, [ArticleDetails]);

  useEffect(() => {
    if (UpdateArticleData) {
      toast.success('Article updated successfully', {
        id: 'update-article',
      });
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    }

    if (errorUpdateArticle) {
      toast.error(errorUpdateArticle, {
        id: 'update-article',
      });
    }

    setTimeout(() => {
      dispatch({
        type: 'UPDATE_ARTICLE',
        payload: { data: false, errorMessage: false },
      });
      setDisabled(false);
    }, 1000);
  }, [UpdateArticleData, errorUpdateArticle]);

  useEffect(() => {
    // handle upload thumbnail
    if (UploadThumbnail && UploadThumbnail.data) {
      setDisabledUploadButton(false);
      setSelectedImage(null);
      dispatch({
        type: 'GET_THUMBNAILS',
        payload: { data: false, errorMessage: false },
      });
      HandleGetThumbnails();
      toast.success(UploadThumbnail.message, {
        id: 'uploading-thumbnail',
      });
    }

    if (errorUploadThumbnail) {
      setDisabledUploadButton(false);
      toast.error(errorUploadThumbnail, {
        id: 'uploading-thumbnail',
      });
    }

    setTimeout(() => {
      dispatch({
        type: 'UPLOAD_ARTICLE_THUMBNAIL',
        payload: { data: false, errorMessage: false },
      });
    }, 1000);
  }, [UploadThumbnail, errorUploadThumbnail]);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'findAndReplace',
        'selectAll',
        '|',
        'heading',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'code',
        'removeFormat',
        '|',
        'specialCharacters',
        'horizontalLine',
        'link',
        'insertImageViaUrl',
        'mediaEmbed',
        'insertTable',
        'highlight',
        'blockQuote',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'outdent',
        'indent',
        '|',
        'accessibilityHelp',
      ],
      shouldNotGroupWhenFull: false,
    },
    extraPlugins: [uploadPlugin],
    plugins: [
      AccessibilityHelp,
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      CloudServices,
      Code,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Heading,
      Highlight,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      Paragraph,
      PasteFromOffice,
      RemoveFormat,
      SelectAll,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Table,
      TableCellProperties,
      TableProperties,
      TableToolbar,
      TextTransformation,
      Underline,
      Undo,
    ],
    balloonToolbar: [
      'bold',
      'italic',
      '|',
      'link',
      '|',
      'bulletedList',
      'numberedList',
    ],
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true,
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ],
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage',
      ],
    },
    initialData: formData.content,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    menuBar: {
      isVisible: true,
    },
    placeholder: 'Type or paste your content here!',
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties',
      ],
    },
  };

  console.log(formData, 'formData');

  return (
    <div className="flex flex-col gap-4">
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
                {selectedImage ? (
                  <DialogPanel className="flex flex-col items-center w-full transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h2"
                      className="text-lg text-start font-medium leading-6 text-gray-900 !px-0"
                    >
                      Upload Thumbnail
                    </DialogTitle>
                    <div className="flex justify-center mt-2 w-full">
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="max-w-[30%] rounded-md"
                      />
                    </div>
                    <div className="w-full mt-4 justify-center flex gap-x-4 py-2">
                      <Button
                        disabled={disabled}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => handleUploadThumbnail()}
                      >
                        Upload
                      </Button>
                      <Button
                        disabled={disabled}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => setSelectedImage(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </DialogPanel>
                ) : (
                  <DialogPanel className="w-full  transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle
                      as="h2"
                      className="text-lg text-start font-medium leading-6 text-gray-900 !px-0"
                    >
                      Select Thumbnail
                    </DialogTitle>
                    {ArticleThumbnails &&
                    ArticleThumbnails.data &&
                    ArticleThumbnails.data.thumbnails &&
                    ArticleThumbnails.data.thumbnails.length > 0 ? (
                      <div className=" w-full mt-2 border border-zinc-900/20 h-[50%] max-h-[50%] grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-7 gap-4 overflow-y-auto">
                        {ArticleThumbnails.data.thumbnails.map((thumbnail) => (
                          <div
                            key={thumbnail.id}
                            onClick={() => setSelectedThumbnail(thumbnail.id)}
                            className="relative flex h-24 justify-center items-center"
                          >
                            {thumbnail.id === selectedThumbnail && (
                              <CheckBoxTwoTone
                                className={
                                  'text-blue-500 right-2 top-2 absolute'
                                }
                              />
                            )}
                            <img
                              src={`https://sidera.my.id/assets/files/article_thumbnails/${thumbnail.name}`}
                              className={
                                (thumbnail.id === selectedThumbnail
                                  ? 'border-2 border-blue-500'
                                  : '') + ' w-full max-h-20 object-cover'
                              }
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full mt-2 border border-zinc-900/20 max-h-[50%]">
                        {errorGetThumbnails ? (
                          <div>
                            <p className="text-center">
                              Failed to load thumbnails
                            </p>
                            <Button
                              onClick={() => getThumbnails()}
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-2 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                              Retry
                            </Button>
                          </div>
                        ) : (
                          <p className="text-center">No thumbnails available</p>
                        )}
                      </div>
                    )}
                    <div className="flex w-full mt-4 justify-between">
                      {ArticleThumbnails &&
                      ArticleThumbnails.data &&
                      ArticleThumbnails.data.totalItems > thumbnailLimit ? (
                        <Button
                          onClick={() => {
                            HandleGetThumbnails(thumbnailLimit + 10);
                            seThumbnailLimit(thumbnailLimit + 10);
                          }}
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-2 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Load more
                        </Button>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="flex w-full mt-4 justify-between">
                      <Button
                        onClick={handleSelectImage}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-2 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        <AddAPhoto />
                      </Button>
                      <Input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                      />
                      <div className="flex gap-x-4">
                        <Button
                          disabled={disabled}
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => handleSelectedThumbnail()}
                        >
                          Save
                        </Button>
                        <Button
                          disabled={disabled}
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          onClick={() => handleCancelSelectThumbnail()}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogPanel>
                )}
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* end of confirmation dialog */}
      <h1 className="text-2xl font-bold">Edit Artikel</h1>
      <Field className="text-start p-[1px]">
        <Label>
          Judul <span className="text-xs text-red-500">*wajib</span>
        </Label>
        <Input
          maxLength={60}
          value={formData.title}
          onChange={(e) => handleTitleChange(e)}
          className="disabled:bg-zinc-900/20 block w-full ring-1 ring-zinc-900/20 py-1.5 px-3 text-sm/6 focus:ring-0 focus:outline-none data-[focus]:outline-1 data-[focus]:-outline-offset-1 data-[focus]:outline-blue-500"
        />
      </Field>
      <Field className="text-start p-[1px]">
        <Label>Status</Label>
        <Listbox
          value={formData?.status}
          onChange={(value) => handleStatusChange(value)}
          disabled={disabled}
        >
          <ListboxButton className="relative mt-3 block w-full ring-1 ring-zinc-900/20 py-1.5 px-3 text-sm/6 disabled:bg-zinc-900/20 outline-zinc-900">
            {formData.status && formData.status.name
              ? formData.status.name
              : formData.status || `Pilih status artikel`}
            <ChevronDownIcon
              className="pointer-events-none absolute top-2.5 right-2.5 w-4 fill-gray-900/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {ArticleStatus.data &&
              ArticleStatus.data.map((option) => (
                <ListboxOption
                  key={option.id}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                      active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
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
                        {option.name}
                      </span>
                    </>
                  )}
                </ListboxOption>
              ))}
          </ListboxOptions>
        </Listbox>
      </Field>
      <Field className="text-start p-[1px]">
        <Label>Tipe</Label>
        <Listbox
          value={formData?.featured}
          onChange={(value) => handleFeaturedChange(value)}
          disabled={disabled}
        >
          <ListboxButton className="relative mt-3 block w-full ring-1 ring-zinc-900/20 py-1.5 px-3 text-sm/6 disabled:bg-zinc-900/20 outline-zinc-900">
            {formData.featured && formData.featured.name
              ? formData.featured.name
              : formData.featured || `Pilih tipe artikel`}
            <ChevronDownIcon
              className="pointer-events-none absolute top-2.5 right-2.5 w-4 fill-gray-900/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {articleType &&
              articleType.map((option) => (
                <ListboxOption
                  key={option.id}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                      active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
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
                        {option.name}
                      </span>
                    </>
                  )}
                </ListboxOption>
              ))}
          </ListboxOptions>
        </Listbox>
      </Field>
      <Field className="flex flex-col text-start p-[1px]">
        <Label>Thumbnail</Label>
        <Button
          onClick={(e) => handleSelectThumbnail()}
          className="inline-flex text-center items-center justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Select Thumbnail
        </Button>
      </Field>
      <Field className="text-start">
        <Label>Konten</Label>
        <div
          className="editor-container editor-container_classic-editor"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            <div ref={editorRef}>
              {isLayoutReady && (
                <CKEditor
                  // onReady={(editor) => {
                  //   editorRef.current = editor;
                  //   editor.model.document.on('change:data', (event, editor) => {
                  //     console.log(event, 'data editor change');
                  //   });
                  // }}

                  onChange={(event, editor) => {
                    // setEditorData(editor.getData());
                    handleContentChange(event, editor);
                  }}
                  editor={ClassicEditor}
                  config={editorConfig}
                />
              )}
            </div>
          </div>
        </div>
      </Field>
      <div className="flex gap-x-4">
        <Button
          onClick={handleSaveEdit}
          disabled={disabled}
          className="inline-flex text-center items-center justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          {disabled ? (
            <BeatLoader color="#848484" margin={3} size={6} />
          ) : (
            <>
              {/* <CheckIcon className="block sm:hidden h-5 w-5" />{' '} */}
              <p className="block">Simpan</p>
            </>
          )}
        </Button>
        <Button
          onClick={handleCancel}
          disabled={disabled}
          className="inline-flex text-center items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          {/* <CheckIcon className="block sm:hidden h-5 w-5" /> */}
          <p className="block">Batal</p>
        </Button>
      </div>
    </div>
  );
}
