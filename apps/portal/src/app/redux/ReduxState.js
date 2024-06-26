const initialState = {
  LoginStatus: false,
  DoDispatch: false,
  DoGetMenu: false,
  DoCheckSession: false,
  DoVerifySession: false,
  DoCheckVerificationStatus: false,
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
