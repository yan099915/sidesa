import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Field, Input, Label } from '@headlessui/react';
import { Check } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../api/actions';
import encryptData from '../../js/encryptData';
import { getMenu, verifySession } from '../../api/actions/UsersActions';

export default function Login() {
  const [enabled, setEnabled] = useState(true);
  const emailId = useId();
  const passwordId = useId();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logining, setLogining] = useState(false);
  const [error, setError] = useState('');
  const isFormValid = email !== '' && password !== '';

  const UserLogin = useSelector((state) => state.UsersReducers.UserLogin);
  const DoSetLogin = useSelector((state) => state.ReduxState.DoSetLogin);
  const errorUserLogin = useSelector(
    (state) => state.UsersReducers.errorUserLogin
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    const loginData = {
      email: email,
      password: password,
    };

    setLogining(true);
    dispatch({
      type: 'USER_LOGIN',
      payload: { data: false, errorMessage: false },
    });
    dispatch(loginUser(loginData));
  };

  const handleEnterLogin = (e) => {
    if (e.key === 'Enter' && isFormValid) {
      handleLogin();
    }
  };

  // if login was successful, store the email in local storage and navigate to email confirmation page
  useEffect(() => {
    if (UserLogin && DoSetLogin) {
      setTimeout(() => {
        dispatch({
          type: 'set',
          LoginStatus: true,
          DoSetLogin: false,
        });
        dispatch(verifySession());
        dispatch(getMenu());
      }, 1000);
    }
  }, [UserLogin]);

  // if user email is unverified, store the email in local storage and navigate to email confirmation page
  useEffect(() => {
    if (errorUserLogin) {
      if (errorUserLogin.data && !errorUserLogin.data.active) {
        const encryptedEmail = encryptData(email);

        if (errorUserLogin.message === 'Invalid email or password') {
          setError('Email atau password salah');
        }

        if (errorUserLogin.message === 'Email not verified') {
          localStorage.setItem('unauth', encryptedEmail);
          setTimeout(() => {
            navigate('/email-confirmation');
          }, 1000);
        }
      }

      setLogining(false);
    }
  }, [errorUserLogin]);

  useEffect(() => {
    if (!DoSetLogin) {
      dispatch({
        type: 'set',
        DoSetLogin: true,
      });
    }
  }, []);

  return (
    <div className="flex flex-col relative h-full p-8 border border-blue-500 bg-gray-100/50 items-center">
      <div className="flex flex-col h-full w-full py-24 sm:w-3/4 lg:w-2/5 gap-y-10 border bg-white items-center border-zinc-400/20">
        <div className="flex flex-col text-center content-center items-center gap-4">
          <img
            src="https://sidera.my.id/assets/img/logo_sidera_large.png"
            alt=""
            className="w-24"
          />
          <h2 className="text-4xl font-semibold">Sign In</h2>
          <p className="text-xs lg:text-base">Sistem Informasi Desa Rawang</p>
        </div>
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
              onKeyDown={handleEnterLogin}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
                focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
            />
          </div>
          <div>
            <Label
              htmlFor={passwordId}
              className="text-sm font-medium leading-normal text-gray-900"
            >
              Password
            </Label>
            <Input
              id={passwordId}
              value={password}
              onKeyDown={handleEnterLogin}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
                focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
            />
          </div>
          <div className="flex gap-x-2">
            <Checkbox
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className="flex group w-6 h-6 rounded-md bg-white p-1 ring-1 ring-zinc-900/40 ring-inset data-[checked]:bg-black"
            >
              <Check
                className="opacity-0 group-data-[checked]:opacity-100 text-white font-bold"
                fontSize="4px"
              />
            </Checkbox>
            <p className="text-sm font-medium leading-normal text-gray-900">
              Remember me
            </p>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            onClick={handleLogin}
            disabled={!isFormValid || logining}
            className={`rounded py-2 px-4 text-sm text-white ${
              isFormValid && !logining
                ? 'bg-zinc-900 data-[hover]:bg-zinc-900/80 data-[active]:bg-zinc-900/50'
                : 'bg-zinc-400 cursor-not-allowed'
            }`}
          >
            Sign In
          </Button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              Belum punya akun?{' '}
              <Link to="/register" className="text-blue-500 hover:underline">
                Daftar di sini
              </Link>
            </p>
          </div>
        </Field>
      </div>
    </div>
  );
}
