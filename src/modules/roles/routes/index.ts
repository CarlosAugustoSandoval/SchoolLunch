import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/roles',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/roles/list',
        name: 'Roles',
        component: () => import('src/modules/roles/pages/RolesPage.vue')
      }
    ]
  }
]

export default routes
