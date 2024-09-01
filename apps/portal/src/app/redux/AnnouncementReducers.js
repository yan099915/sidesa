const initialState = {
  CreateAnnouncement: false,
  errorCreateAnnouncement: false,
  GetAnnouncements: false,
  errorGetAnnouncements: false,
  GetAnnouncementDetails: false,
  errorGetAnnouncementDetails: false,
  DeleteAnnouncement: false,
  errorDeleteAnnouncement: false,
  GetAnnouncementStatus: false,
  errorGetAnnouncementStatus: false,
  GetAnnouncementType: false,
  errorGetAnnouncementType: false,
  UpdateAnnouncement: false,
  errorUpdateAnnouncement: false,
};

const AnnouncementReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ANNOUNCEMENT':
      return {
        ...state,
        CreateAnnouncement: action.payload.data,
        errorCreateAnnouncement: action.payload.errorMessage,
      };
    case 'GET_ANNOUNCEMENTS':
      return {
        ...state,
        GetAnnouncements: action.payload.data,
        errorGetAnnouncements: action.payload.errorMessage,
      };
    case 'GET_ANNOUNCEMENT_DETAILS':
      return {
        ...state,
        GetAnnouncementDetails: action.payload.data,
        errorGetAnnouncementDetails: action.payload.errorMessage,
      };
    case 'DELETE_ANNOUNCEMENT':
      return {
        ...state,
        DeleteAnnouncement: action.payload.data,
        errorDeleteAnnouncement: action.payload.errorMessage,
      };
    case 'GET_ANNOUNCEMENT_STATUS':
      return {
        ...state,
        GetAnnouncementStatus: action.payload.data,
        errorGetAnnouncementStatus: action.payload.errorMessage,
      };
    case 'GET_ANNOUNCEMENT_TYPE':
      return {
        ...state,
        GetAnnouncementType: action.payload.data,
        errorGetAnnouncementType: action.payload.errorMessage,
      };
    case 'UPDATE_ANNOUNCEMENT':
      return {
        ...state,
        UpdateAnnouncement: action.payload.data,
        errorUpdateAnnouncement: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default AnnouncementReducers;
