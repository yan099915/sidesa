import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { CrisisAlertOutlined } from '@mui/icons-material';

const audio = new Audio('../../../assets/audio/fin.wav');

export default function EmergencyAlert() {
  const isOpen = useSelector((state) => state.ReduxState.Emergency);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      audio
        .play()
        .catch((error) => console.error('Error playing audio:', error));
      audio.loop = true;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isOpen]);

  const handleCloseDialog = () => {
    dispatch({ type: 'set', Emergency: false });
    navigate('/emergency');
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-9999 focus:outline-none"
        onClose={handleCloseDialog} // Memperbaiki pemanggilan fungsi di sini
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-zinc-900/40">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel className="max-w-lg space-y-6 bg-white p-12 data-[closed]:scale-95 data-[closed]:opacity-0">
              <DialogTitle
                as="h3"
                className="text-xl text-red-500 font-bold text-center"
              >
                Pesan Darurat baru saja diterima !!!
              </DialogTitle>
              <div className="flex flex-col text-justify items-center gap-4">
                <CrisisAlertOutlined className="text-red-500 animate-ping" />
                <p className="text-sm text-gray-500">
                  Status darurat dikirimkan oleh warga segera cek !
                </p>
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={handleCloseDialog} // Menambahkan aksi pada tombol
                  className="inline-flex items-center gap-2 rounded-md bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-blue-700"
                >
                  Lihat
                </Button>
                <Button
                  onClick={handleCloseDialog} // Menambahkan aksi pada tombol
                  className="inline-flex items-center gap-2 rounded-md bg-zinc-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-zinc-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-zinc-700"
                >
                  Tutup
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
