import { useState, useEffect, useRef, Fragment } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  Autosave,
  Bold,
  Essentials,
  Italic,
  List,
  Paragraph,
  SelectAll,
  Underline,
  Undo,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import './AnnouncementEditor.css';
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
  TransitionChild,
  Input,
} from '@headlessui/react';
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
import { updateAnnouncement } from '../../api/actions/AnnouncementActions';
const DOMAIN = process.env.NX_PUBLIC_DOMAIN;

export default function AnnouncementEditor() {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    thumbnail: '',
    status: '',
    content: '',
    type: '',
  });

  const AnnouncementDetails = useSelector(
    (state) => state.AnnouncementReducers.GetAnnouncementDetails
  );
  const AnnouncementStatus = useSelector(
    (state) => state.AnnouncementReducers.GetAnnouncementStatus
  );
  const AnnouncementType = useSelector(
    (state) => state.AnnouncementReducers.GetAnnouncementType
  );

  const UpdateAnnouncementData = useSelector(
    (state) => state.AnnouncementReducers.UpdateAnnouncement
  );
  const errorUpdateAnnouncementData = useSelector(
    (state) => state.AnnouncementReducers.errorUpdateAnnouncement
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSaveEdit = () => {
    setDisabled(true);

    const reqData = formData;
    reqData.status = formData.status.id;
    reqData.type = formData.type.id;

    toast.loading('Memperbarui pengumuman...', {
      id: 'update-announcement',
    });

    console.log(reqData, 'formData editor');
    dispatch(updateAnnouncement(reqData));
  };

  const handleCancel = () => {
    navigate(-1);
    dispatch({
      type: 'GET_ANNOUNCEMENT_DETAILS',
      payload: { data: false, errorMessage: false },
    });
  };

  const handleContentChange = (event, editor) => {
    setFormData({ ...formData, content: editor.getData() });
  };

  const handleStatusChange = (value) => {
    setFormData({ ...formData, status: value });
  };

  const handleTypeChange = (value) => {
    setFormData({ ...formData, type: value });
  };

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  useEffect(() => {
    if (AnnouncementDetails && AnnouncementDetails.data) {
      setFormData({
        id: AnnouncementDetails.data.id || '',
        title: AnnouncementDetails.data.title || '',
        status: AnnouncementDetails.data.announcement_status || '',
        content: AnnouncementDetails.data.content || '',
        type: AnnouncementDetails.data.announcement_type || '',
      });
    }
  }, [AnnouncementDetails]);

  useEffect(() => {
    if (UpdateAnnouncementData) {
      toast.success('Article updated successfully', {
        id: 'update-announcement',
      });
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    }

    if (errorUpdateAnnouncementData) {
      toast.error(errorUpdateAnnouncementData, {
        id: 'update-announcement',
      });
    }

    setTimeout(() => {
      dispatch({
        type: 'UPDATE_ANNOUNCEMENT',
        payload: { data: false, errorMessage: false },
      });
      setDisabled(false);
    }, 1000);
  }, [UpdateAnnouncementData, errorUpdateAnnouncementData]);

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
        'selectAll',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'accessibilityHelp',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      Autosave,
      Bold,
      Essentials,
      Italic,
      List,
      Paragraph,
      SelectAll,
      Underline,
      Undo,
    ],
    initialData: formData.content,
    placeholder: 'Type or paste your content here!',
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Edit Pengumuman</h1>
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
              : formData.status || `Pilih status pengumuman`}
            <ChevronDownIcon
              className="pointer-events-none absolute top-2.5 right-2.5 w-4 fill-gray-900/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {AnnouncementStatus.data &&
              AnnouncementStatus.data.map((option) => (
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
        <Label>Jenis</Label>
        <Listbox
          value={formData?.type}
          onChange={(value) => handleTypeChange(value)}
          disabled={disabled}
        >
          <ListboxButton className="relative mt-3 block w-full ring-1 ring-zinc-900/20 py-1.5 px-3 text-sm/6 disabled:bg-zinc-900/20 outline-zinc-900">
            {formData.type && formData.type.name
              ? formData.type.name
              : formData.type || `Pilih status pengumuman`}
            <ChevronDownIcon
              className="pointer-events-none absolute top-2.5 right-2.5 w-4 fill-gray-900/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {AnnouncementType.data &&
              AnnouncementType.data.map((option) => (
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
      <Field className="text-start">
        <Label>Konten</Label>
        {/* editor */}
        <div
          className="editor-container editor-container_classic-editor"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            <div ref={editorRef}>
              {isLayoutReady && (
                <CKEditor
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
