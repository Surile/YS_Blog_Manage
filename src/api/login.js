import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(id) {
  console.log('api', id)
  return request({
    url: '/admin/getAdmin',
    method: 'get',
    data: { id }
  })
}

export function signUp(username, password) {
  return request({
    url: '/admin/signUp',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
