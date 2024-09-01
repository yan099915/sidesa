import axios from '../config/index';

//  get article start here
export const getArticle = (param) => async (dispatch) => {
  await axios
    .get('/public/articles', { params: param })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_ARTICLES',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_ARTICLES',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_ARTICLES',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_ARTICLES',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// get featured articles
export const getFeaturedArticles = () => async (dispatch) => {
  await axios
    .get('/public/featured-articles')
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_FEATURED_ARTICLES',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_FEATURED_ARTICLES',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_FEATURED_ARTICLES',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_FEATURED_ARTICLES',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// get article details start here
export const getArticleDetails = (id) => async (dispatch) => {
  await axios
    .get(`/public/article/${id}`)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_ARTICLE_DETAILS',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_ARTICLE_DETAILS',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_ARTICLE_DETAILS',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_ARTICLE_DETAILS',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};
