const initialState = {
  NotificationList: false,
  errorNotificationList: false,
  NotificationUpdate: false,
  errorNotificationUpdate: false,
};

const NotificationReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_NOTIFICATION':
      return {
        ...state,
        NotificationList: action.payload.data,
        errorNotificationList: action.payload.errorMessage,
      };
    case 'UPDATE_USER_NOTIFICATION':
      return {
        ...state,
        NotificationUpdate: action.payload.data,
        errorNotificationUpdate: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default NotificationReducers;
