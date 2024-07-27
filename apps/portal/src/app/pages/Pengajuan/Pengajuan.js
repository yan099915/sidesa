import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import DefaultLayout from '../../layout/defaultLayout';
import { useSelector } from 'react-redux';

const Pengajuan = () => {
  const location = useLocation();
  const isAdmin = useSelector((state) => state.ReduxState.IsAdmin);

  const menuItems = [
    {
      key: 'riwayat',
      label: 'Riwayat Pengajuan',
      path: '',
    },
  ];

  if (isAdmin) {
    menuItems.unshift({
      key: 'list',
      label: 'Daftar Pengajuan',
      path: 'list',
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
  const isProcessRoute = location.pathname.includes('process');
  const isDetailsRoute = location.pathname.includes('details');

  return (
    <DefaultLayout>
      <div className="p-6">
        {!isFormRoute && !isProcessRoute && !isDetailsRoute && (
          <div className="ring-1 ring-zinc-900/5 mb-4 bg-white shadow-sm">
            <nav className="flex space-x-4">
              {menuItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className={() =>
                    `relative py-4 px-4 font-semibold text-xs sm:text-base ${
                      isPathActive(item.path)
                        ? 'text-zinc-900 border-b-2 border-zinc-500 pb-[calc(0.5rem-2px)]'
                        : 'text-gray-700 pb-2 hover:bg-zinc-100 '
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
