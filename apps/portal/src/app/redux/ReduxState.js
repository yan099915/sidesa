const initialState = {
  DoDispatch: false,
  DoSetLogin: false,
  DoGetMenu: false,
  DoCheckSession: false,
  DoVerifySession: false,
  DoCheckVerificationStatus: false,
  DoGetVerificationData: false,
  DoGetVerificationDetails: false,
  DoGetResidents: false,
  Loading: false,
  DoGetRequestRequiredData: false,
  DoGetRequestHistory: false,
  DoGetRequestList: false,
  DoGetRequestDetails: false,
  DoGetNotifications: false,
  DoGetEmergencyList: false,
  DoGetEmergencyDetails: false,
  DoGetArticles: false,
  DoGetArticleDetails: false,
  DoGetAnnouncements: false,
  DoGetAnnouncementDetails: false,
  DoGetFeaturedArticles: false,
  DoConnectSocketIo: false,
  DoGetReport: false,
  Emergency: false,
  // SocketConnection: false,

  // user reducers
  UserGeolocation: false,
  DataGeolocation: false,
  IsAdmin: true,
  IsSuperAdmin: true,
  LoginStatus: true,
};

const ReduxState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

export default ReduxState;
