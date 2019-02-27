import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getUserInfo(id) {
  return request({
    url: '/getAdmin',
    method: 'get',
    params: { id: id }
  })
}

export function logout() {
  return request({
    url: '/singout',
    method: 'post'
  })
}
