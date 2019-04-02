/*
 * @Author: yu.shuang
 * @Date: 2019-01-11 16:27:13
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-01 15:31:54
 */

import { constantRouterMap } from '@/router'
import Layout from '@/views/layout/Layout'
import { getTags } from '@/api/tag'

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
    async GeneratRouters({ commit }) {
      return new Promise((resolve, reject) => {
        getTags().then(res => {
          commit('SET_ROUTERS', handleRouter(res))
          resolve()
        }).catch(() => {
          reject()
        })
      })
    }
  }
}
function handleRouter(res) {
  const asyncRouter = []
  const obj = {
    path: '/articleList',
    component: Layout,
    meta: {
      title: '文章列表',
      icon: 'example'
    },
    children: []
  }
  res.forEach(item => {
    obj.children.push({
      name: item.label,
      path: `${item.label}`,
      component: () => import('@/views/articleList/index'),
      meta: { title: `${item.label}`, tagId: item.id }
    })
  })
  asyncRouter.push(obj)
  asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
  return asyncRouter
}
export default routers
