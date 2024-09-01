import { Delete } from 'ckeditor5';

const initialState = {
  CreateArticle: false,
  errorCreateArticle: false,
  GetArticles: false,
  errorGetArticles: false,
  GetArticleDetails: false,
  errorGetArticleDetails: false,
  UpdateArticle: false,
  errorUpdateArticle: false,
  GetArticleStatus: false,
  errorGetArticleStatus: false,
  GetThumbnails: false,
  errorGetThumbnails: false,
  DeleteArticle: false,
  errorDeleteArticle: false,
  GetFeaturedArticles: false,
  errorGetFeaturedArticles: false,
};

const ArticlesReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ARTICLE':
      return {
        ...state,
        CreateArticle: action.payload.data,
        errorCreateArticle: action.payload.errorMessage,
      };
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
    case 'UPDATE_ARTICLE':
      return {
        ...state,
        UpdateArticle: action.payload.data,
        errorUpdateArticle: action.payload.errorMessage,
      };
    case 'DELETE_ARTICLE':
      return {
        ...state,
        DeleteArticle: action.payload.data,
        errorDeleteArticle: action.payload.errorMessage,
      };
    case 'GET_ARTICLE_STATUS':
      return {
        ...state,
        GetArticleStatus: action.payload.data,
        errorGetArticleStatus: action.payload.errorMessage,
      };
    case 'UPLOAD_ARTICLE_THUMBNAIL':
      return {
        ...state,
        UploadArticleThumbnail: action.payload.data,
        errorUploadArticleThumbnail: action.payload.errorMessage,
      };
    case 'GET_THUMBNAILS':
      return {
        ...state,
        GetThumbnails: action.payload.data,
        errorGetThumbnails: action.payload.errorMessage,
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
