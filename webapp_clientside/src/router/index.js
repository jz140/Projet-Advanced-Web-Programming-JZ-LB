import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/HelloWord.vue'
import Animals from '../views/AnimalList.vue'
import Zones from '../views/ZoneList.vue'
import Tickets from '../views/TicketsPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/animals',
    name: 'Animals',
    component: Animals
  },
  {
    path: '/zones',
    name: 'Zones',
    component: Zones
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Retour arrière du navigateur : on retrouve la position précédente
    if (savedPosition) return savedPosition
    // Liens du type /#ancre : on défile jusqu'à la section
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    // Simple changement de filtre sur la même page : on ne bouge pas
    if (to.path === from.path) return false
    return { top: 0 }
  }
})

export default router