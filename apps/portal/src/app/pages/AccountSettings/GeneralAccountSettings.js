import { Button, Field, Input, Label } from '@headlessui/react';
import React, { useEffect, useId, useState } from 'react';
import { changePassword } from '../../api/actions/UsersActions';
import { useDispatch, useSelector } from 'react-redux';
import { SixtyFps } from '@mui/icons-material';
import toast from 'react-hot-toast';

export default function GeneralAccountSettings() {
  const currentPasswordId = useId();
  const newPasswordId = useId();
  const confirmPasswordId = useId();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [validating, setValidating] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [requestChangePassword, setRequestChangePassword] = useState(false);
  const isFormValid =
    newPassword === confirmPassword && currentPassword.length > 0;
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const errorChangePassword = useSelector(
    (state) => state.UsersReducers.errorChangePassword
  );
  const userChangePassword = useSelector(
    (state) => state.UsersReducers.ChangePassword
  );

  const handleChangePassword = () => {
    const data = {
      oldPassword: currentPassword,
      newPassword: newPassword,
    };

    if (newPassword.length < 8) {
      setError('Panjang sandi harus lebih dari 8 karakter');
      return;
    } else {
      setError('');
    }
    setRequestChangePassword(true);
    // console.log('Data untuk ganti sandi:', data);
    dispatch(changePassword(data));
  };

  useEffect(() => {
    // console.log('error ganti sandi', errorChangePassword);
    if (errorChangePassword) {
      setError('Sandi saat ini salah');
    }
  }, [errorChangePassword]);

  useEffect(() => {
    // console.log('user ganti sandi', userChangePassword);
    if (userChangePassword) {
      toast.success('Password berhasil diubah', {
        id: 'update-password',
      });
      setTimeout(() => {
        setRequestChangePassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setChangingPassword(false);
        toast.dismiss('update-password');
      }, 2000);
    }
  }, [userChangePassword]);

  return (
    <div className="">
      <div>
        <h1 className="text-md font-bold text-gray-900">Ganti sandi akun</h1>
        <Button
          // disabled={!isFormValid || logining}
          onClick={() => setChangingPassword(true)}
          className={`rounded h-8 w-fit px-4 text-sm text-white ${
            !changingPassword
              ? 'bg-zinc-900 data-[hover]:bg-zinc-900/80 data-[active]:bg-zinc-900/50'
              : 'hidden'
          }`}
        >
          Ganti
        </Button>
        {changingPassword && (
          <Field className="flex flex-col gap-3  w-full md:w-3/4 lg:w-3/4">
            <div>
              <Label
                htmlFor={currentPasswordId}
                className="text-sm font-medium leading-normal text-gray-900 w-full"
              >
                Masukan sandi saat ini
              </Label>
              <div className="flex flex-row gap-x-2 gap-y-2">
                <Input
                  id={currentPasswordId}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  type="password"
                  className=" block w-full w-60 rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
                        focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor={newPasswordId}
                className="text-sm font-medium leading-normal text-gray-900"
              >
                Sandi Baru
              </Label>
              <Input
                id={newPasswordId}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                className=" block w-full w-60 rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
                        focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
              />
            </div>
            <div>
              <Label
                htmlFor={confirmPasswordId}
                className="text-sm font-medium leading-normal text-gray-900"
              >
                Ulangi Sandi Baru
              </Label>
              <Input
                id={confirmPasswordId}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                className=" block  w-60 rounded-lg ring-1 ring-gray-900/20 py-1.5 px-3 text-sm/6
                        focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-zinc-900"
              />
            </div>
            {!isFormValid && (
              <p className="text-sm text-red-500">Sandi tidak sama</p>
            )}
            {error.length > 0 && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button
              disabled={!isFormValid || requestChangePassword}
              onClick={handleChangePassword}
              className={`rounded h-10 w-fit px-4 text-sm text-white ${
                isFormValid && !requestChangePassword
                  ? 'bg-zinc-900 data-[hover]:bg-zinc-900/80 data-[active]:bg-zinc-900/50'
                  : 'bg-zinc-400 cursor-not-allowed'
              }`}
            >
              Konfirmasi Ganti Sandi
            </Button>
          </Field>
        )}
      </div>
    </div>
  );
}
