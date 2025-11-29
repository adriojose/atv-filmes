import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref([])

 
  if (localStorage.getItem('favorites')) {
    favorites.value = JSON.parse(localStorage.getItem('favorites'))
  }

  const toggleFavorite = (item) => {
    const exists = favorites.value.find(f => f.id === item.id)

    if (exists) {
      favorites.value = favorites.value.filter(f => f.id !== item.id)
    } else {
      favorites.value.push({
        ...item,
        media_type: item.media_type || (item.title ? "movie" : "tv")
      })
    }

    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  const isFavorite = (id) => {
    return favorites.value.some(f => f.id === id)
  }

  return { favorites, toggleFavorite, isFavorite }
})
