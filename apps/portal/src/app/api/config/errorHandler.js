// if request result is not success and contains error message
// check message if it token expired redirect to login page
function clearCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  }
}

export default function errorHandler(error) {
  // console.log(error.message);
  if (error) {
    let message;
    if (error.response) {
      // console.log(error, "Error response")
      console.log(error?.response?.data?.message, 'Error response');
      if (
        error?.response?.data?.message === 'Unauthorized' &&
        error?.response?.config?.url !== '/session'
      ) {
        localStorage.clear();
        // clear cookies delete all
        clearCookies();
        window.location.replace('/#/login');
        // window.location.origin.reload();
      }
      if (error.response.status === 500) {
        message = 'Something went terribly wrong';
      } else message = error.response.data.message;
      // if (typeof message === "string") toast.error(message);
    }
    return Promise.reject(error);
  }
}
