<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'   

const router = useRouter()
const favoritesStore = useFavoritesStore()               

const recommended = ref([])

const recommendedIds = [1242898, 617126, 1061474, 1234821, 552524, 533535, 157336]

const loadRecommended = async () => {
  recommended.value = []
  for (const id of recommendedIds) {
    const res = await api.get(`/movie/${id}`, {
      params: { language: 'pt-BR' }
    })
    recommended.value.push(res.data)
  }
}

function openMovie(id) {
  router.push({ name: 'MovieDetails', params: { movieId: id } })
}

onMounted(() => {
  loadRecommended()
})
</script>


<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <div class="banner">
    <img src="/src/assets/Rectangle 1072.png" alt="">
    <div class="info">
      <h1>STAR WARS</h1>
      <p>
        Star Wars é uma fantasia que combina romance, drama, <br>
        humor e a tradicional batalha entre bem e mal. No centro <br>
        da história está um conflito político: de um lado, um império <br>
        tirano que domina a galáxia; do outro, um grupo rebelde <br>
        que luta pela liberdade e pela queda desse regime opressor.
      </p>
    </div>
  </div>

  <div class="emalta">
    <h2>Em alta</h2>
    <img src="/src/assets/image 5.png" alt="">
  </div>

 
  <div class="recomendados">

    <div class="recomendados-list">
      <div
        class="movie-card"
        v-for="movie in recommended"
        :key="movie.id"
        @click="openMovie(movie.id)"
        
      >
      
        <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          
        />
        <div class="star">
           <p>{{ movie.title }}</p>
          <button
        class="fav-btn"
        @click.stop="favoritesStore.toggleFavorite(movie)"
      >
        <span v-if="favoritesStore.isFavorite(movie.id)">
          <i class="fa-solid fa-star"></i>
        </span>
        <span v-else>
          <i class="fa-regular fa-star"></i>
        </span>
      </button>
        </div>
       
      </div>   
    </div> 
  </div>
</template>

<style scoped>

.banner {
  position: relative;
  background: url(/src/assets/force_feat\ 1.png);
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  

}

/* Overlay escuro */
.banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45); /* Ajuste a opacidade aqui */
  z-index: 1;
}

/* Garantir que o conteúdo fique acima do overlay */
.banner img,
.banner .info {
  position: relative;
  z-index: 2;
}
.banner img{
  height: 80%;
  width: auto;
  border-radius: 16px;
}

.star {
  display: flex;
  justify-content: center;
}
.star button {
 background-color: #121826;
  color: yellow;
 border: none;
 cursor: pointer;
 font-size: 15px;
}
.info {
  color: white;
}
.info p {
  font-size:24px
}
.info h1 {
  font-size: 4vw;
}


.emalta {
  background-color: black;
  display: flex;
  align-items: center;
  padding: 2vw 0;
}
.emalta h2 {
  font-size: 2.8vw;
  color: white;
  margin-left: 4.5vw;
}
.emalta img {
  width: 7vw;
  margin-left: 2vw;
}


.recomendados {
  background-color: #121826;
  padding: 3vw 0 4vw;
}
.recomendados h2 {
  font-size: 2.5vw;
  color: white;
  margin-left: 9vw;
  margin-bottom: 1.5vw;
}

.recomendados-list {
  display: flex;
  gap: 1vw;
  overflow-x: auto;
  justify-content: center;
  
}

.movie-card {
  width: 12vw;
  cursor: pointer;
  text-align: center;
  color: white;
  
}

.movie-card img {
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  transition: transform 0.5s ease;
  align-items: center;
}
.movie-card img:hover {
  transform: scale(1.07);
}
.movie-card p {
  margin-top: 0.5vw;
  font-size: 1.2vw;
  font-weight: bold;
}
</style>
