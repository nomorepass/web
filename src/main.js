import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App.vue'
import config from './config'
import router from './router'
import store from './store'

Vue.use(VueResource)
Vue.http.options.root = config.baseUrl

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
