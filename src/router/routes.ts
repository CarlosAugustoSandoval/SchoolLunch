import { RouteRecordRaw } from 'vue-router'
import authRoutes from 'src/modules/auth/routes'
import usersRoutes from 'src/modules/users/routes'
import rolesRoutes from 'src/modules/roles/routes'
import gradesRoutes from 'src/modules/grades/routes'
import coursesRoutes from 'src/modules/courses/routes'
import labelsRoutes from 'src/modules/labels/routes'
import membersRoutes from 'src/modules/members/routes'
import cardsRoutes from 'src/modules/cards/routes'
import productsRoutes from 'src/modules/inventory/products/routes'
import CategoriesRoutes from 'src/modules/inventory/categories/routes'
import SalesRoutes from 'src/modules/sales/routes'

const routes: RouteRecordRaw[] = [
  ...authRoutes,
  ...usersRoutes,
  ...rolesRoutes,
  ...gradesRoutes,
  ...coursesRoutes,
  ...labelsRoutes,
  ...membersRoutes,
  ...cardsRoutes,
  ...productsRoutes,
  ...CategoriesRoutes,
  ...SalesRoutes,
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
