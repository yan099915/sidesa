const initialState = {
  GetResidentReport: false,
  errorGetResidentReport: false,
  GetPortalReport: false,
  errorGetPortalReport: false,
};

const ReportReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RESIDENT_REPORT':
      return {
        ...state,
        GetResidentReport: action.payload.data,
        errorGetResidentReport: action.payload.errorMessage,
      };
    case 'GET_PORTAL_REPORT':
      return {
        ...state,
        GetPortalReport: action.payload.data,
        errorGetPortalReport: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default ReportReducers;
