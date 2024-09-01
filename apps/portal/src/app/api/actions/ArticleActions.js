import axios from '../config/index';

//  create article start here
export const createArticle = (data) => async (dispatch) => {
  await axios
    .post('/article', data)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'CREATE_ARTICLE',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'CREATE_ARTICLE',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'CREATE_ARTICLE',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'CREATE_ARTICLE',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

//  get article start here
export const getArticle = (param) => async (dispatch) => {
  await axios
    .get('/articles', { params: param })
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

// get article details start here
export const getArticleDetails = (id) => async (dispatch) => {
  await axios
    .get(`/article/${id}`)
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

// update article start here
export const updateArticle = (data) => async (dispatch) => {
  await axios
    .put(`/article`, data)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'UPDATE_ARTICLE',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'UPDATE_ARTICLE',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'UPDATE_ARTICLE',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'UPDATE_ARTICLE',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// delete article start here
export const deleteArticle = (id) => async (dispatch) => {
  await axios
    .delete(`/article/${id}`)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'DELETE_ARTICLE',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'DELETE_ARTICLE',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'DELETE_ARTICLE',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'DELETE_ARTICLE',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// get article status start here
export const getArticleStatus = (id) => async (dispatch) => {
  await axios
    .get(`/article-status`)
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_ARTICLE_STATUS',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_ARTICLE_STATUS',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_ARTICLE_STATUS',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_ARTICLE_STATUS',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// upload article thumbnail start here
export const uploadArticleThumbnail = (data) => async (dispatch) => {
  await axios
    .post('/article-thumbnail', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'UPLOAD_ARTICLE_THUMBNAIL',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'UPLOAD_ARTICLE_THUMBNAIL',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'UPLOAD_ARTICLE_THUMBNAIL',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'UPLOAD_ARTICLE_THUMBNAIL',
          payload: { data: false, errorMessage: error.message },
        });
      }
    });
};

// get thumbnails start here
export const getThumbnails = (param) => async (dispatch) => {
  await axios
    .get('/article-thumbnail', { params: param })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: 'GET_THUMBNAILS',
          payload: { data: response.data, errorMessage: false },
        });
      } else {
        dispatch({
          type: 'GET_THUMBNAILS',
          payload: { data: response, errorMessage: false },
        });
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        dispatch({
          type: 'GET_THUMBNAILS',
          payload: { data: false, errorMessage: error.response.data.message },
        });
      } else {
        dispatch({
          type: 'GET_THUMBNAILS',
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
