const initialState = {
  RequestHistory: false,
  errorRequestHistory: false,
  RequestList: false,
  errorRequestList: false,
  CreateRequest: false,
  errorCreateRequest: false,
  RequestDetails: false,
  errorRequestDetails: false,
};

const RequestReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_HISTORY':
      return {
        ...state,
        RequestHistory: action.payload.data,
        errorRequestHistory: action.payload.errorMessage,
      };
    case 'REQUEST_LIST':
      return {
        ...state,
        RequestList: action.payload.data,
        errorRequestList: action.payload.errorMessage,
      };
    case 'CREATE_REQUEST':
      return {
        ...state,
        CreateRequest: action.payload.data,
        errorCreateRequest: action.payload.errorMessage,
      };
    case 'REQUEST_DETAILS':
      return {
        ...state,
        RequestDetails: action.payload.data,
        errorRequestDetails: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default RequestReducers;
