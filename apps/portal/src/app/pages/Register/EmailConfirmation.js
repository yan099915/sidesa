import { Button } from '@headlessui/react';
import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { resendVerification } from '../../api/actions';
import { useDispatch, useSelector } from 'react-redux';

const animationData = require('../../../assets/animation/EmailSent.json');

const EmailConfirmation = () => {
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [resendDelay, setResendDelay] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedEmail = localStorage.getItem('unauth');

  const errorResendVerification = useSelector(
    (state) => state.UsersReducers.errorResendVerification
  );

  const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'secretkey');
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  useEffect(() => {
    if (storedEmail) {
      const decryptedEmail = decryptData(storedEmail);
      setRegisteredEmail(decryptedEmail);
      setResendDelay(true);
      startTimer();
    } else {
      navigate('/register'); // Jika tidak ada email yang tersimpan, kembalikan ke halaman registrasi
    }
  }, [navigate]);

  useEffect(() => {
    if (resendDelay) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendDelay]);

  const startTimer = () => {
    setTimeLeft(60);
    setTimeout(() => {
      setResendDelay(false);
      // localStorage.removeItem('unauth');
    }, 60000);
  };

  const handleResendEmail = () => {
    const decryptedEmail = decryptData(storedEmail);
    if (!resendDelay) {
      setResendDelay(true);
      startTimer();
      // Logic to resend the email goes here
      dispatch(resendVerification(decryptedEmail));
    }
  };

  useEffect(() => {
    if (errorResendVerification) {
      if (errorResendVerification.data && errorResendVerification.data.active) {
        localStorage.removeItem('unauth');
        navigate('/login');
      }
    }
  }, [errorResendVerification]);

  return (
    <div className="flex flex-col relative h-full p-8  bg-gray-100/50 items-center">
      <div className="flex flex-col h-full w-full py-24 sm:w-3/4 lg:w-2/5 gap-y-10 border bg-white items-center border-zinc-400/20">
        <div className="flex flex-col text-center gap-4 px-4 items-center">
          <Lottie
            speed={2.5}
            animationData={animationData}
            height={50}
            width={50}
            className="w-2/5 sm:w-1/4"
          />
          <h2 className="text-4xl font-semibold ">Verify Email</h2>
          <p className="text-xs lg:text-base text-justify">
            Email verifikasi telah dikirimkan ke {registeredEmail}, silahkan cek
            email anda dan klik link verifikasi yang telah kami kirimkan.
          </p>
          <p className="text-xs lg:text-base text-justify">
            Tidak menerima email verifikasi? Cek folder spam pada email anda
            atau kirim ulang email verifikasi.
          </p>
          <Button
            onClick={handleResendEmail}
            disabled={resendDelay}
            className={`rounded bg-zinc-900 py-2 px-4 text-sm text-white ${
              resendDelay
                ? 'opacity-50 cursor-not-allowed'
                : 'data-[hover]:bg-zinc-900/80 data-[active]:bg-zinc-900/50'
            }`}
          >
            {resendDelay
              ? `Kirim Ulang Email (${Math.floor(timeLeft / 60)}:${
                  timeLeft % 60 < 10 ? '0' : ''
                }${timeLeft % 60})`
              : 'Kirim Ulang Email'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
