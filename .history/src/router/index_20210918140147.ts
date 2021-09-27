import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/homepage/homepage.vue'
import Layout from '../views/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Logon',
    component: () => import('../views/login/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    component: Layout,
    // 子路由: children
    children: [
      {
        path: '/homepage',
        name: 'homepage',
        component: ()=> import ('../views/homepage/homepage.vue'),
        meta: {
          title: '首页',
          meta: '/homepage'
        }
      },

    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to);
  
  document.title = to.meta.title as string
  next()
})

export default router
