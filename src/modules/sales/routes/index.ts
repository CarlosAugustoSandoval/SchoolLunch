import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/sale',
    component: () => import('src/modules/sales/layouts/SaleLayout.vue'),
    children: [
      {
        path: '/sale/register',
        name: 'SaleRegister',
        component: () => import('src/modules/sales/pages/SaleRegister.vue')
      }
    ]
  },
  {
    path: '/sales',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/sales/list',
        name: 'Sales',
        component: () => import('src/modules/sales/pages/SalesPage.vue')
      }
    ]
  }
]

export default routes
