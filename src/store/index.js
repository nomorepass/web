import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // indicate user login
    authorized: false,
    key: ''
  },
  mutations
})

export default store
