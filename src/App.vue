<script setup>
  import { ref, onMounted } from 'vue';
  import api from './plugins/axios';

  const moviesGenres = ref([]);
  const TVGenres = ref([]);

  onMounted(async () => {
    let response = await api.get('genre/movie/list?language=pt-BR');
    moviesGenres.value = response.data.genres;
    response = await api.get('genre/tv/list?language=pt-BR');
    TVGenres.value = response.data.genres;
  });
</script>

<template>
  <header>
    
    <nav>
     <img src="/image 6.png" alt="">
      <h1>CosmoWatch</h1>
      <router-link to="/">Home</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  height: 3rem;
  display: flex;
  background-color: black;
  color: #fff;
  font-size: 1.5rem;
  padding-left: 2rem;
}

nav h1 {
  font-size: 2vw;
}
header img{
  width: 8vw;
  height: 4vw;
  margin-top: 1.5vw;
}
nav {
  column-gap: 1rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #3CBFDD;
}
</style>