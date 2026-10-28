import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/HelloWord.vue'
import Animals from '../views/AnimalList.vue'
import Zones from '../views/ZoneList.vue'
import Foods from '../views/FoodList.vue'
import Purchases from '../views/PurchaseList.vue'
import Tickets from '../views/TicketsPage.vue'
import EntityShow from '../views/EntityShow.vue'
import EntityForm from '../views/EntityForm.vue'

// Les 4 routes CRUD d'une entité :
//   /animals          liste
//   /animals/new      formulaire vide (ADD)   <- doit rester AVANT /:id
//   /animals/:id      fiche (SHOW)
//   /animals/:id/edit formulaire pré-rempli (EDIT)
function crud(key, name, List) {
  return [
    { path: `/${key}`, name, component: List },
    { path: `/${key}/new`, name: name + 'New', component: EntityForm, props: { entity: key } },
    { path: `/${key}/:id`, name: name + 'Show', component: EntityShow, props: { entity: key } },
    { path: `/${key}/:id/edit`, name: name + 'Edit', component: EntityForm, props: { entity: key } }
  ]
}

const routes = [
  { path: '/', name: 'Home', component: Home },
  ...crud('animals', 'Animals', Animals),
  ...crud('zones', 'Zones', Zones),
  ...crud('foods', 'Foods', Foods),
  ...crud('purchases', 'Purchases', Purchases),
  { path: '/tickets', name: 'Tickets', component: Tickets },
  { path: '/:pathMatch(.*)*', redirect: '/' }
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
