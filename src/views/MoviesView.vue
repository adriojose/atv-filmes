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

const isLoading = ref(false)
const movies = ref([])

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}

onMounted(async () => {
  isLoading.value = true
  
  // ⬇ Carregar os gêneros no store
  await genreStore.getAllGenres('movie')

  // ⬇ Carregar automaticamente os filmes de Ficção Científica ao entrar
  await listMovies(878)

  isLoading.value = false
})

const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId(genreId)
  isLoading.value = true

  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId, // agora usa o ID correto
      language: 'pt-BR',
    },
  })

  movies.value = response.data.results
  isLoading.value = false
}

const formatDate = (date) =>
  new Date(date).toLocaleDateString('pt-BR')
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <div class="filmes">
    <h1>Explorar Filmes</h1>

    <!-- Apenas 1 gênero (Ficção Científica) -->
    <ul class="genre-list">
      <li
        v-for="genre in genreStore.genres.filter(g => g.id === 878)"
        :key="genre.id"
        @click="listMovies(878)"
        class="genre-item"
        :class="{ active: genreStore.currentGenreId === 878 }"
      >
        {{ genre.name }}
      </li>
    </ul>

    <loading v-model:active="isLoading" is-full-page />

    <div class="movie-list">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="movie-card"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          @click="openMovie(movie.id)"
        />
        <button
  class="fav-btn"
  @click.stop="favoritesStore.toggleFavorite(movie)"
>
  <span v-if="favoritesStore.isFavorite(movie.id)"><i class="fa-solid fa-star"></i></span>
  <span v-else><i class="fa-regular fa-star"></i></span>
</button>
        <div class="movie-details">
          <p class="movie-title">{{ movie.title }}</p>
          <p class="movie-release-date">
            {{ formatDate(movie.release_date) }}
          </p>

          <p class="movie-genres">
            <span
              v-for="genre_id in movie.genre_ids"
              :key="genre_id"
                @click="listMovies(`878,${genre_id}`)"
              :class="{ active: genre_id === genreStore.currentGenreId }"
            >
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
  margin-bottom: 1rem;
}

.filmes {
  background-color: #0D1C3A;
  padding-top: 4vw;
  padding-bottom: 2vw;
}
.filmes h1 {
  margin-left: 3vw;
  color: white;
  font-weight: bold;
  font-size: 2.5vw;
  
}
.fa-star {
  font-size: 20px;
  margin-top: 2px;
}
.genre-item {
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  background-color: #12264D;
}
.fav-btn {
 margin-left: 15vw;
 color: yellow;
 border: none;
 background-color: #12264D;
 cursor: pointer;

}

.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.movie-details {
  padding: 0 0.5rem;
 color: white;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.movie-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  justify-content: center;
 
}


.movie-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

.active {
  background-color: #67b086;
  font-weight: bolder;
}

.movie-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>
