/*
 * @Author: yu.shuang
 * @Date: 2019-01-11 16:27:13
 * @Last Modified by: yu.shuang
 * @Last Modified time: 2019-01-14 14:15:21
 */

import {
  constantRouterMap
} from '@/router'
import Layout from '../../views/layout/Layout'
// import { _getArticleRouters } from '@/api/router'

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
      path: item.name,
      name: item.name,
      component: () => import('@/views/articleList/index'),
      meta: { title: `${item.name}（${item.articleCount}）` }
    })
  })
  res.push(obj)
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
      console.log('state.routers', state.routers)
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
