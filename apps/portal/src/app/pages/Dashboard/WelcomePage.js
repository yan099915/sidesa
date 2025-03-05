import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Slideshow from '../../components/Slideshow/Slideshow';
import DefaultLayout from '../../layout/DefaultLayout';

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
