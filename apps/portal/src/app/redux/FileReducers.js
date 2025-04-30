const initialState = {
  File: false,
  errorFile: false,
  ProfilePicture: false,
  errorProfilePicture: false,
};

const FileReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FILE':
      // console.log(action.payload, 'action.payload');
      return {
        ...state,
        File: action.payload.data,
        errorFile: action.payload.errorMessage,
      };
    case 'GET_PROFILE_PICTURE':
      // console.log(action.payload, 'action.payload');
      return {
        ...state,
        ProfilePicture: action.payload.data,
        errorProfilePicture: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default FileReducers;
