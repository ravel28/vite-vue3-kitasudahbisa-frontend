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
        path: 'edit/:id',
        name: 'user edit',
        component: () => import('@/views/users/edit-user.vue'),
        meta : {
          title: 'User Edit',
          navigation: 'Edit',
          tableName: ''
        }
      }
    ],
  },
  {
    path: "/divisi",
    name: "divisi",
        component: () => import('@/views/users/home-user.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;