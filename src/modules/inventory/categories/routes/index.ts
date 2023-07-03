import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/inventory/categories',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/inventory/categories/list',
        name: 'Categories',
        component: () => import('src/modules/inventory/categories/pages/CategoriesPage.vue')
      }
    ]
  }
]

export default routes
