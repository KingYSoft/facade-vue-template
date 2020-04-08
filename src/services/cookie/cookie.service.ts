export default class CookieService {
  getCookieValue = (key: string): string => {
    return key;
  };

  setCookieValue = (key: string, value: string, expireDate?: Date, path?: string): void => {
    let cookieValue = encodeURIComponent(key) + '=';

    if (value) {
      cookieValue = cookieValue + encodeURIComponent(value);
    }

    if (expireDate) {
      cookieValue = cookieValue + '; expires=' + expireDate.toUTCString();
    }

    if (path) {
      cookieValue = cookieValue + '; path=' + path;
    }

    // if (domain) {
    //   cookieValue = cookieValue + '; domain=' + domain;
    // }

    document.cookie = cookieValue;
  };

  deleteCookie = (key: string, path?: string): void => {
    console.log(key, path);
  };
}
