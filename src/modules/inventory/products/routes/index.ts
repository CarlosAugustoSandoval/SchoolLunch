import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/inventory/products',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/inventory/products/list',
        name: 'Products',
        component: () => import('src/modules/inventory/products/pages/ProductsPage.vue')
      }
    ]
  }
]

export default routes
