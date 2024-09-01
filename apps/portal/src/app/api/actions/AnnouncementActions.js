import axios from '../config/index';

// create announcement start here
export const createAnnouncement = (data) => async (dispatch) => {
  await axios
    .post('/announcement', data)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'CREATE_ANNOUNCEMENT',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'CREATE_ANNOUNCEMENT',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'CREATE_ANNOUNCEMENT',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'CREATE_ANNOUNCEMENT',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// get announcement start here
export const getAnnouncement = (param) => async (dispatch) => {
  await axios
    .get('/announcements', { params: param })
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

// get announcement details start here
export const getAnnouncementDetails = (id) => async (dispatch) => {
  await axios
    .get(`/announcement/${id}`)
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

// delete announcement start here
export const deleteAnnouncement = (id) => async (dispatch) => {
  await axios
    .delete(`/announcement/${id}`)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'DELETE_ANNOUNCEMENT',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'DELETE_ANNOUNCEMENT',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'DELETE_ANNOUNCEMENT',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'DELETE_ANNOUNCEMENT',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// get announcement status start here
export const getAnnouncementStatus = (id) => async (dispatch) => {
  await axios
    .get(`/announcement-status`)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_ANNOUNCEMENT_STATUS',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_ANNOUNCEMENT_STATUS',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_ANNOUNCEMENT_STATUS',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_ANNOUNCEMENT_STATUS',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// get announcement type start here
export const getAnnouncementType = () => async (dispatch) => {
  await axios
    .get(`/announcement-type`)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_ANNOUNCEMENT_TYPE',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_ANNOUNCEMENT_TYPE',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_ANNOUNCEMENT_TYPE',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_ANNOUNCEMENT_TYPE',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// update announcement start here
export const updateAnnouncement = (data) => async (dispatch) => {
  await axios
    .put(`/announcement`, data)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'UPDATE_ANNOUNCEMENT',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'UPDATE_ANNOUNCEMENT',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'UPDATE_ANNOUNCEMENT',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'UPDATE_ANNOUNCEMENT',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
