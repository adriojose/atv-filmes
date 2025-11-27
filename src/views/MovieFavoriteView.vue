<script setup>
import { useFavoritesStore } from '@/stores/favorites'
import { useRouter } from 'vue-router'

const router = useRouter()
const favoritesStore = useFavoritesStore()

function openMovie(id) {
  router.push({ name: 'MovieDetails', params: { movieId: id } })
}
</script>

<template>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <div class="favoritos">
    <h1>Filmes Curtidos</h1>

    <div v-if="favoritesStore.favorites.length === 0" class="empty">
      <p>Nenhum filme curtido ainda ⭐</p>
    </div>

    <div class="movie-list" v-else>
      <div 
        class="movie-card"
        v-for="movie in favoritesStore.favorites"
        :key="movie.id"
        @click="openMovie(movie.id)"
      >
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path} `" 
            />
        <div class="favoritados">
             <p>{{ movie.title }}</p>
        <button
  class="fav-btn"
  @click.stop="favoritesStore.toggleFavorite(movie)"
>
  <span v-if="favoritesStore.isFavorite(movie.id)"><i class="fa-solid fa-star"></i></span>
  <span v-else><i class="fa-regular fa-star"></i></span>
</button>
        </div>
       
      </div>
    </div>
  </div>
</template>

 <style scoped>

 .favoritos {
    background-color: #121826;
    min-height: 100vh;
    padding-top: 5vw;
    padding-bottom: 2vw;
 }
 .favoritos h1 {
    font-size: 2.5vw;
    margin-left: 8vw;
    color: white;
    margin-bottom:3vw;
 }
.movie-list {
  display: grid;
  grid-template-columns: 200px 200px 200px 200px 200px;
  gap: 3rem;
  justify-content: center; 
  width: 100%;
  
}

.favoritados {
    display: flex;
    
}
.fav-btn {
     color: yellow;
 border: none;
 background-color: #121826;
 cursor: pointer;
 font-size: 15px;
 margin-left: 4vw;
}

.movie-card {
     padding: 0vw 0vw 5vw 0vw;
     border-radius: 0.3rem;
     overflow: hidden;
     box-shadow: 0 0 0.5rem #000;
    
}

   .movie-card img {
     width: 15vw;
    gap: 7vw;
    border-radius: 0.3rem;
    box-shadow: 0 0 0.5rem #000;
    border-bottom: 2px solid green;
   }
   
.movie-card p {
  color: white;
  padding: 0.5vw;
  font-size: 1vw;
  font-weight: bold;
  line-height: 1.2rem;  
   height: 2.4rem; 
}

 </style>