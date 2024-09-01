import axios from '../config/index';

// get announcements
export const getAnnouncements = () => async (dispatch) => {
  await axios
    .get('/public/announcements')
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_ANNOUNCEMENTS',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_ANNOUNCEMENTS',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_ANNOUNCEMENTS',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_ANNOUNCEMENTS',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// get announcement details
export const GetAnnouncementDetails = (id) => async (dispatch) => {
  await axios
    .get(`/public/announcement/${id}`)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_ANNOUNCEMENT_DETAILS',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_ANNOUNCEMENT_DETAILS',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_ANNOUNCEMENT_DETAILS',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_ANNOUNCEMENT_DETAILS',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
