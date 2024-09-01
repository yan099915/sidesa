const initialState = {
  ResendVerification: false,
  errorResendVerification: false,
  UserRegister: false,
  errorUserRegister: false,
  VerifyEmail: false,
  errorVerifyEmail: false,
  UserLogin: false,
  errorUserLogin: false,
  UserSession: false,
  errorUserSession: false,
  UserLogout: false,
  errorUserLogout: false,
  UserMenu: false,
  errorUserMenu: false,
  RequestVerification: false,
  errorRequestVerification: false,
  RequestVerificationStatus: false,
  errorRequestVerificationStatus: false,
  ProfileDetails: false,
  errorProfileDetails: false,
};

const UsersReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'RESEND_VERIFICATION':
      return {
        ...state,
        ResendVerification: action.payload.data,
        errorResendVerification: action.payload.errorMessage,
      };
    case 'USER_REGISTER':
      return {
        ...state,
        UserRegister: action.payload.data,
        errorUserRegister: action.payload.errorMessage,
      };
    case 'EMAIL_VERIFY':
      return {
        ...state,
        VerifyEmail: action.payload.data,
        errorVerifyEmail: action.payload.errorMessage,
      };
    case 'USER_LOGIN':
      return {
        ...state,
        UserLogin: action.payload.data,
        errorUserLogin: action.payload.errorMessage,
      };
    case 'VERIFY_SESSION':
      return {
        ...state,
        UserSession: action.payload.data,
        errorUserSession: action.payload.errorMessage,
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        UserLogout: action.payload.data,
        errorUserLogout: action.payload.errorMessage,
      };
    case 'USER_MENU':
      return {
        ...state,
        UserMenu: action.payload.data,
        errorUserMenu: action.payload.errorMessage,
      };
    case 'GET_PROFILE_DETAILS':
      return {
        ...state,
        ProfileDetails: action.payload.data,
        errorProfileDetails: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default UsersReducers;
