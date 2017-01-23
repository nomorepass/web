<template>
  <el-row>
    <el-col :span="12" :offset="6" :xs="{span:20, offset:2}" :sm="{span:16, offset:4}" :md="{span:12, offset:6}" :lg="{span:8, offset:8}">
      <el-form>
        <el-form-item label="Username">
          <el-input v-model="username" placeholder="username"></el-input>
        </el-form-item>

        <el-form-item label="Email">
          <el-input v-model="email" placeholder="email"></el-input>
        </el-form-item>

        <el-form-item label="Password">
          <el-input v-model="password" type="password" placeholder="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="signup">SIGNUP</el-button>
          <el-button @click="gotoLogin">LOGIN</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import User from '../models/user'

export default {
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },

  methods: {
    async signup () {
      let user = new User(this.email, this.password)

      user.hash().then((hash) => {
        let body = {
          username: this.username,
          password: hash,
          email: this.email
        }

        return this.$http.post('api/users/signup', body)
          .then((res) => {
            this.$notify({
              type: 'success',
              title: `Welcome, ${res.body.username}`
            })
          })
          .catch((res) => {
            this.$notify({
              type: 'error',
              title: `Sorry, signup failed`
            })
          })
      })
    },

    gotoLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
