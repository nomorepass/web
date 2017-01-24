<template>
  <el-row>
    <el-col :span="12" :offset="6" :xs="{span:20, offset:2}" :sm="{span:16, offset:4}" :md="{span:12, offset:6}" :lg="{span:8, offset:8}">
      <el-form>
        <el-form-item label="Email">
          <el-input v-model="email" placeholder="email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="password" type="password" placeholder="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">LOGIN</el-button>
          <el-button @click="gotoSignup">SIGNUP</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import User from '../models/user'
import UserAPI from '../apis/user'

export default {
  data () {
    return {
      password: ''
    }
  },
  computed: {
    email: {
      get: function () {
        return localStorage.getItem('user.email')
      },
      set: function (value) {
        localStorage.setItem('user.email', value)
      }
    }
  },
  methods: {
    async login () {
      let user = new User(this.email, this.password)
      let key = await user.key()
      let hash = await user.hash()

      let body = {
        email: this.email,
        password: hash
      }

      return UserAPI.login(body, key)
    },

    gotoSignup () {
      this.$router.push('/signup')
    }
  }
}
</script>

<style>
</style>
