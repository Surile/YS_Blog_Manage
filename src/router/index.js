import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Home',
    children: [{
      path: 'home',
      component: () => import('@/views/home/index'),
      meta: {
        title: '首页',
        icon: 'example'
      }
    }]
  },
  {
    path: '/editorArticle',
    component: Layout,
    children: [{
      path: 'index',
      name: 'EditorArticle',
      component: () => import('@/views/editorArticle/index'),
      meta: { title: '发布文章', icon: 'example' }
    }]
  },
  {
    path: '/draftBox',
    component: Layout,
    children: [{
      path: 'index',
      name: 'DraftBox',
      component: () => import('@/views/draftBox/index'),
      meta: { title: '草稿箱', icon: 'example' }
    }]
  },
  {
    path: '/messages',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Messages',
      component: () => import('@/views/messages/index'),
      meta: { title: '留言板', icon: 'example' }
    }]
  },
  {
    path: '/personalCenter',
    component: Layout,
    children: [{
      path: 'index',
      name: 'PersonalCenter',
      component: () => import('@/views/personalCenter/index'),
      meta: { title: '账户设置', icon: 'example' }
    }],
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
