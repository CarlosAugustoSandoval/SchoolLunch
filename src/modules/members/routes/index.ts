import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/members',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/members/list',
        name: 'Members',
        component: () => import('src/modules/members/pages/MembersPage.vue')
      },
      {
        path: '/members/:id/profile',
        name: 'MemberProfile',
        props: true,
        component: () => import('src/modules/members/pages/MemberProfile.vue')
      }
    ]
  }
]

export default routes
