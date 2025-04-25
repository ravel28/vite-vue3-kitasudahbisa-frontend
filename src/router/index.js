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
        name: 'user info',
        component: () => import('@/views/users/home-user.vue'),
        meta : {
          title: 'Dashboard',
          navigation: 'Dashboard',
          tableName: 'List User'
        }
      },
      {
        path: 'divisi',
        name: 'divisi info',
        component: () => import('@/views/users/home-user.vue'),
        meta : {
          title: 'Divisions',
          navigation: 'Dashboard',
          tableName: 'List Divisi'
        }
      }
    ],
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;