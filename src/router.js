import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginView from './components/login'
import SignupView from './components/signup'
import HomeView from './components/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/signup',
    component: SignupView
  },
  {
    path: '/home',
    component: HomeView
  }
]

const router = new VueRouter({
  routes
})

export default router
