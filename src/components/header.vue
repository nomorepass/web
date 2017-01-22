<template>
  <el-menu>
    <el-menu-item mode="horizontal" theme="light">
      <router-link to="/">HOME</router-link>
    </el-menu-item>
  </el-menu>
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
