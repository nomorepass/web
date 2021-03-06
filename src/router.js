import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginView from './components/login'
import SignupView from './components/signup'
import DashboardView from './components/dashboard'
import VaultView from './components/vault'

import store from './store'

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
    path: '/dashboard',
    component: DashboardView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/vaults/:id',
    component: VaultView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '*',
    redirect: '/dashboard'
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.authorized) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
