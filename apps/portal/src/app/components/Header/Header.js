import React, { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DropdownUser from './DropdownUser';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownNotification from './DropDownNotification';
import EmergencyButton from './EmergencyButton';

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-999  flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none shadow-md">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>
        <div className="flex w-full justify-end content-center items-center gap-3 2xsm:gap-7">
          {/* <!-- Dark Mode Toggler --> */}
          {/* <DarkModeSwitcher /> */}
          {/* <!-- Dark Mode Toggler --> */}

          {/* <!-- Emergency Button --> */}
          <EmergencyButton />
          {/* <!-- Emergency Button --> */}

          {/* <div className="flex w-full justify-end content-center items-center gap-3 2xsm:gap-7"> */}
          {/* <!-- Notification Menu Area --> */}
          <DropdownNotification />
          {/* <!-- Notification Menu Area --> */}

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
          {/* </div> */}
        </div>
      </div>
    </header>
  );
}
