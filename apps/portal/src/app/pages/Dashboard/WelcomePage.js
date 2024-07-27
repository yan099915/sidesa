import React from 'react';
import DefaultLayout from '../../layout/defaultLayout';
import ReactPDF from '@react-pdf/renderer';
import MyDocument from '../../js/docs';

export default function WelcomePage() {
  const tombol = () => {
    ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
  };
  return (
    <DefaultLayout>
      <div className="p-6 bg-white ring-1 ring-zinc-200 shadow-sm h-full text-center">
        Welcome to sidera portal
      </div>
    </DefaultLayout>
  );
}
