function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');

  console.log(cookieString, cookies, 'cookieString');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null;
}

export default getCookie;
