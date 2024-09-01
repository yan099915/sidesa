const initialState = {
  GetArticles: false,
  errorGetArticles: false,
  GetArticleDetails: false,
  errorGetArticleDetails: false,
  GetFeaturedArticles: false,
  errorGetFeaturedArticles: false,
};

const ArticlesReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ARTICLES':
      return {
        ...state,
        GetArticles: action.payload.data,
        errorGetArticles: action.payload.errorMessage,
      };
    case 'GET_ARTICLE_DETAILS':
      return {
        ...state,
        GetArticleDetails: action.payload.data,
        errorGetArticleDetails: action.payload.errorMessage,
      };
    case 'GET_FEATURED_ARTICLES':
      return {
        ...state,
        GetFeaturedArticles: action.payload.data,
        errorGetFeaturedArticles: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default ArticlesReducers;
