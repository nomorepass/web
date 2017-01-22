<template>
  <div id="app">
    <HeaderView></HeaderView>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderView from './components/header'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    HeaderView
  },
  created () {
    this.$loading()

    this.$http.get('api/users/me')
      .then((res) => {
        this.$store.commit('setAuthorized', res.body)
        this.$router.push('/home')
        this.$loading().close()
      })
      .catch((res) => {
        this.$store.commit('setAuthorized', false)
        this.$router.push('/login')
        this.$loading().close()
      })
  }
}
</script>

<style>

</style>
