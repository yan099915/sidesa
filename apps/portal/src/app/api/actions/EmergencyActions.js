import axios from '../config/index';

//  create emergency start here
export const createEmergency = (data) => async (dispatch) => {
  await axios
    .post('/emergency', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'CREATE_EMERGENCY',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'CREATE_EMERGENCY',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'CREATE_EMERGENCY',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'CREATE_EMERGENCY',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// get emergency list start here
export const getEmergencyList = (param) => async (dispatch) => {
  await axios
    .get('/emergency', { params: param })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'EMERGENCY_LIST',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'EMERGENCY_LIST',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'EMERGENCY_LIST',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'EMERGENCY_LIST',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// get emergency details start here
export const getEmergencyDetails = (id) => async (dispatch) => {
  await axios
    .get(`/emergency/${id}`)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'EMERGENCY_DETAILS',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'EMERGENCY_DETAILS',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'EMERGENCY_DETAILS',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'EMERGENCY_DETAILS',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// close emergency start here
export const closeEmergencyIncident = (id) => async (dispatch) => {
  await axios
    .put(`/emergency/${id}`)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'CLOSE_EMERGENCY',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'CLOSE_EMERGENCY',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'CLOSE_EMERGENCY',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'CLOSE_EMERGENCY',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// save emergency view log
export const writeEmergencyViewLog = (data) => async (dispatch) => {
  await axios
    .post(`/emergency/view`, data)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'SAVE_EMERGENCY_VIEW_LOG',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'SAVE_EMERGENCY_VIEW_LOG',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'SAVE_EMERGENCY_VIEW_LOG',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'SAVE_EMERGENCY_VIEW_LOG',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
