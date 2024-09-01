import axios from '../config/index';

// get resident report start here
export const getResidentReport = (param) => async (dispatch) => {
  await axios
    .get('/resident-report', { params: param })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_RESIDENT_REPORT',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_RESIDENT_REPORT',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_RESIDENT_REPORT',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_RESIDENT_REPORT',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// get portal report start here
export const getPortalReport = (param) => async (dispatch) => {
  await axios
    .get('/portal-report', { params: param })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_PORTAL_REPORT',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_PORTAL_REPORT',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_PORTAL_REPORT',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_PORTAL_REPORT',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
