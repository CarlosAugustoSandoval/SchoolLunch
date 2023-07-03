import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      {
        path: '/auth/login',
        name: 'Login',
        component: () => import('src/modules/auth/pages/LoginPage.vue')
      }
    ]
  }
]

export default routes
