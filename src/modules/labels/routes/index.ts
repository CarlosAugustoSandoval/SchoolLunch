import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/labels',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/labels/list',
        name: 'Labels',
        component: () => import('src/modules/labels/pages/LabelsPage.vue')
      }
    ]
  }
]

export default routes
