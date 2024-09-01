import axios from '../config/index';

// Fungsi untuk mendapatkan nilai cookie berdasarkan nama
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// login user start here
export const loginUser = (userData) => async (dispatch) => {
  await axios
    .post('/login', userData)
    .then((response) => {
      dispatch({
        type: 'USER_LOGIN',
        payload: { data: response.data, errorMessage: false },
      });

      // Cek apakah cookie 'token' ada
      const token = getCookie('token');
      if (token) {
        console.log('Cookie token ditemukan:', token);
      } else {
        console.log('Cookie token tidak ditemukan');
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'USER_LOGIN',
          payload: { data: false, errorMessage: error.response.data },
        });
      } else {
        dispatch({
          type: 'USER_LOGIN',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// login user end here

// register user start here
export const registerUser = (userData) => async (dispatch) => {
  await axios
    .post('/register', userData)
    .then((response) => {
      dispatch({
        type: 'USER_REGISTER',
        payload: { data: response.data, errorMessage: false },
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'USER_REGISTER',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'USER_REGISTER',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// register user end here

// resend email start here
export const resendVerification = (email) => async (dispatch) => {
  await axios
    .post('/resend-email', { email })
    .then((response) => {
      dispatch({
        type: 'RESEND_VERIFICATION',
        payload: { data: response.data, errorMessage: false },
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'RESEND_VERIFICATION',
          payload: { data: false, errorMessage: error.response.data },
        });
      } else {
        dispatch({
          type: 'RESEND_VERIFICATION',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// resend email end here

// verify email start here
export const verifyEmail = (token) => async (dispatch) => {
  await axios
    .get('/verify-email', {
      params: { token: token },
    })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'EMAIL_VERIFY',
          payload: { data: response.data, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'EMAIL_VERIFY',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'EMAIL_VERIFY',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// verify email end here

// verify session token start here
export const verifySession = () => async (dispatch) => {
  await axios
    .get('/session')
    .then((response) => {
      dispatch({
        type: 'VERIFY_SESSION',
        payload: { data: response.data, errorMessage: false },
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'VERIFY_SESSION',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'VERIFY_SESSION',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// verify session token end here

// logout user start here
export const logoutUser = () => async (dispatch) => {
  await axios
    .get('/logout')
    .then((response) => {
      console.log(response, 'responnya');
      dispatch({
        type: 'USER_LOGOUT',
        payload: { data: response.data, errorMessage: false },
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'USER_LOGOUT',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'USER_LOGOUT',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// logout user end here

// get menu start here
export const getMenu = () => async (dispatch) => {
  await axios
    .get('/menu')
    .then((response) => {
      dispatch({
        type: 'USER_MENU',
        payload: { data: response.data, errorMessage: false },
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'USER_MENU',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'USER_MENU',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// get menu end here

// get resident details start here
export const getProfileDetails = (nik) => async (dispatch) => {
  await axios
    .get(`/resident/${nik}`)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_PROFILE_DETAILS',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_PROFILE_DETAILS',
          payload: { data: response, errorMessage: 'Data not found' },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_PROFILE_DETAILS',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_PROFILE_DETAILS',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// get resident details end here
