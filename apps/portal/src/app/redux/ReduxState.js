const initialState = {
  LoginStatus: false,
  DoDispatch: false,
  DoGetMenu: false,
  DoCheckSession: false,
  DoVerifySession: false,
  DoCheckVerificationStatus: false,
  IsAdmin: true,
  DoGetVerificationData: false,
  DoGetVerificationDetails: false,
  DoGetResidents: false,
  Loading: false,
  DoGetRequestRequiredData: false,
  DoGetRequestHistory: false,
  DoGetRequestList: false,
  DoGetRequestDetails: false,
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
