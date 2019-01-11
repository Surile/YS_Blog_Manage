import request from '@/utils/request'

export function _getArticleRouters(username, password) {
  return request({
    url: '/tags',
    method: 'get',
    data: {
      username,
      password
    }
  })
}
