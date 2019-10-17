export const config = {
  BaseUrl:
    process.env.NODE_ENV === 'production'
      ? 'http://www.xxx.com'
      : 'http://localhost:5000'
}
