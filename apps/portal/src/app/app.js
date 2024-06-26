import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Pengajuan from './pages/Pengajuan/Pengajuan';
import FormPengajuan from './pages/Pengajuan/FormPengajuan';
import DaftarPengajuan from './pages/Pengajuan/DaftarPengajuan';
import RiwayatPengajuan from './pages/Pengajuan/RiwayatPengajuan';
import Profile from './pages/Profile/Profile';
import Report from './pages/Report/Report';
import EmailConfirmation from './pages/Register/EmailConfirmation';
import { useDispatch, useSelector } from 'react-redux';
import EmergencyAlert from './pages/Emergency/EmergencyAlert';
import Resident from './pages/Resident/Resident';
import { getMenu, verifySession } from './api/actions/UsersActions';
import ResidentList from './pages/Resident/ResidentList';
import VerificationRequest from './pages/Resident/VerificationRequest';

const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail/VerifyEmail'));
const WelcomePage = lazy(() => import('./pages/Dashboard/WelcomePage'));

const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const ProtectedLogin = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export function App() {
  const isLoggedIn = useSelector((state) => state.ReduxState.LoginStatus);
  const UserSession = useSelector((state) => state.UsersReducers.UserSession);
  const errorUserSession = useSelector(
    (state) => state.UsersReducers.errorUserSession
  );
  const DoGetMenu = useSelector((state) => state.ReduxState.DoGetMenu);
  const DoVerifySession = useSelector(
    (state) => state.ReduxState.DoVerifySession
  );

  const dispatch = useDispatch();

  //check if use has sessionToken in cookies
  useEffect(() => {
    if (DoVerifySession) {
      dispatch(verifySession());
      dispatch({ type: 'set', DoVerifySession: false });
    }
  }, [DoVerifySession, dispatch]);

  useEffect(() => {
    if (UserSession) {
      dispatch({
        type: 'set',
        LoginStatus: true,
      });
    }
    setTimeout(() => {
      // get list menu
      if (DoGetMenu) {
        dispatch(getMenu());
        dispatch({ type: 'set', DoGetMenu: false });
      }
    }, 1000);
  }, [UserSession, dispatch]);

  useEffect(() => {
    if (errorUserSession) {
      dispatch({
        type: 'set',
        LoginStatus: false,
      });
    }
  }, [errorUserSession]);

  useEffect(() => {
    if (!DoGetMenu) {
      dispatch({ type: 'set', DoGetMenu: true, DoVerifySession: true });
    }
  }, []);

  return (
    <div className="relative flex flex-col h-screen h-min-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <WelcomePage />
              </Protected>
            }
          />
          <Route
            path="request"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Pengajuan />
              </Protected>
            }
          >
            <Route index element={<RiwayatPengajuan />} />
            <Route path="daftar" element={<DaftarPengajuan />} />
            <Route path="form" element={<FormPengajuan />} />
          </Route>
          <Route
            path="profile"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="report"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Report />
              </Protected>
            }
          />
          <Route
            path="emergency"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <EmergencyAlert />
              </Protected>
            }
          />
          <Route
            path="resident"
            element={
              <Protected isLoggedIn={isLoggedIn}>
                <Resident />
              </Protected>
            }
          >
            <Route index element={<ResidentList />} />
            <Route path="verification" element={<VerificationRequest />} />
            <Route path="add" element={<FormPengajuan />} />
          </Route>
          {/* auth routes start here */}
          <Route
            path="login"
            element={
              <ProtectedLogin isLoggedIn={isLoggedIn}>
                <Login />
              </ProtectedLogin>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedLogin isLoggedIn={isLoggedIn}>
                <Register />
              </ProtectedLogin>
            }
          />
          <Route
            path="email-confirmation"
            element={
              <ProtectedLogin isLoggedIn={isLoggedIn}>
                <EmailConfirmation />
              </ProtectedLogin>
            }
          />
          <Route path="email-verify">
            <Route
              path=":token"
              element={
                <ProtectedLogin isLoggedIn={isLoggedIn}>
                  <VerifyEmail />
                </ProtectedLogin>
              }
            />
          </Route>
          {/* auth routes end here */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
