let hasRedirected = false;

export default function errorHandler(error) {
  if (error?.response) {
    const message = error.response.data?.message;
    const originalRequest = error.response.config;

    if (message === 'Unauthorized' && originalRequest?.url !== '/session') {
      if (!hasRedirected) {
        hasRedirected = true;
        localStorage.clear();
        sessionStorage.setItem('session_expired', 'true');
        window.location.replace('/#/login');
      }
      return;
    }
  }

  return Promise.reject(error);
}
