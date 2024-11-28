import { reactive } from 'vue'
import type { PokemonReference } from './definitions'

type Store = {
  savedPokemonCards: PokemonReference[]
  updateList: (updatedList: PokemonReference[]) => void
  fetchList: () => void
}

export const store = reactive<Store>({
  savedPokemonCards: [],
  updateList(updatedList) {
    localStorage.setItem('savedPokemonCards', JSON.stringify(updatedList))

    console.log('updating the list..', updatedList)
    this.savedPokemonCards = updatedList
  },
  fetchList() {
    const isLocalStorageAvailable = typeof localStorage !== 'undefined'

    if (!isLocalStorageAvailable) {
      return console.log('localStorage is not available')
    }

    const savedCards: PokemonReference[] = (() => {
      try {
        return JSON.parse(localStorage.getItem('savedPokemonCards') ?? '[]')
      } catch (error) {
        console.error('Error parsing saved Pokémon:', error)
        return []
      }
    })()

    this.savedPokemonCards = savedCards
  },
})
