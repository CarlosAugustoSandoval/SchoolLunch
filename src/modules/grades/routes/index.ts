import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/grades',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/grades/list',
        name: 'Grades',
        component: () => import('src/modules/grades/pages/GradesPage.vue')
      }
    ]
  }
]

export default routes
