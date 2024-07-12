import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function DropDownNotification() {
  const [notifying, setNotifying] = useState(true);

  return (
    <div className="flex relative active:opacity-80 ">
      {/* <div className="absolute w-2 h-2 rounded-full bg-red-600 right-0  animate-pulse"></div> */}
      <Menu>
        <MenuButton className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white">
          <span
            className={`flex absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? 'hidden' : 'inline'
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full  animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>
          <div className="flex items-center justify-center h-7 w-7 rounded-full overflow-hidden">
            <BellIcon className="w-5 h-5 text-zinc-900/80 hover:text-blue-900" />
          </div>
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="absolute mt-4 z-999 w-80 origin-top-right rounded-md shadow-md border border-zinc-900/5 bg-white p-1 text-sm/6  [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <MenuItem className="px-4">
              <h1 className="font-bold">Notification</h1>
            </MenuItem>
            <div className="my-1 h-px bg-zinc-900/5" />
            <MenuItem className="px-4">
              <p>notifikasi surat sudah selesai</p>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
