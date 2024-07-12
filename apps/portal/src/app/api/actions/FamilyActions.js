import axios from '../config/index';

// get residents start here
export const getFamilyInfo = (param) => async (dispatch) => {
  await axios
    .get('/family-info', {
      params: param,
    })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_FAMILY_INFO',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_FAMILY_INFO',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_FAMILY_INFO',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_FAMILY_INFO',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
// get residents end here
