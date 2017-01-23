import Vue from 'vue'
import VueResource from 'vue-resource'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VueResource)
Vue.http.options.root = config.baseUrl
Vue.use(ElementUI)

import config from './config'
import router from './router'
import store from './store'
import App from './App.vue'

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
