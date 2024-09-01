function getCookie(name) {
  const cookieArray = document.cookie.split('').map((cookie) => cookie.trim());
  console.log(cookieArray, 'cookieArray');
  for (const cookie of cookieArray) {
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

export default getCookie;
