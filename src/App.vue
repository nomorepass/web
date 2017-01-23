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
  }
}
</script>

<style>

</style>
