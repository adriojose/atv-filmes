import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref([])

  // Carrega do localStorage ao iniciar
  if (localStorage.getItem('favorites')) {
    favorites.value = JSON.parse(localStorage.getItem('favorites'))
  }

  const toggleFavorite = (movie) => {
    const exists = favorites.value.find(f => f.id === movie.id)

    if (exists) {
      // remover
      favorites.value = favorites.value.filter(f => f.id !== movie.id)
    } else {
      // adicionar
      favorites.value.push(movie)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  const isFavorite = (id) => {
    return favorites.value.some(f => f.id === id)
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite
  }
})
