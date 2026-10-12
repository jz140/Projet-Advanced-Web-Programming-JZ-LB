import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/HelloWord.vue'
import Animals from '../views/AnimalList.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router