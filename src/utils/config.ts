export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://www.xxx.com'
    : 'http://localhost:5000'

export const SOCKET_BASE_URL = BASE_URL + '/signalr'
