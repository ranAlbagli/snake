import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Snake from '../views/Snake.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/snake',
    name: 'snake',
    component: Snake
  }
]

const router = new VueRouter({
  routes
})

export default router
