import { Button, Field, Input, Label } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { registerUser } from '../../api/actions';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registering, setRegistering] = useState(false);

  const UserRegisterRedux = useSelector(
    (state) => state.UsersReducers.UserRegister
  ); // Adjust this to match your actual state structure
  const errorUserRegisterRedux = useSelector(
    (state) => state.UsersReducers.errorUserRegister
  ); // Adjust this to match your actual state structure

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, 'secretkey').toString();
  };

  const handleRegister = () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    setRegistering(true);
    const userData = { email, password };
    dispatch(registerUser(userData)).catch((err) => {
      setError(err.message);
      setRegistering(false);
    });
  };

  // if register was successful, store the email in local storage and navigate to email confirmation page
  useEffect(() => {
    if (UserRegisterRedux !== false) {
      const encryptedEmail = encryptData(email);
      localStorage.setItem('unauth', encryptedEmail);
      navigate('/email-confirmation');
    }
  }, [UserRegisterRedux, email, navigate]);

  // if register was unsuccessful, show the error message
  useEffect(() => {
    if (errorUserRegisterRedux) {
      setError(errorUserRegisterRedux);
      setRegistering(false);
    }
  }, [errorUserRegisterRedux]);

  return (
    <div className="flex flex-col relative h-full p-8 bg-gray-100/50 items-center">
      <div className="flex flex-col h-full w-full py-24 sm:w-3/4 lg:w-2/5 gap-y-10 border bg-white items-center border-zinc-400/20">
        <div className="flex flex-col gap-4 px-8 w-full md:w-3/4 lg:w-3/4">
          <div className="flex flex-col text-center items-center gap-4">
            <img
              src="https://sidera.my.id/assets/img/logo_sidera_large.png"
              alt=""
              className="w-24"
            />
            <h2 className="text-4xl font-semibold ">Register</h2>
            <p className="text-xs lg:text-base">Portal Layanan Desa Rawang</p>
          </div>
          <Field>
            <Label className="text-sm font-medium leading-normal text-gray-900">
              Email
            </Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
              focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
            />
          </Field>
          <Field>
            <Label className="text-sm font-medium leading-normal text-gray-900">
              Password
            </Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
              focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
            />
          </Field>
          <Field>
            <Label className="text-sm font-medium leading-normal text-gray-900">
              Confirm Password
            </Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-3 block w-full rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
              focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
            />
          </Field>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            onClick={handleRegister}
            disabled={registering}
            className="rounded bg-zinc-900 py-2 px-4 text-sm text-white data-[hover]:bg-zinc-900/80 data-[active]:bg-zinc-900/50"
          >
            {registering ? 'Registering...' : 'Register'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
