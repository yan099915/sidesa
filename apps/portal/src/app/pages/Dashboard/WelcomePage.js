import React from 'react';
import DefaultLayout from '../../layout/defaultLayout';

export default function WelcomePage() {
  return (
    <DefaultLayout>
      <div className="p-6 bg-white ring-1 ring-zinc-200 shadow-sm h-full text-center">
        Welcome to sidera portal
      </div>
    </DefaultLayout>
  );
}
