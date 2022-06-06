import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('./components/Main/Index.vue')
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('./components/Play/Index.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('./components/Main/Settings.vue')
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})