import { createRouter, createWebHistory } from 'vue-router'
import SearchPokemonLaylout from '@/components/SearchPokemonLayout.vue'
import Favorites from '@/components/SearchPokemonFavorites.vue'

const routes = [
  { path: '/', component: SearchPokemonLaylout, name: 'search' },
  { path: '/favorites', component: Favorites, name: 'favorites' },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
