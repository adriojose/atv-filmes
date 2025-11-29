<script setup>
  import { defineProps, onMounted } from 'vue';
  import { useMovieStore } from '@/stores/movie';
  const movieStore = useMovieStore();

  const props = defineProps({
    movieId: {
      type: Number,
      required: true,
    },
  });

  onMounted(async () => {
    await movieStore.getMovieDetail(props.movieId);
  });
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <div class="main">
    <div class="content">
      <img
        :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.poster_path}`"
        :alt="movieStore.currentMovie.title"
      class="img"/>

      <div class="details">
        <h1>Filme: {{ movieStore.currentMovie.title }}</h1>
        <p>{{ movieStore.currentMovie.tagline }}</p>
        <p>{{ movieStore.currentMovie.overview }}</p>
        <p>Orçamento: ${{ movieStore.currentMovie.budget }}</p>
        <p>Avaliação: {{ movieStore.currentMovie.vote_average }}</p>
         <p class="produtoras">Produtoras</p>
  <div class="companies">
    <template
      v-for="company in movieStore.currentMovie.production_companies"
      :key="company.id"
    >
      <img
        v-if="company.logo_path"
        :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
        :alt="company.name"
      />
      <p v-else>{{ company.name }}</p>
    </template>
  </div>
      </div>
    </div>
    
     
  </div>


</template>

<style scoped>
.main {
   background-color: #0D1C3A;
    min-height: 100vh;
}
  .companies {
    display: flex;
    flex-direction: row;
    column-gap: 3rem;
    align-items: center;
    margin-bottom: 2rem;
    margin-left: 4vw;

  }
 .content .img {
  border-radius: 8px;
   height: 330px;
  border-radius: 1rem;
  
 }
 .details .companies {
  width: 2vw;
 }
  .details {
    margin-left: 1.5vw;
    
  }
  .details h1 {
    font-size: 2.8vw;
  }
  .content {
    display: flex;
    margin:0 3vw;
    padding-top: 6vw;
    color: white;
  }
.details .produtoras {
  font-size: 1.5vw;
}
.details .companies {
  margin-left: -0.5vw;
}

 
</style>