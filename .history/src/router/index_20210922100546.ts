import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/homepage/homepage.vue'
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
        path: '/',
        name: '/',
        component: () => import('../views/homepage/homepage.vue'),
        meta: {
          title: '首页',
          meta: '/homepage'
        }
      },
      {
        path: '/discount',
        name: 'discount',
        component: () => import('../views/discount/discount.vue'),
        meta: {
          title: '优惠券管理',
          meta: '/discount'
        }
      },
      {
        path: '/navigation',
        name: 'navigation',
        component: () => import('../views/navigation/navigation.vue'),
        meta: {
          title: '推荐导航',
          meta: '/navigation'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/user.vue'),
        meta: {
          title: '用户管理',
          meta: '/user'
        }
      },
   
      {
        path: '/addgoods',
        name: 'addgoods',
        component: () => import('../views/goods/addgoods.vue'),
        meta: {
          title: '添加商品',
          meta: '/addgoods'
        }
      },
      {
        path: '/sortgoods',
        name: 'sortgoods',
        component: () => import('../views/goods/sortgoods.vue'),
        meta: {
          title: '商品分类',
          meta: '/sortgoods'
        }
      },
      {
        path: '/modelgoods',
        name: 'modelgoods',
        component: () => import('../views/goods/modelgoods.vue'),
        meta: {
          title: '商品模型',
          meta: '/modelgoods'
        }
      },
      {
        path: '/specsgoods',
        name: 'specsgoods',
        component: () => import('../views/goods/specsgoods.vue'),
        meta: {
          title: '商品规格',
          meta: '/specsgoods'
        }
      },
      {
        path: '/parametergoods',
        name: 'parametergoods',
        component: () => import('../views/goods/parametergoods.vue'),
        meta: {
          title: '商品参数',
          meta: '/parametergoods'
        }
      },
      {
        path: '/specifications',
        name: 'specifications',
        component: () => import('../views/goods/specifications.vue'),
        meta: {
          title: '规格参数',
          meta: '/specifications'
        }
      },
      {
        path: '/seckill',
        name: 'seckill',
        component: () => import('../views/seckill/seckill.vue'),
        meta: {
          title: '秒杀管理',
          meta: '/seckill'
        }
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/order/order.vue'),
        meta: {
          title: '订单管理',
          meta: '/order'
        }
      },
      {
        path: '/notice',
        name: 'notice',
        component: () => import('../views/notice/notice.vue'),
        meta: {
          title: '通知管理',
          meta: '/notice'
        }
      },
      {
        path: '/news',
        name: 'news',
        component: () => import('../views/news/news.vue'),
        meta: {
          title: '客服消息',
          meta: '/news'
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
  document.title = to.meta.title as string
  next()
})

export default router
