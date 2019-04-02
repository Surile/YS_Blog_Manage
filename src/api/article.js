import request from '@/utils/request'

// 获取文章
export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

// 创建文章
export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

// 更新文章
export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

// 根据tagId获取文章
export function fetchArticleByTagId(tagId) {
  console.log('tagId', tagId)
  return request({
    url: '/article/getByTagId',
    method: 'get',
    params: tagId
  })
}
