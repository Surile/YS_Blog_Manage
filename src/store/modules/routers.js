/*
 * @Author: yu.shuang
 * @Date: 2019-01-11 16:27:13
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-28 10:38:42
 */

import {
  constantRouterMap
} from '@/router'
import Layout from '../../views/layout/Layout'

function constructArticleListRouter() {
  const arr = [{
    id: 1,
    name: 'JavaScript',
    articleCount: 5
  }, {
    id: 2,
    name: 'HTML',
    articleCount: 2
  }, {
    id: 3,
    name: 'CSS',
    articleCount: 8
  }, {
    id: 4,
    name: 'Vue',
    articleCount: 5
  }]

  const res = []

  const obj = {
    path: '/articleList',
    component: Layout,
    meta: {
      title: '文章列表',
      icon: 'example'
    },
    children: []
  }
  arr.forEach(item => {
    obj.children.push({
      path: `${item.name}`,
      component: () => import('@/views/articleList/index'),
      meta: { title: `${item.name}（${item.articleCount}）` }
    })
  })
  res.push(obj)
  res.push({ path: '*', redirect: '/404', hidden: true })
  return res
}

const routers = {
  state: {
    addRouters: [],
    routers: constantRouterMap
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GeneratRouters({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_ROUTERS', constructArticleListRouter())
        resolve()
      })
    }
  }
}

export default routers
