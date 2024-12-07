import { defineStore } from 'pinia'

type SavedPokemonStore = {
  savedPokemonCards: PokemonReference[]
}

export const usePokemonStore = defineStore('pokemons', {
  state: (): SavedPokemonStore => ({ savedPokemonCards: [] }),
  persist: true,
  actions: {
    updateList(updatedList: PokemonReference[]): void {
      console.log('updating the list..', updatedList)
      this.savedPokemonCards = updatedList
    },
  },
})
