import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ServiceProxyExtention } from './service.proxy.extenstions'
import { config } from './config'

import router from '@/router'

class OpenApi {
  public fetch: ServiceProxyExtention
  constructor() {
    const instance = axios.create({
      timeout: 10 * 1000
    })
    instance.interceptors.request.use(
      (requestConfig: AxiosRequestConfig) => {
        if (requestConfig.headers) {
          const token = sessionStorage.getItem('token')
          requestConfig.headers.Authorization = 'Bearer ' + token
        }
        return requestConfig
      },
      (err) => {
        return Promise.reject(err)
      }
    )
    instance.interceptors.response.use(
      (resp: AxiosResponse<any>) => {
        return resp
      },
      (err) => {
        // console.log(err.response)
        switch (err.response.status) {
          case 401:
          case 403:
            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            router.replace({
              name: 'login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
            break
          default:
            break
        }
        return Promise.reject(err)
      }
    )
    this.fetch = new ServiceProxyExtention(config.BaseUrl, instance)
  }
}
export default new OpenApi()
