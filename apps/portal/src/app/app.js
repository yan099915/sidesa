import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useDispatch, useSelector } from 'react-redux';
import { getMenu, verifySession } from './api/actions/UsersActions';
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

import { io } from 'socket.io-client';
import SignLetter from './pages/Sign/SignLetter';
const notificationAudio = new Audio('../assets/audio/notification.wav');
const isLocalhost = window.location.hostname === 'localhost';
const URL = isLocalhost ? 'ws://localhost:3000' : 'https://api.sidera.my.id';

const lazyWithDelay = (importFunc, delay) =>
  lazy(() =>
    Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([moduleExports]) => moduleExports)
  );

const EmergencyDetails = lazy(() =>
  import('./pages/Emergency/EmergencyDetails')
);
const Emergency = lazy(() => import('./pages/Emergency/Emergency'));
const EmergencyIncidents = lazy(() =>
  import('./pages/Emergency/EmergencyIncidents')
);
const Article = lazy(() => import('./pages/Article/Article'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Pengajuan = lazy(() => import('./pages/Pengajuan/Pengajuan'));
const FormPengajuan = lazy(() => import('./pages/Pengajuan/FormPengajuan'));
const DaftarPengajuan = lazy(() => import('./pages/Pengajuan/DaftarPengajuan'));
const RiwayatPengajuan = lazy(() =>
  import('./pages/Pengajuan/RiwayatPengajuan')
);
const PengajuanDetails = lazy(() =>
  import('./pages/Pengajuan/PengajuanDetails')
);
const PengajuanProcess = lazy(() =>
  import('./pages/Pengajuan/PengajuanProcess')
);
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Report = lazy(() => import('./pages/Report/Report'));
const EmergencyAlert = lazy(() => import('./pages/Emergency/EmergencyAlert'));
const Resident = lazy(() => import('./pages/Resident/Resident'));
const ResidentList = lazy(() => import('./pages/Resident/ResidentList'));
const VerificationRequest = lazy(() =>
  import('./pages/Resident/VerificationRequest')
);
const AddResident = lazy(() => import('./pages/Resident/AddResident'), 1000);
const ConfirmResident = lazy(() => import('./pages/Resident/ConfirmResident'));
const ResidentDetails = lazy(() => import('./pages/Resident/ResidentDetails'));
const EmailConfirmation = lazy(() =>
  import('./pages/Register/EmailConfirmation')
);
const Login = lazyWithDelay(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail/VerifyEmail'));
const WelcomePage = lazy(() => import('./pages/Dashboard/WelcomePage'), 1000);

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

const ProtectedAdmin = ({ isLoggedIn, isAdmin, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export function App() {
  const [progress, setProgress] = useState(0);
  const [authSocket, setAuthSocket] = useState(null);
  const isLoggedIn = useSelector((state) => state.ReduxState.LoginStatus);
  const UserSession = useSelector((state) => state.UsersReducers.UserSession);
  const IsAdmin = useSelector((state) => state.ReduxState.IsAdmin);
  const errorUserSession = useSelector(
    (state) => state.UsersReducers.errorUserSession
  );
  const DoGetMenu = useSelector((state) => state.ReduxState.DoGetMenu);
  const DoVerifySession = useSelector(
    (state) => state.ReduxState.DoVerifySession
  );
  const DoConnectSocketIo = useSelector(
    (state) => state.ReduxState.DoConnectSocketIo
  );

  const dispatch = useDispatch();

  // Check if user has sessionToken in cookies
  useEffect(() => {
    if (DoVerifySession && !errorUserSession) {
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
      if (UserSession.data && UserSession.data?.role >= '2') {
        setAuthSocket({ id: UserSession.data.id, role: UserSession.data.role });
        // console.log('User is admin');
        dispatch({ type: 'set', IsAdmin: true });
      } else {
        dispatch({ type: 'set', IsAdmin: false });
      }
      setProgress(70);
    }
    setTimeout(() => {
      // get list menu
      if (DoGetMenu) {
        dispatch(getMenu());

        dispatch({ type: 'set', DoGetMenu: false });
      }
      setProgress(100);
    }, 1000);
  }, [UserSession, dispatch]);

  useEffect(() => {
    if (errorUserSession) {
      dispatch({
        type: 'set',
        LoginStatus: false,
        // DoCheckSession: false,
      });
    }
  }, [errorUserSession]);

  useEffect(() => {
    if (DoConnectSocketIo && authSocket !== null) {
      dispatch({ type: 'set', DoConnectSocketIo: false });
      const socket = io(URL, {
        auth: authSocket,
        autoConnect: false,
      });

      setTimeout(() => {
        socket.connect();
      }, 3000);

      socket.on('connect', () => {
        console.log('Connected to socket.io');
        dispatch({ type: 'set', SocketConnection: socket });
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from socket.io');
        // dispatch({ type: 'set', SocketConnection: true });
      });

      socket.on('emergency', (msg) => {
        dispatch({ type: 'set', Emergency: true });
      });

      socket.on('notification', (msg) => {
        notificationAudio.play();
        dispatch({ type: 'set', DoGetNotifications: true });
      });
    }
  }, [DoConnectSocketIo, authSocket]);

  useEffect(() => {
    if (!DoGetMenu) {
      dispatch({ type: 'set', DoGetMenu: true, DoVerifySession: true });
    }

    if (!DoConnectSocketIo) {
      console.log('Connect to socket.io');
      dispatch({ type: 'set', DoConnectSocketIo: true });
    }
    // getLocalStream();
  }, []);

  return (
    <div className="relative flex flex-col h-screen h-min-screen">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <EmergencyAlert />
      <Suspense fallback={<LoadingSpinner />}>
        <Toaster
          position="center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
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
            <Route
              index
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <RiwayatPengajuan />
                </Protected>
              }
            />
            <Route
              path="form"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <FormPengajuan />
                </Protected>
              }
            />
            <Route
              path="list"
              element={
                <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={IsAdmin}>
                  <DaftarPengajuan />
                </ProtectedAdmin>
              }
            />
            <Route
              path="details/:id"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <PengajuanDetails />
                </Protected>
              }
            />
            <Route
              path="process/:id"
              element={
                <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={IsAdmin}>
                  <PengajuanProcess />
                </ProtectedAdmin>
              }
            />
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
              <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={IsAdmin}>
                <Report />
              </ProtectedAdmin>
            }
          />
          <Route
            path="emergency"
            element={
              <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={IsAdmin}>
                <Emergency />
              </ProtectedAdmin>
            }
          >
            <Route
              index
              element={
                <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={IsAdmin}>
                  <EmergencyIncidents />
                </ProtectedAdmin>
              }
            />
            <Route
              path="details/:id"
              element={
                <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={IsAdmin}>
                  <EmergencyDetails />
                </ProtectedAdmin>
              }
            />
          </Route>
          <Route
            path="article"
            element={
              <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={IsAdmin}>
                <Article />
              </ProtectedAdmin>
            }
          />
          <Route
            path="sign"
            element={
              <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={IsAdmin}>
                <SignLetter />
              </ProtectedAdmin>
            }
          />
          <Route
            path="resident"
            element={
              <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={IsAdmin}>
                <Resident />
              </ProtectedAdmin>
            }
          >
            <Route index element={<ResidentList />} />
            <Route
              path="verification"
              element={
                <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={IsAdmin}>
                  <VerificationRequest />
                </ProtectedAdmin>
              }
            />
            <Route
              path="add"
              element={
                <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={IsAdmin}>
                  <AddResident />
                </ProtectedAdmin>
              }
            />
            <Route
              path="details/:nik"
              element={
                <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={IsAdmin}>
                  <ResidentDetails />
                </ProtectedAdmin>
              }
            />
            <Route
              path="confirm/:id"
              element={
                <ProtectedAdmin isLoggedIn={isLoggedIn} isAdmin={IsAdmin}>
                  <ConfirmResident />
                </ProtectedAdmin>
              }
            />
          </Route>
          {/* Auth routes start here */}
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
                // <ProtectedLogin isLoggedIn={isLoggedIn}>
                <VerifyEmail />
                // </ProtectedLogin>
              }
            />
          </Route>
          {/* Auth routes end here */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
