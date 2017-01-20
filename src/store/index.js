import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // indicate user login
    authorized: false,
    user: null,

    // all current user vaults
    vaults: []
  },
  mutations
})

export default store
