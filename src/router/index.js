import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/users/',
    name: 'Users',
    component: () => import('@/layouts/user-layout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/users/home-user.vue'),
        meta : {
          title: 'Dashboard',
          navigation: 'Dashboard',
          tableName: 'Home'
        }
      },
      {
        path: 'list',
        name: 'user info',
        component: () => import('@/views/users/table-user.vue'),
        meta : {
          title: 'List User',
          navigation: 'List User',
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
    component: () => import('@/layouts/user-layout.vue'),
    children: [
      {
        path: 'list',
        name: 'divisi info',
        component: () => import('@/views/divisions/table-divisi.vue'),
        meta : {
          title: 'List divisi',
          navigation: 'List Divisi',
          tableName: 'List Divisi'
        }
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;