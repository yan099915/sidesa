import React from 'react';
import DefaultLayout from '../../layout/defaultLayout';
import { Outlet } from 'react-router-dom';

export default function Announcement() {
  return (
    <DefaultLayout>
      <div className="p-6 bg-white ring-1 ring-zinc-200 shadow-sm h-full text-center">
        <div>
          <Outlet />
        </div>
      </div>
    </DefaultLayout>
  );
}
