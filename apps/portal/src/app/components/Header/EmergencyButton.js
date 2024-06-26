import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import CrisisAlertOutlinedIcon from '@mui/icons-material/CrisisAlertOutlined';
import {
  ArrowLeftEndOnRectangleIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function EmergencyButton() {
  const [notifying, setNotifying] = useState(true);

  return (
    <div className="flex relative active:opacity-80  ">
      <Button className="relative has-tooltip flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white">
        <span className="tooltip rounded text-[10px] shadow-lg mt-14 leading-none py-[2px] px-1 bg-black text-white">
          Emergency
        </span>
        <div className="flex items-center justify-center h-7 w-7 rounded-full overflow-hidden">
          <CrisisAlertOutlinedIcon fontSize="xs" className="text-red-500" />
        </div>
      </Button>
    </div>
  );
}
