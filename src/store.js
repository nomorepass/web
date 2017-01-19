import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // indicate user login
    authorized: false,
    user: null,

    // all current user vaults
    vaults: []
  }
})

export default store
