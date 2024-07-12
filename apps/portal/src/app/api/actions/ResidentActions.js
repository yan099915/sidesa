import axios from '../config/index';

// get residents start here
export const getResidents = (param) => async (dispatch) => {
  await axios
    .get('/resident-list', {
      params: param,
    })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_RESIDENTS',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_RESIDENTS',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_RESIDENTS',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_RESIDENTS',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// get residents end here

// get resident details start here
export const getResidentDetails = (nik) => async (dispatch) => {
  await axios
    .get(`/resident/${nik}`)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_RESIDENT_DETAILS',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_RESIDENT_DETAILS',
          payload: { data: response, errorMessage: 'Data not found' },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_RESIDENT_DETAILS',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_RESIDENT_DETAILS',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// get resident details end here

// add resident start here
export const addResident = (data) => async (dispatch) => {
  await axios
    .post('/resident', data)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'ADD_RESIDENT',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'ADD_RESIDENT',
          payload: { data: response, errorMessage: 'Data not found' },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'ADD_RESIDENT',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'ADD_RESIDENT',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
