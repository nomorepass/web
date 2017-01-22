<template>
  <nav>
    <el-menu mode="horizontal" theme="light" @select="handleSelect" v-if="authorized">
      <el-menu-item index="home">
        <router-link to="/">HOME</router-link>
      </el-menu-item>

      <el-menu-item index="logout">
        LOGOUT
      </el-menu-item>
    </el-menu>

    <el-menu mode="horizontal" theme="light" @select="handleSelect" v-else>
      <el-menu-item index="0">
        <router-link to="/">HOME</router-link>
      </el-menu-item>

      <el-menu-item index="signup">
        SIGNUP
      </el-menu-item>

      <el-menu-item index="login">
        LOGIN
      </el-menu-item>
    </el-menu>
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
      this.$http.post('api/users/logout')
        .then((res) => {
          this.$store.commit('setAuthorized', false)
          this.$router.push('/login')
          this.$notify({
            type: 'info',
            title: 'Logout success'
          })
        })
        .catch((res) => {
          this.$notify({
            type: 'error',
            title: 'Logout failed'
          })
        })
    },
    handleSelect (key, path) {
      switch (key) {
        case 'signup':
          this.$router.push('signup')
          break;
        case 'login':
          this.$router.push('login')
          break;
        case 'logout':
          this.logout()
          break;
      }
    }
  }
}
</script>
