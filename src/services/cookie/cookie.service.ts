export default class CookieService {
  getCookieValue(key: string): string {
    return key;
  }

  setCookieValue(key: string, value: string, expireDate?: Date, path?: string): void {
    console.log(key, value, expireDate, path);
  }

  deleteCookie(key: string, path?: string): void {
    console.log(key, path);
  }
}
