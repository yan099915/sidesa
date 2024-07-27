import axios from '../config/index';

// get user notification start here
export const getUserNotification = (param) => async (dispatch) => {
  await axios
    .get('/notification', { params: param })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_USER_NOTIFICATION',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_USER_NOTIFICATION',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_USER_NOTIFICATION',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_USER_NOTIFICATION',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
//  get user notification end here

//  update user notification start here
export const updateUserNotification = (data) => async (dispatch) => {
  await axios
    .put('/notification', data)
    .then((response) => {
      dispatch({
        type: 'UPDATE_USER_NOTIFICATION',
        payload: { data: response.data, errorMessage: false },
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'UPDATE_USER_NOTIFICATION',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'UPDATE_USER_NOTIFICATION',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
