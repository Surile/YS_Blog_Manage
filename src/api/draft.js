
import request from '@/utils/request'

// 获取草稿箱文章列表
export function fetchDraftList(query) {
  return request({
    url: '/draft/get',
    method: 'get',
    params: query
  })
}

// 删除草稿箱文章
export function delDraft(data) {
  return request({
    url: '/draft/delete',
    method: 'post',
    data
  })
}
