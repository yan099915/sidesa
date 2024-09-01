// if request result is not success and contains error message
// check message if it token expired redirect to login page

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
