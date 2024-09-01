import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Logo from '../../../assets/images/logo_sidera_large.png';

import {
  Groups2Outlined,
  RequestQuoteOutlined,
  EmergencyShareOutlined,
  AssessmentOutlined,
  PersonOutlineOutlined,
  HomeOutlined,
  ArticleOutlined,
  HistoryEduOutlined,
  CampaignOutlined,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

const version = process.env.NX_PUBLIC_APP_VERSION;

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const [loading, setLoading] = useState(true);
  const UserMenu = useSelector((state) => state.UsersReducers.UserMenu);

  const menuMap = {
    beranda: { path: '/', icon: <HomeOutlined className="h-5 w-5" /> },
    pengajuan: {
      path: '/request',
      icon: <RequestQuoteOutlined className="h-5 w-5" />,
    },
    profil: {
      path: '/profile',
      icon: <PersonOutlineOutlined className="h-5 w-5" />,
    },
    laporan: {
      path: '/report',
      icon: <AssessmentOutlined className="h-5 w-5" />,
    },
    darurat: {
      path: '/emergency',
      icon: <EmergencyShareOutlined className="h-5 w-5" />,
    },
    penduduk: {
      path: '/resident',
      icon: <Groups2Outlined className="h-5 w-5" />,
    },
    artikel: {
      path: '/article',
      icon: <ArticleOutlined className="h-5 w-5" />,
    },
    pengumuman: {
      path: '/announcement',
      icon: <CampaignOutlined className="h-5 w-5" />,
    },
    'tanda tangan': {
      path: '/sign',
      icon: <HistoryEduOutlined className="h-5 w-5" />,
    },
  };

  const menuItems =
    UserMenu.data?.menu?.map((item) => ({
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      path: menuMap[item.name]?.path,
      icon: menuMap[item.name]?.icon,
    })) || [];

  useEffect(() => {
    if (UserMenu) {
      setLoading(false);
    }
  }, [UserMenu]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999  flex h-screen w-72.5 flex-col overflow-y-hidden bg-white shadow-md duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-6 px-6 py-4 lg:py-4">
        <NavLink
          to="/"
          className="flex w-full items-center content-center font-semibold gap-x-2 justify-center"
        >
          <img src={Logo} alt="Logo" className="w-28" />
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="flex block lg:hidden justify-center"
        >
          <ArrowBackIosIcon fontSize="xs" />
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex gap-3 block my-2 py-2.5 pl-4 pr-12 rounded-md transition-colors font-medium bg-zinc-200 animate-pulse"
                  >
                    <div className="h-5 w-5 bg-zinc-300 rounded"></div>
                    <div className="h-5 w-[80px] bg-zinc-300 rounded"></div>
                  </div>
                ))
              : menuItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex gap-3 block py-2.5 pl-4 pr-12 rounded-md transition-colors font-medium ${
                        isActive
                          ? 'bg-black text-white'
                          : 'text-zinc-900/80 hover:bg-gray-200'
                      }`
                    }
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
          </div>
        </nav>
      </div>
      <div className=" px-4 absolute z-99999 bottom-2">
        <p>Dev v{version}</p>
      </div>
    </aside>
  );
}
