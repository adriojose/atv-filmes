<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/plugins/axios'

const route = useRoute()
const tvId = route.params.tvId

const tv = ref(null)

onMounted(async () => {
  const response = await api.get(`/tv/${tvId}`, {
    params: { language: 'pt-BR' }
  })
  tv.value = response.data
})
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    
  <div v-if="tv" class="details">
    <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" />

    <div class="text">
      <h1>{{ tv.name }}</h1>
      <p>{{ tv.overview }}</p>

      <p><strong>Primeiro episódio:</strong> {{ tv.first_air_date }}</p>
      <p><strong>Temporadas:</strong> {{ tv.number_of_seasons }}</p>
      <p><strong>Episódios:</strong> {{ tv.number_of_episodes }}</p>
    </div>
  </div>
 
</template>

<style scoped>
.details {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background-color: #0D1C3A;
  min-height: 100vh;
  padding-top: 6vw;
  color: white;
}
.text h1{
  font-size: 2.8vw;
}
.details img {
  width: 230px;
  height: 330px;
  border-radius: 1rem;
  
}

</style>
