const initialState = {
  DoDispatch: false,
  Loading: false,

  DoGetArticles: false,
  DoGetArticleDetails: false,
  DoGetFeaturedArticles: false,
  DoGetAnnouncements: false,
  DoGetAnnouncementDetails: false,

  // SocketConnection: false,

  // user reducers
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
