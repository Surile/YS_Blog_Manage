import axios from 'axios'
import qs from 'qs'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '../store'
import {
  getToken
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if(config.method === 'post'){
      config.data = qs.stringify(config.data);
    }
    if (store.getters.token) {
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  res => {
    console.log(res)
    /**
     * status为非200是抛错 可结合自己业务进行修改
     */
    if (res.status !== 200) {
      Message({
        message: res.data.message,
        type: 'error',
        duration: 3 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.status === 401) {
        MessageBox.confirm(
          '身份验证未通过，请重新登录',
          '确定登出', {
            confirmButtonText: '重新登录',
            showCancelButton: false,
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      if (res.data.success) {
        Message({
          message: res.data.message,
          type: 'success',
          duration: 3 * 1000
        })
        return res.data.data
      } else {
        Message({
          message: res.data.message,
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject('error')
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
