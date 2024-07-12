const initialState = {
  FamilyInfo: false,
  errorFamilyInfo: false,
};

const FamilyReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FAMILY_INFO':
      return {
        ...state,
        FamilyInfo: action.payload.data,
        errorFamilyInfo: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default FamilyReducers;
