const initialState = {
  RequestVerification: false,
  errorRequestVerification: false,
  RequestVerificationStatus: false,
  errorRequestVerificationStatus: false,
  GetVerificationData: false,
  errorGetVerificationData: false,
  VerificationRequestDetails: false,
  errorVerificationRequestDetails: false,
  VerificationApproval: false,
  errorVerificationApproval: false,
};

const UsersReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_VERIFICATION':
      return {
        ...state,
        RequestVerification: action.payload.data,
        errorRequestVerification: action.payload.errorMessage,
      };
    case 'VERIFICATION_REQUEST_STATUS':
      return {
        ...state,
        RequestVerificationStatus: action.payload.data,
        errorRequestVerificationStatus: action.payload.errorMessage,
      };
    case 'GET_VERIFICATIONS_REQUEST':
      return {
        ...state,
        GetVerificationData: action.payload.data,
        errorGetVerificationData: action.payload.errorMessage,
      };
    case 'VERIFICATIONS_REQUEST_DETAILS':
      return {
        ...state,
        VerificationRequestDetails: action.payload.data,
        errorVerificationRequestDetails: action.payload.errorMessage,
      };
    case 'VERIFICATION_APPROVAL':
      return {
        ...state,
        VerificationApproval: action.payload.data,
        errorVerificationApproval: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default UsersReducers;
