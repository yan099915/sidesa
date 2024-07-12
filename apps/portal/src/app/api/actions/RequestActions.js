import axios from '../config/index';

// get user requests history start here
export const requestHistory = (param) => async (dispatch) => {
  await axios
    .get('/request-history', {
      params: param,
    })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'REQUEST_HISTORY',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'REQUEST_HISTORY',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'REQUEST_HISTORY',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'REQUEST_HISTORY',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// get user requests history end here

// get request list start here
export const getRequestList = (param) => async (dispatch) => {
  await axios
    .get('/requests', {
      params: param,
    })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'REQUEST_LIST',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'REQUEST_LIST',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'REQUEST_LIST',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'REQUEST_LIST',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// get request list end here

// create request start here
export const createRequest = (data) => async (dispatch) => {
  await axios
    .post('/request', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'CREATE_REQUEST',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'CREATE_REQUEST',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'CREATE_REQUEST',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'CREATE_REQUEST',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// create request end here

// get user request details start here
export const getRequestDetails = (param) => async (dispatch) => {
  await axios
    .get(`/request-details`, { params: param })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'REQUEST_DETAILS',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'REQUEST_DETAILS',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'REQUEST_DETAILS',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'REQUEST_DETAILS',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
