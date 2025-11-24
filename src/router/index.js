import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/filmes',
    name: 'Movies',
    component: () => import('../views/MoviesView.vue'),
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import('../views/TvView.vue'),
  },
  {
  path: '/movie/:movieId',
  name: 'MovieDetails',
  component: () => import('../views/MovieDetailsView.vue'),
  props: true,
},
 {
  path: '/favoritos',
  name: 'MovieFavorite',
  component: () => import('../views/MovieFavoriteView.vue')
},
{
  path: '/tv/:tvId',
  name: 'TVDetails',
  component: () => import('../views/TvDetailsView.vue')
},




];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;