<template>
  <nav class="nav">
    <div class="nav-left">
      <a class="nav-item">
         <router-link to="/home">HOME</router-link>
      </a>
    </div>

    <div class="nav-right nav-menu">
      <span class="nav-item" v-if="authorized">
        <a class="button" @click="logout">
          <span>LOGOUT</span>
        </a>
      </span>
      <span class="nav-item" v-else>
        <a class="button is-primary" @click="gotoSignup">
          <span>SIGNUP</span>
        </a>
        <a class="button" @click="gotoLogin">
          <span>LOGIN</span>
        </a>
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    authorized () {
      return this.$store.state.authorized
    }
  },
  methods: {
    logout () {

    },
    gotoLogin () {
      this.$router.push('login')
    },
    gotoSignup () {
      this.$router.push('signup')
    }
  }
}
</script>
