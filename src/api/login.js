import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: '/getAdmin',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/singout',
    method: 'post'
  })
}
