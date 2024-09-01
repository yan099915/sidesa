import React, { useEffect } from 'react';
import DefaultLayout from '../../layout/defaultLayout';
import ReactPDF, { PDFViewer } from '@react-pdf/renderer';
import SuratKematian from '../../js/docs/SuratKematian';
import { useDispatch } from 'react-redux';
import { verifySession } from '../../api/actions/UsersActions';
import Slideshow from '../../components/Slideshow/Slideshow';

export default function WelcomePage() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(verifySession());
  // }, [dispatch]);

  return (
    <DefaultLayout>
      <div className="p-6 bg-white ring-1 ring-zinc-200 shadow-sm h-full text-center">
        <Slideshow />
        {/* <PDFViewer
          showToolbar={false}
          className="w-full h-80 sm:h-screen md:grow"
        >
          <SuratKematian />
        </PDFViewer> */}
      </div>
    </DefaultLayout>
  );
}
