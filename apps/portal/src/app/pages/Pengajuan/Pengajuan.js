import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import DefaultLayout from '../../layout/defaultLayout';

const Pengajuan = () => {
  const location = useLocation();
  const isAdmin = true; // Gantilah dengan logika sesungguhnya untuk mengecek apakah user adalah admin

  const menuItems = [
    {
      key: 'riwayat',
      label: 'Riwayat Pengajuan',
      path: '',
    },
  ];

  if (isAdmin) {
    menuItems.unshift({
      key: 'daftar',
      label: 'Daftar Pengajuan',
      path: 'daftar',
    });
  }

  const isPathActive = (path) => {
    if (path === '' && location.pathname === '/request') {
      return true;
    }
    return location.pathname.includes(path) && path !== '';
  };

  // Pengecekan apakah child route === 'form'
  const isFormRoute = location.pathname.includes('form');

  return (
    <DefaultLayout>
      <div className="p-6">
        {!isFormRoute && (
          <div className="ring-1 ring-zinc-900/5 mb-4 bg-white shadow-sm">
            <nav className="flex space-x-4">
              {menuItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className={() =>
                    `relative py-4 px-4 font-semibold ${
                      isPathActive(item.path)
                        ? 'text-zinc-900 border-b-2 border-zinc-500 pb-[calc(0.5rem-2px)]'
                        : 'text-gray-700 pb-2 hover:bg-zinc-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
        <div className="p-6 bg-white ring-1 ring-zinc-900/5 mb-4 bg-white shadow-sm">
          <Outlet />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Pengajuan;
