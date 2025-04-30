import axios from '../config/index';

//  get article start here
export const getFile = (param) => async (dispatch) => {
  await axios
    .get(`/file/${param.type}/${param.filename}`)
    .then((response) => {
      if (response.data) {
        // console.log(response.data, 'response');
        dispatch({
          type: 'GET_FILE',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_FILE',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        console.log(error, 'error');
        dispatch({
          type: 'GET_FILE',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_FILE',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

//  get profile picture start here
export const getProfilePicture = (param) => async (dispatch) => {
  await axios
    .get(`/profile/${param.filename}`)
    .then((response) => {
      if (response.data) {
        // console.log(response.data, 'response');
        dispatch({
          type: 'GET_PROFILE_PICTURE',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_PROFILE_PICTURE',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        console.log(error, 'error');
        dispatch({
          type: 'GET_PROFILE_PICTURE',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_PROFILE_PICTURE',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
