/**
 * Created by 周文博 on 2017/1/17.
 * 封装ajax操作
 */
import Util from '@Core/util';
import Data from '@Core/data';
import config from '@Core/config';

axios.defaults.baseURL = config.PROXY_URL


import axios from 'axios'

axios.defaults.timeout = 6000

//http request 拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(err)
  }
)

//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装 get 方法
 */
export function get(url, option = {}) {
  return axios
    .get(url, {
      params: option.data
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}

/**
 * 封装 post 方法
 */
export function post(url, option = {}) {
  return axios
    .post(url, option.data)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}

/**
 * 封装 put 方法
 */
export function put(url, option = {}) {
  return axios
    .put(url, option.data)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}

/**
 * 封装 delete 方法
 */
export function del(url, option = {}) {
  return axios
    .delete(url, {
      params: option.data
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}

export default {
  get,
  post,
  put,
  del
}