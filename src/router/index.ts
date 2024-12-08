import { createRouter, createWebHistory } from 'vue-router'
import SearchPokemonLaylout from '@/components/SearchPokemonLayout.vue'
import Favorites from '@/components/SearchPokemonFavorites.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'

const routes = [
  { path: '/', component: SearchPokemonLaylout, name: 'search' },
  { path: '/favorites', component: Favorites, name: 'favorites' },
  { path: '/:pathMatch(.*)*', component: ErrorComponent, name: '404-not-found' },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
