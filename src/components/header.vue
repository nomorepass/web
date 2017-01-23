<template>
  <nav>
    <el-menu mode="horizontal" theme="light" @select="handleSelect">
      <el-menu-item index="home">
        HOME
      </el-menu-item>

      <div v-if="authorized" class="menu">
        <el-menu-item index="logout">
          LOGOUT
        </el-menu-item>
      </div>

      <div v-else class="menu">
        <el-menu-item index="signup">
          SIGNUP
        </el-menu-item>

        <el-menu-item index="login">
          LOGIN
        </el-menu-item>
      </div>
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
          break
        case 'login':
          this.$router.push('login')
          break
        case 'logout':
          this.logout()
          break
        case 'home':
          this.$router.push('home')
          break
      }
    }
  }
}
</script>

<style>
.menu {
  float: right
}
</style>
