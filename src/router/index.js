import { createRouter, createWebHashHistory } from 'vue-router'
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
    component: () => import('../views/GameMemoryView.vue')
  },
  {
    path: '/SlideGame',
    name: 'SlideGame',
    component: () => import('../views/GameSlideView.vue')
  },
  {
    path: '/JackpotGame',
    name: 'JackpotGame',
    component: () => import('../views/GameJackpotView.vue')
  },
  {
    path: '/Scores',
    name: 'ScoresPage',
    component: () => import('../views/ScoresView.vue')
  },
  {
    path: '/Policy',
    name: 'MentionsLégales',
    component: () => import('../views/PolicyView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
