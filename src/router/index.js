import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/MemoryGame',
    name: 'MemoryGame',
    component: () => import(/* webpackChunkName: "MemoryGame" */ '../views/GameMemoryView.vue')
  },
  {
    path: '/SlideGame',
    name: 'SlideGame',
    component: () => import(/* webpackChunkName: "SlideGame" */ '../views/GameSlideView.vue')
  },
  {
    path: '/JackpotGame',
    name: 'JackpotGame',
    component: () => import(/* webpackChunkName: "JackpotGame" */ '../views/GameJackpotView.vue')
  },
  {
    path: '/Scores',
    name: 'ScoresPage',
    component: () => import(/* webpackChunkName: "ScoresPage" */ '../views/ScoresView.vue')
  },
  {
    path: '/Policy',
    name: 'MentionsLégales',
    component: () => import(/* webpackChunkName: "MentionsLégales" */ '../views/PolicyView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
