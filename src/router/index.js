import { createRouter, createWebHistory } from 'vue-router'

/**
 * C'est ici qu'on spécifie quel composant on charge selon l'url
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component:  () => import('@/views/Accueil.vue')
    },
    {
      path: '/films',
      component:  () => import('@/views/Films.vue')
    },
    {
      path: '/films/nouveau',
      component:  () => import('@/views/Film.vue')
    },
    {
      path: '/genres',
      component:  () => import('@/views/Genres.vue')
    },
    {
      path: '/login',
      component:  () => import('@/views/PageLogin.vue')
    },
    {
      path: '/membres',
      component:  () => import('@/views/Membres.vue')
    },
    {
      path: '/participants',
      component:  () => import('@/views/Participants.vue')
    },
    {
      path: '/films/:id',
      component:  () => import('@/views/Film.vue')
    },
    {
      path: '/films/:id/avis',
      component:  () => import('@/views/Avis.vue')
    }
  ],
})

export default router
