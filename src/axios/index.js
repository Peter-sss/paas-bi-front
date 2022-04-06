import axios from 'axios'
import { message } from 'antd'
import { getToken, reLogin } from './auth'

const ERROR_CODE = [
  401,
  402,
  403,
  50 // token失效
]
// create an axios instance
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  headers: { 'Content-Type': 'application/json' },
  // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 0 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // if (config.data) {
    //   config.data = Qs.stringify(config.data)
    // }
    // do something before request is sent
    if (getToken()) {
      // let each request carry token
      config.headers.token = getToken()
    } else {
      reLogin()
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    if (res.status !== 0 && res.code !== 200) {
      message.warn(res.message || 'Error')
      if (ERROR_CODE.includes(res.code)) {
        reLogin()
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    error.message && message.warn(error.message || 'Error')
    return Promise.reject(error)
  }
)

export default service

/**
 * GET请求方法
 * @param {String} url 请求地址
 * @param {json} json 请求参数
 */
export function getData (url, params = {}) {
  return service({
    url,
    method: 'get',
    params
  })
}

export function postData (url, data = {}) {
  return service({
    url,
    method: 'get',
    data
  })
}


