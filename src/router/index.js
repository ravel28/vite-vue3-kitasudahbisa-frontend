import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/layouts/user-layout.vue'),
    children: [
      {
        path: '',
        name: 'Layout',
        component: () => import('@/views/users/home-user.vue'),
        meta : {
          title: 'Welcome to kita sudah bisa'
        }
      },
    ],
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;