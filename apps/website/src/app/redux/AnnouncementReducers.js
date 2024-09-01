const initialState = {
  GetAnnouncements: false,
  errorGetAnnouncements: false,
  GetAnnouncementDetails: false,
  errorGetAnnouncementDetails: false,
};

const AnnouncementReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ANNOUNCEMENTS':
      return {
        ...state,
        GetAnnouncements: action.payload.data,
        errorGetAnnouncement: action.payload.errorMessage,
      };
    case 'GET_ANNOUNCEMENT_DETAILS':
      return {
        ...state,
        GetAnnouncementDetails: action.payload.data,
        errorGetAnnouncementDetails: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default AnnouncementReducers;
