import React from 'react';
import { Outlet } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';

export default function Emergency() {
  return (
    <DefaultLayout>
      <div className="p-6">
        <div className="p-6 bg-white ring-1 ring-zinc-900/5 mb-4 bg-white shadow-sm">
          <Outlet />
        </div>
      </div>
    </DefaultLayout>
  );
}
