import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App.vue'
import config from './config'
import router from './router'

Vue.use(VueResource)
Vue.http.options.root = config.baseUrl

export default new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
