import React from 'react';
import { Outlet } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';

export default function Article() {
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
