import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserNotification,
  updateUserNotification,
} from '../../api/actions/NotificationActions';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Socket } from 'socket.io-client';

export default function DropDownNotification() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const DoGetNotifications = useSelector(
    (state) => state.ReduxState.DoGetNotifications
  );
  const UserSession = useSelector((state) => state.UsersReducers.UserSession);
  const NotificationList = useSelector(
    (state) => state.NotificationReducers.NotificationList
  );
  // const SocketConnection = useSelector(
  //   (state) => state.ReduxState.SocketConnection
  // );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGetNotification = (newLimit) => {
    const params = {
      page: page,
      limit: newLimit || limit,
    };

    dispatch(getUserNotification(params));
  };

  const handleSeeAllClick = (e) => {
    e.preventDefault(); // Prevent the default behavior
    handleGetNotification(limit + 10);
    setLimit(limit + 10);
  };

  const handleClickNotification = (notification) => {
    const reqData = {
      id: notification.id,
    };
    dispatch(updateUserNotification(reqData));
    navigate(notification.url);
  };

  // useEffect(() => {
  //   if (SocketConnection) {
  //     console.log('Socket Connection is ready');

  //     console.log(SocketConnection);
  //     SocketConnection.on('notification', (data) => {
  //       console.log('notification', data);

  //       handleGetNotification();
  //     });
  //   }
  // }, [SocketConnection]);

  useEffect(() => {
    if (DoGetNotifications) {
      dispatch({ type: 'set', DoGetNotifications: false });
      console.log(DoGetNotifications, 'Get Notification');
      // console.log('Get Notification');
      handleGetNotification();
    }
  }, [DoGetNotifications, dispatch]);

  useEffect(() => {
    if (!DoGetNotifications) {
      dispatch({ type: 'set', DoGetNotifications: true });
    }
  }, [dispatch]);

  return (
    <div className="flex relative active:opacity-80 ">
      <Menu>
        <MenuButton className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white">
          <span
            className={`flex absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              NotificationList.data && NotificationList.data.unread > 0
                ? 'inline'
                : 'hidden'
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
            className="absolute mt-4 z-999 w-80 !max-h-[83%] h-fit origin-top-right rounded-md shadow-md border border-zinc-900/5 bg-white p-1 text-sm/6  [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <MenuItem className="px-4">
              <h1 className="font-bold text-xl">Notification</h1>
            </MenuItem>
            <div className="my-1 h-px bg-zinc-900/5" />
            {NotificationList.data &&
            NotificationList.data.notifications &&
            NotificationList.data.notifications.length > 0 ? (
              NotificationList.data.notifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  onClick={() => handleClickNotification(notification)}
                  className="flex px-4 py-2 hover:bg-zinc-200 cursor-pointer"
                >
                  <div className="flex justify-between">
                    <div
                      // to={notification.url}
                      className="block text-gray-800 hover:bg-gray-100"
                    >
                      <p className="text-sm font-semibold">
                        {notification.message}
                      </p>
                      <p className=" text-xs text-gray-500">
                        {moment(notification.created_at).fromNow()}
                      </p>
                    </div>
                    <div
                      className={
                        (notification.status === 'unread'
                          ? 'block'
                          : 'hidden') +
                        ' flex flex-row justify-center items-center content-center text-center'
                      }
                    >
                      <span className="bg-blue-500 rounded-full w-2 h-2"></span>
                    </div>
                  </div>
                </MenuItem>
              ))
            ) : (
              <MenuItem className="px-4 py-2">
                <p className="text-sm text-gray-500">No notifications</p>
              </MenuItem>
            )}
            {NotificationList.data &&
            NotificationList.data.notifications &&
            NotificationList.data.notifications.length <
              NotificationList.data.count ? (
              <MenuItem className="flex flex-col w-full bg-zinc-200 rounded-md items-center content-center justify-center py-2">
                <button onClick={handleSeeAllClick} className="text-blue-500">
                  See more
                </button>
              </MenuItem>
            ) : null}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
