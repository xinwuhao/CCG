import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
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
        component: () => import('../views/homepage/homepage.vue'),
        meta: {
          title: '首页',
          meta: '/good'
        }
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('../views/goods/categories.vue'),
        meta: {
          title: '商品分类',
          meta: '/categories'
        }
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('../views/goods/params.vue'),
        meta: {
          title: '分类参数',
          meta: '/params'
        }
      },

      {
        path: '/orders',
        name: 'orders',
        component: () => import('../views/order/orders.vue'),
        meta: {
          title: '订单列表',
          meta: '/orders'
        }
      },

      {
        path: '/reports',
        name: 'reports',
        component: () => import('../views/information/reports.vue'),
        meta: {
          title: '数据报表',
          meta: '/reports'
        }
      },

      {
        path: '/roles',
        name: 'roles',
        component: () => import('../views/power/roles.vue'),
        meta: {
          title: '角色列表',
          meta: '/roles'
        }
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('../views/power/rights.vue'),
        meta: {
          title: '权限列表',
          meta: '/rights'
        }
      },

      {
        path: '/users',
        name: 'users',
        component: () => import('../views/user/users.vue'),
        meta: {
          title: '用户列表',
          meta: '/users'
        }
      },
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/404/404.vue'),
    meta: {
      title: '404'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  next()
})

export default router
