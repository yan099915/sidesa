import axios from '../config/index';
// request data verification start here
export const requestDataVerification = (formData) => async (dispatch) => {
  await axios
    .post('/request-verification', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      dispatch({
        type: 'REQUEST_VERIFICATION',
        payload: { data: response.data, errorMessage: false },
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'REQUEST_VERIFICATION',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'REQUEST_VERIFICATION',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// request data verification end here

// check verification status start here
export const checkVerificationStatus = () => async (dispatch) => {
  await axios
    .get('/verification-status')
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'VERIFICATION_REQUEST_STATUS',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'VERIFICATION_REQUEST_STATUS',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'VERIFICATION_REQUEST_STATUS',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'VERIFICATION_REQUEST_STATUS',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// check verification status end here

// get all verification data start here
export const getVerificationData = (param) => async (dispatch) => {
  await axios
    .get(`/verification`, {
      params: param,
    })
    .then((response) => {
      dispatch({
        type: 'GET_VERIFICATIONS_REQUEST',
        payload: { data: response.data, errorMessage: false },
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_VERIFICATIONS_REQUEST',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_VERIFICATIONS_REQUEST',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// get verification data details start here
export const getVerificationDataDetails = (id) => async (dispatch) => {
  await axios
    .get(`/verification-details`, { params: { id: id } })
    .then((response) => {
      dispatch({
        type: 'VERIFICATIONS_REQUEST_DETAILS',
        payload: { data: response.data, errorMessage: false },
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'VERIFICATIONS_REQUEST_DETAILS',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'VERIFICATIONS_REQUEST_DETAILS',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// confirm or reject verification start here
export const verificationApproval = (data) => async (dispatch) => {
  await axios
    .post('/verification-approval', data)
    .then((response) => {
      dispatch({
        type: 'VERIFICATION_APPROVAL',
        payload: { data: response.data, errorMessage: false },
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'VERIFICATION_APPROVAL',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'VERIFICATION_APPROVAL',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
