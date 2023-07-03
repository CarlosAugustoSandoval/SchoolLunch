import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/cards',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/cards/list',
        name: 'Cards',
        component: () => import('src/modules/cards/pages/CardsPage.vue')
      }
    ]
  }
]

export default routes
