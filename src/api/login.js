import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function signUp(username, password) {
  return request({
    url: '/signUp',
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
    url: '/getAdmin',
    method: 'get',
    data: { id }
  })
}

export function logout() {
  return request({
    url: '/singout',
    method: 'post'
  })
}
