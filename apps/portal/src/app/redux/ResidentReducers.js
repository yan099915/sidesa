const initialState = {
  ResidentsData: false,
  errorResidentsData: false,
  ResidentDetails: false,
  errorResidentDetails: false,
  AddResident: false,
  errorAddResident: false,
  DeleteResident: false,
  errorDeleteResident: false,
};

const ResidentReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RESIDENTS':
      return {
        ...state,
        ResidentsData: action.payload.data,
        errorResidentsData: action.payload.errorMessage,
      };
    case 'GET_RESIDENT_DETAILS':
      return {
        ...state,
        ResidentDetails: action.payload.data,
        errorResidentDetails: action.payload.errorMessage,
      };
    case 'ADD_RESIDENT':
      return {
        ...state,
        AddResident: action.payload.data,
        errorAddResident: action.payload.errorMessage,
      };
    case 'DELETE_RESIDENT':
      return {
        ...state,
        DeleteResident: action.payload.data,
        errorDeleteResident: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default ResidentReducers;
