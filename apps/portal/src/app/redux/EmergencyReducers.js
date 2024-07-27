const initialState = {
  CreateEmergency: false,
  errorCreateEmergency: false,
  EmergencyList: false,
  errorEmergencyList: false,
  EmergencyDetails: false,
  errorEmergencyDetails: false,
  CloseEmergency: false,
  errorCloseEmergency: false,
};

const EmergencyReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_EMERGENCY':
      return {
        ...state,
        CreateEmergency: action.payload.data,
        errorCreateEmergency: action.payload.errorMessage,
      };
    case 'EMERGENCY_LIST':
      return {
        ...state,
        EmergencyList: action.payload.data,
        errorEmergencyList: action.payload.errorMessage,
      };
    case 'EMERGENCY_DETAILS':
      return {
        ...state,
        EmergencyDetails: action.payload.data,
        errorEmergencyDetails: action.payload.errorMessage,
      };
    case 'CLOSE_EMERGENCY':
      return {
        ...state,
        CloseEmergency: action.payload.data,
        errorCloseEmergency: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default EmergencyReducers;
