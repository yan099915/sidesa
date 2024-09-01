import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyEmail } from '../../api/actions';
import Lottie from 'lottie-react';
import { verifySession } from '../../api/actions/UsersActions';
const VerifySuccess = require('../../../assets/animation/Verified.json');
const VerifyFailed = require('../../../assets/animation/Failed.json');

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(true);
  const DoDispatch = useSelector((state) => state.ReduxState.DoDispatch);
  const errorUserSession = useSelector(
    (state) => state.UsersReducers.errorUserSession
  );
  const UserSession = useSelector((state) => state.UsersReducers.UserSession);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorVerifyEmail = useSelector(
    (state) => state.UsersReducers.errorVerifyEmail
  );

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          if (DoDispatch) {
            // console.log(DoDispatch, 'DoDispatch');
            await dispatch(verifyEmail(token));
            dispatch({ type: 'set', DoDispatch: false });
          }
        } catch (error) {
          setIsLoading(false);
          // console.error('Error verifying email:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [dispatch, token, DoDispatch]);

  useEffect(() => {
    if (errorUserSession) {
      if (!DoDispatch) {
        dispatch({ type: 'set', DoDispatch: true });
      }
    }

    if (UserSession) {
      navigate('/');
    }
  }, [errorUserSession, UserSession]);

  useEffect(() => {
    dispatch(verifySession);
    dispatch({ type: 'set', isLoggedIn: false });
    localStorage.removeItem('unauth');
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col relative h-full p-8 bg-gray-100/50 items-center">
        <div className="flex flex-col h-full w-full py-24 sm:w-3/4 lg:w-2/5 gap-y-10 border bg-white items-center border-zinc-400/20">
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
          <h2 className="text-4xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col relative h-full p-8 bg-gray-100/50 items-center">
      <div className="flex flex-col h-full w-full py-24 sm:w-3/4 lg:w-2/5 gap-y-10 border bg-white items-center border-zinc-400/20">
        {!errorVerifyEmail ? (
          <div className="flex flex-col text-center gap-4 px-4 items-center">
            <Lottie
              speed={2.5}
              animationData={VerifySuccess}
              height={50}
              width={50}
              className="w-2/5 sm:w-1/4"
            />
            <h2 className="text-4xl font-semibold">Verify Email</h2>
            <p className="text-xs lg:text-base text-justify">
              Akun berhasil diaktifkan, silahkan login untuk melanjutkan. Klik
              link berikut untuk login.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="flex flex-col text-center gap-4 px-4 items-center">
            <Lottie
              speed={2.5}
              animationData={VerifyFailed}
              height={50}
              width={50}
              className="w-2/5 sm:w-1/4 "
            />
            <h2 className="text-4xl font-semibold">Verifikasi Gagal</h2>
            <p className="text-xs lg:text-base text-justify">
              Link verifikasi tidak valid atau sudah kadaluarsa. Silahkan coba
              lagi atau hubungi admin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
