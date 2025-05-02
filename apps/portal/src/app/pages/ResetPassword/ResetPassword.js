import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Checkbox, Field, Input, Label } from '@headlessui/react';
import { Check } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../api/actions';
import encryptData from '../../js/encryptData';
import {
  getMenu,
  resetPassword,
  resetPasswordCheckToken,
  verifySession,
} from '../../api/actions/UsersActions';
import Logo from '../../../assets/images/logo_sidera_large.png';
import Lottie from 'lottie-react';
const VerifyFailed = require('../../../assets/animation/Failed.json');
const VerifySuccess = require('../../../assets/animation/Verified.json');

export default function ResetPassword() {
  const confirmPasswordId = useId();
  const passwordId = useId();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setchangingPassword] = useState('');
  const [error, setError] = useState(false);
  const isFormValid = password === confirmPassword;
  const errorResetPasswordCheckToken = useSelector(
    (state) => state.UsersReducers.errorResetPasswordCheckToken
  );
  const userResetPassword = useSelector(
    (state) => state.UsersReducers.ResetPassword
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangePassword = () => {
    const data = {
      token: token,
      password: password,
    };

    if (password.length < 8) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    setchangingPassword(true);
    dispatch(resetPassword(data));
  };

  useEffect(() => {
    console.log('Token dari URL:', token);
    // Misalnya: verifikasi token ke backend
    dispatch(resetPasswordCheckToken(token));
    // Jika token valid, lanjutkan ke halaman reset password
    // Jika tidak valid, arahkan ke halaman lain atau tampilkan pesan kesalahan
  }, [token]);

  return (
    <div className="flex flex-row relative py-4 h-full bg-gray-100/50 items-center">
      <div className="flex flex-col mx-auto h-full w-full py-6 lg:py-12 sm:w-3/4 lg:w-2/5 gap-y-4 border bg-white items-center border-zinc-400/20">
        <div className="flex flex-col text-center content-center items-center gap-2">
          <img src={Logo} alt="" className="w-24" />
          <p className="text-xs lg:text-base">Sistem Informasi Desa Rawang</p>
          <h2 className="sm:text-2xl leading-none font-semibold">
            Atur Ulang Sandi
          </h2>
        </div>
        {userResetPassword ? (
          <div className="flex flex-col justify-center items-center px-8">
            <Lottie
              speed={2.5}
              animationData={VerifySuccess}
              height={50}
              width={50}
              className="w-2/5 sm:w-1/4"
            />
            <p className="text-sm text-center">Sandi Berhasil diatur ulang.</p>
          </div>
        ) : !errorResetPasswordCheckToken ? (
          <Field className="flex flex-col gap-4 px-8 w-full md:w-3/4 lg:w-3/4">
            <div>
              <Label
                htmlFor={passwordId}
                className="text-sm font-medium leading-normal text-gray-900"
              >
                Sandi Baru
              </Label>
              <Input
                id={passwordId}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
                focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
              />
            </div>
            <div>
              <Label
                htmlFor={confirmPasswordId}
                className="text-sm font-medium leading-normal text-gray-900"
              >
                Ulangi Sandi
              </Label>
              <Input
                id={confirmPasswordId}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                className="mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
                focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
              />
            </div>
            {!isFormValid && (
              <p className="text-sm text-red-500">Sandi tidak sama</p>
            )}
            {error && (
              <p className="text-sm text-red-500">
                Panjang sandi harus lebih dari 8 karakter
              </p>
            )}
            <Button
              onClick={handleChangePassword}
              disabled={!isFormValid || changingPassword}
              className={`rounded py-2 px-4 text-sm text-white ${
                isFormValid && !changingPassword
                  ? 'bg-zinc-900 data-[hover]:bg-zinc-900/80 data-[active]:bg-zinc-900/50'
                  : 'bg-zinc-400 cursor-not-allowed'
              }`}
            >
              Perbarui Sandi
            </Button>
          </Field>
        ) : (
          <div className="flex flex-col justify-center items-center px-8">
            <Lottie
              speed={2.5}
              animationData={VerifyFailed}
              height={50}
              width={50}
              className="w-2/5 sm:w-1/4"
            />
            <p className="text-sm text-center">
              Terjadi kesalahan, tautan kadaluarsa atau tidak valid.
            </p>
          </div>
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
