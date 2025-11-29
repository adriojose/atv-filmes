<script setup>
import { computed } from "vue";
import { useFavoritesStore } from "@/stores/favorites";
import { useRouter } from "vue-router";

const favoritesStore = useFavoritesStore();
const router = useRouter();


const favoriteMovies = computed(() =>
  favoritesStore.favorites.filter((f) => f.media_type === "movie")
);


const favoriteSeries = computed(() =>
  favoritesStore.favorites.filter((f) => f.media_type === "tv")
);


function openMovie(id) {
  router.push({ name: "MovieDetails", params: { movieId: id } });
}


function openSerie(id) {
  router.push({ name: "TVDetails", params: { tvId: id } });
}
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

  <div class="favoritos">
   

   
    <h2>Filmes Curtidos</h2>

    <div v-if="favoriteMovies.length === 0" class="empty">
      <p>Nenhum filme curtido ⭐</p>
    </div>

    <div
      class="movie-list"
      :class="{ single: favoriteMovies.length === 1 }"
      v-else
    >
      <div
        class="movie-card"
        v-for="movie in favoriteMovies"
        :key="movie.id"
        @click="openMovie(movie.id)"
      >
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" />

        <div class="favoritados">
          <p>{{ movie.title }}</p>

          <button
            class="fav-btn"
            @click.stop="favoritesStore.toggleFavorite(movie)"
          >
            <i
              :class="favoritesStore.isFavorite(movie.id)
                ? 'fa-solid fa-star'
                : 'fa-regular fa-star'"
            ></i>
          </button>
        </div>
      </div>
    </div>

   
    <h2>Séries Curtidas</h2>

    <div v-if="favoriteSeries.length === 0" class="empty">
      <p>Nenhuma série curtida ⭐</p>
    </div>

    <div
      class="movie-list"
      :class="{ single: favoriteSeries.length === 1 }"
      v-else
    >
      <div
        class="movie-card"
        v-for="serie in favoriteSeries"
        :key="serie.id"
        @click="openSerie(serie.id)"
      >
        <img :src="`https://image.tmdb.org/t/p/w500${serie.poster_path}`" />

        <div class="favoritados">
          <p>{{ serie.name }}</p>

          <button
            class="fav-btn"
            @click.stop="favoritesStore.toggleFavorite(serie)"
          >
            <i
              :class="favoritesStore.isFavorite(serie.id)
                ? 'fa-solid fa-star'
                : 'fa-regular fa-star'"
            ></i>
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

h2 {
  color: white;
  margin-left: 9vw;
  font-size: 2.5vw;
  margin-top: 2vw;
  padding-bottom: 3vw;
}

.empty p {
  color: white;
  margin-left: 8vw;
  font-size: 1.4vw;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  justify-content: center;
  gap: 1.5rem;
  max-width: 1100px;
  margin: auto;
}

.movie-list.single {
  justify-content: start;
  margin-left: 8vw;
}

.movie-card {
  width: 200px;
  padding-bottom: 2vw;
  border-radius: 0.3rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  background-color: #1a2136;
  cursor: pointer;
}

.movie-card img {
  width: 100%;
  border-radius: 0.3rem 0.3rem 0 0;
  border-bottom: 2px solid green;
}

.favoritados {
  display: flex;
  align-items: center;
  padding: 0.5vw;
}

.favoritados p {
  color: white;
  font-size: 1rem;
  font-weight: bold;
}

.fav-btn {
  margin-left: auto;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: yellow;
}
</style>
