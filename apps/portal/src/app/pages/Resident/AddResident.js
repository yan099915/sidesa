import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AddResident() {
  const navigate = useNavigate();
  const UserSession = useSelector((state) => state.UsersReducers.UserSession);

  const handleProfileClick = () => {
    // Ganti '/profile' dengan path yang sesuai untuk halaman profil
    navigate('/profile');
  };

  const handleBatalClick = () => {
    // Ganti '/pengajuan' dengan path yang sesuai untuk halaman pengajuan
    navigate('/pengajuan');
  };

  return (
    <div>
      {UserSession && UserSession.data.verified ? (
        <div>
          {/* Form Pengajuan */}
          <h2 className="text-xl font-semibold mb-4">Form Pengajuan</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Nama</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Nama"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tanggal</label>
              <input type="date" className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Deskripsi</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                placeholder="Deskripsi"
              />
            </div>
            <div className="inline-flex space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleBatalClick}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          {/* Peringatan dan Tombol untuk Lengkapi Data Pribadi */}
          <div
            className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg"
            role="alert"
          >
            <span className="font-medium">Akun Anda belum terverifikasi!</span>{' '}
            Silakan lengkapi data pribadi Anda.
          </div>
          <button
            type="button"
            onClick={handleProfileClick}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Lengkapi Data Pribadi
          </button>
        </div>
      )}
    </div>
  );
}
