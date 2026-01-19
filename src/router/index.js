import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/dashboard/',
    name: 'Dasboard',
    component: () => import('@/layouts/user-layout.vue'),
    meta: {
      navigation : 'Dashboard'
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/users/home-user.vue'),
        meta : {
          title: 'Dashboard',
          navigation: 'Dashboard',
          tableName: ''
        }
      }
    ]
  },
  {
    path: '/users/',
    name: 'Users',
    component: () => import('@/layouts/user-layout.vue'),
    meta: {
      navigation : 'Users'
    },
    children: [
      {
        path: 'list',
        name: 'User Info',
        component: () => import('@/views/users/table-user-test.vue'),
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
    path: '/positions/',
    name: 'Position',
    component: () => import('@/layouts/user-layout.vue'),
    meta: {
      navigation : 'Position'
    },
    children: [
      {
        path: 'list',
        name: 'Position Info',
        component: () => import('@/views/positions/table-position.vue'),
        meta : {
          title: 'List Position',
          navigation: 'List Position',
          tableName: 'position'
        }
      }
    ]
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