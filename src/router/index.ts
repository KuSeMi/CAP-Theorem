import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/cap',
      name: 'cap',
      component: () => import('../views/CapView.vue')
    },
    {
      path: '/simulation',
      name: 'simulation',
      component: () => import('../views/SimulationView.vue')
    },
    {
      path: '/databases',
      name: 'databases',
      component: () => import('../views/DatabasesView.vue')
    },
    {
      path: '/conclusion',
      name: 'conclusion',
      component: () => import('../views/ConclusionView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
