/*
 * @Author: yu.shuang
 * @Date: 2019-01-11 16:27:13
 * @Last Modified by: yu.shuang
 * @Last Modified time: 2019-01-11 18:01:15
 */

import {
  constantRouterMap
} from '@/router'
// import { _getArticleRouters } from '@/api/router'

function constructArticleListRouter(data) {
  let articleListRouter
  // let arr = [{
  //   id: 1,
  //   name: 'javaScript',
  //   articleCount: 5
  // }, {
  //   id: 2,
  //   name: 'HTML',
  //   articleCount: 2
  // }, {
  //   id: 3,
  //   name: 'CSS',
  //   articleCount: 8
  // }, {
  //   id: 4,
  //   name: 'Vue',
  //   articleCount: 5
  // }]
  constantRouterMap.forEach(element => {
    if (element.path === '/articleList') {
      console.log(1)
    }
  })
  return articleListRouter
}

const routers = {
  state: {
    routers: constantRouterMap,
    addRouter: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouter = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GeneratRouters({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_ROUTERS', constructArticleListRouter(data))
        resolve()
      })
    }
  }
}

export default routers
