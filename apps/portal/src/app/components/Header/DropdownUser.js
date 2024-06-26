import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import UserOne from '../../../assets/images/users.jpeg';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../api/actions/UsersActions';
import { useEffect, useState } from 'react';

export default function DropDownUser() {
  const UserSession = useSelector((state) => state.UsersReducers.UserSession);
  const UserLogout = useSelector((state) => state.UsersReducers.UserLogout);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log('Logging out');
    setDisabled(true);
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (UserLogout) {
      dispatch({
        type: 'set',
        LoginStatus: false,
      });

      setTimeout(() => {
        setDisabled(false);
        window.location.reload();
      }, 1000);
    }
  }, [UserLogout]);

  return (
    <div className="flex relative active:opacity-80 ">
      {/* <div className="absolute w-3 h-3 rounded-full bg-red-600 right-0 animate-pulse"></div> */}
      <div className="absolute w-3 h-3 rounded-full bg-zinc-600/10 right-0 bottom-1 ring-2 ring-white bg-zinc-200">
        <ChevronDownIcon className="w-3 h-3 !stroke-[20px] text-black font-extrabold" />
      </div>
      <Menu>
        <MenuButton className="inline-flex items-center rounded-full font-semibold text-white shadow-inner shadow-white/10 border-[0.5px] border-stroke">
          <div className="h-12 w-12 rounded-full overflow-hidden ">
            <img src={UserOne} alt="User" />
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
            className="absolute text-center mt-2 z-999 w-52 origin-top-right rounded-md shadow-md border border-zinc-900/5 bg-white p-1 text-sm/6  [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <span className="font-bold">
              {UserSession && UserSession.data.email
                ? UserSession.data.email
                : 'Undefined'}
            </span>
            <div className="my-1 h-px bg-zinc-900/5" />
            <MenuItem>
              <button
                onClick={handleLogout}
                disabled={disabled}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                <ArrowLeftEndOnRectangleIcon className="w-5 text-zinc-500" />
                Logout
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
