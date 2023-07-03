import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/users',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/users/list',
        name: 'Users',
        component: () => import('src/modules/users/pages/UsersPage.vue')
      }
    ]
  }
]

export default routes
