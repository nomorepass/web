import { http } from 'vue'
import { Notification } from 'element-ui'

import store from '../store'
import router from '../router'

const login = (body, key) => {
  return http.post('api/users/login', body)
    .then((res) => {
      store.commit('setAuthorized', true)
      store.commit('setKey', key)
      router.push('dashboard')
      Notification.success({
        title: `Welcome, ${res.body.username}`
      })
    })
    .catch((res) => {
      store.commit('setAuthorized', false)
      Notification.error({
        title: 'email/password not match!'
      })
    })
}

const signup = (body) => {
  return http.post('api/users/signup', body)
    .then((res) => {
      Notification.success({
        title: `Welcome, ${res.body.username}`
      })
    })
    .catch((res) => {
      Notification.error({
        title: `Sorry, signup failed`
      })
    })
}

export default {
  login,
  signup
}
