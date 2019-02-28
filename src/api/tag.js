import request from '@/utils/request'

export function getTags() {
  return request({
    url: '/getTag',
    method: 'get'
  })
}
