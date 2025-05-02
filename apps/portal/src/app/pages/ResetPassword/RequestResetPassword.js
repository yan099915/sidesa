import React, { useEffect, useState } from 'react';
import { Button, Field, Input, Label } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../../assets/images/logo_sidera_large.png';
import Lottie from 'lottie-react';
import { requestResetPassword } from '../../api/actions/UsersActions';
const VerifySuccess = require('../../../assets/animation/Verified.json');

export default function RequestResetPassword() {
  const dispatch = useDispatch();
  const emailId = useId();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [requesting, setRequesting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const userRequestResetPassword = useSelector(
    (state) => state.UsersReducers.RequestForgotPassword
  );

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRequestResetPassword = () => {
    if (!isValidEmail(email.trim())) {
      setErrorMessage('Format email tidak valid');
      return;
    }

    setErrorMessage('');
    setRequesting(true);

    // Simulasi atau lakukan request ke server
    console.log('Requesting password reset for:', email);
    dispatch(requestResetPassword(email.trim()));

    // Selesai
    // setRequesting(false);
  };

  useEffect(() => {
    if (userRequestResetPassword !== false) {
      console.log(userRequestResetPassword);
      setTimeout(() => {
        setRequesting(false);
        setEmail('');
        setErrorMessage('');
      }, 2000);
    } else {
      setRequesting(false);
      setErrorMessage(userRequestResetPassword);
    }
  }, [userRequestResetPassword]);

  useEffect(() => {
    setIsFormValid(isValidEmail(email.trim()));
  }, [email]);

  return (
    <div className="flex flex-row relative py-4 h-full bg-gray-100/50 items-center">
      <div className="flex flex-col mx-auto h-full w-full py-6 lg:py-12 sm:w-3/4 lg:w-2/5 gap-y-4 border bg-white items-center border-zinc-400/20">
        <div className="flex flex-col text-center content-center items-center gap-2">
          <img src={Logo} alt="" className="w-24" />
          <p className="text-xs lg:text-base">Sistem Informasi Desa Rawang</p>
          <h2 className="sm:text-2xl leading-none font-semibold">
            Reset Sandi Akun
          </h2>
        </div>
        {userRequestResetPassword &&
        userRequestResetPassword.error === false ? (
          <div className="flex flex-col justify-center items-center px-8">
            <Lottie
              speed={2.5}
              animationData={VerifySuccess}
              height={50}
              width={50}
              className="w-2/5 sm:w-1/4"
            />
            <p className="text-sm text-center">
              Permintaan reset sandi berhasil dikirim, jika email terdaftar,
              anda akan menerima pesan tautan pada kotak pesan.
            </p>
          </div>
        ) : (
          <Field className="flex flex-col gap-4 px-8 w-full md:w-3/4 lg:w-3/4">
            <div>
              <Label
                htmlFor={emailId}
                className="text-sm font-medium leading-normal text-gray-900"
              >
                Email
              </Label>
              <Input
                id={emailId}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
                    focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
              />
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}

            <Button
              onClick={handleRequestResetPassword}
              disabled={requesting || !isFormValid}
              className={`rounded py-2 px-4 text-sm text-white ${
                isFormValid && !requesting
                  ? 'bg-zinc-900 data-[hover]:bg-zinc-900/80 data-[active]:bg-zinc-900/50'
                  : 'bg-zinc-400 cursor-not-allowed'
              }`}
            >
              Reset Sandi
            </Button>
            {requesting}
          </Field>
        )}
        <div className=" text-center">
          <p className="text-sm text-gray-700">
            <Link to="/login" className="text-blue-500 hover:underline">
              Kembali Ke Halaman Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
