import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/courses',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/courses/list',
        name: 'Courses',
        component: () => import('src/modules/courses/pages/CoursesPage.vue')
      }
    ]
  }
]

export default routes
