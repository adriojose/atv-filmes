<script setup>
import Loading from 'vue-loading-overlay'
import { useGenreStore } from '@/stores/genre'
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'

const favoritesStore = useFavoritesStore()


const router = useRouter()

const genreStore = useGenreStore()
const genres = ref([])
const isLoading = ref(false)

function openTv(tvId) {
  router.push({ name: 'TVDetails', params: { tvId } })
}



onMounted(async () => {
  const response = await api.get('genre/tv/list?language=pt-BR')
  genres.value = response.data.genres
  isLoading.value = true
  await genreStore.getAllGenres('tv')
  await listTv(10765)
  isLoading.value = false
})


const tv = ref([])


const listTv = async (genreId) => {
   genreStore.setCurrentGenreId(genreId);
  isLoading.value = true
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  })
  tv.value = response.data.results
  isLoading.value = false
}


const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')
</script>
<template>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <div class="fundo">
   
  <h1>Programas de TV</h1>
  <ul class="genre-list">
  <li
    v-for="genre in genreStore.genres.filter(g => g.id === 10765)"
    :key="genre.id"
    @click="listTv(10765)"
    class="genre-item"
    :class="{ active: genreStore.currentGenreId === 10765 }"
  >
    {{ genre.name }}
  </li>
</ul>
  <loading v-model:active="isLoading" is-full-page />
  <div class="tv-list">


    <div v-for="tvs in tv" :key="tvs.id" class="tv-card">


     <img :src="`https://image.tmdb.org/t/p/w500${tvs.poster_path}`" :alt="tvs.name" @click="openTv(tvs.id)" />
       <button
  class="fav-btn"
  @click.stop="favoritesStore.toggleFavorite(tvs)"
>
  <span v-if="favoritesStore.isFavorite(tvs.id)">
    <i class="fa-solid fa-star"></i>
  </span>
  <span v-else>
    <i class="fa-regular fa-star"></i>
  </span>
</button>

      <div class="tvs-details">
        <p class="tvs-name">{{ tvs.name }}</p>
        <p class="tvs-release-date">{{ formatDate(tvs.first_air_date) }}</p>


       


        <p class="tvs-genres">
          <span v-for="genre_id in tvs.genre_ids" :key="genre_id"
           @click="listTv(`10765, ${genre_id}`)"
           :class="{ active: genre_id === genreStore.currentGenreId }">


              {{ genreStore.getGenreName(genre_id) }}
            </span>


        </p>
      </div>
    </div>
  </div>
  </div>
  
</template>


<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
}
.fundo {
  background-color: #0D1C3A;
  padding-top: 4vw;
   padding-bottom: 2vw;
}
.fundo h1 {
 margin-left: 3vw;
  color: white;
  font-weight: bold;
  font-size: 2.5vw;
}
 .fav-btn {
 margin-left: 15vw;
 color: yellow;
 border: none;
 background-color: #0D1C3A;
 cursor: pointer;
}
.fav-btn i {
  font-size: 20px;
  margin-top: 2px;
}

.genre-item {
  background-color: #5d6424;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  align-self: center;
  color: #fff;
  display: flex;
  justify-content: center;
}


.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}
.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}


.tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}


.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}


.tvs-details {
  padding: 0 0.5rem;
  color: white;
  
}
.tvs-name {
  color: white;
  margin-left: 1vw;
  font-size: 1.2vw;
}
.tvs-release-date {
  color: white;
  margin-left: 1vw;
  
}

.tv-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
  color: white;
}
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}
.tvs-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}


.tvs-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}


.tvs-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}
.active {
  background-color: #67b086;
  font-weight: bolder;
}


.tvs-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>


