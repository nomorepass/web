<template>
  <div class="columns">
    <div class="column is-half is-offset-3">
      <label class="label">Email</label>
      <p class="control">
        <input class="input is-medium" type="text" placeholder="email" v-model="email">
      </p>
      <label class="label">Password</label>
      <p class="control">
        <input class="input is-medium" type="password" placeholder="password" v-model="password">
      </p>

      <div class="control is-grouped">
        <p class="control">
          <button class="button is-primary" @click="login">LOGIN</button>
        </p>
        <p class="control">
          <button class="button" @click="gotoSignup">SINGUP</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../models/user'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    async login () {
      let user = new User(this.email, this.password)
      let key = await user.key()

      let body = {
        email: this.email,
        password: key
      }
      this.$http.post('api/users/login', body)
        .then((res) => {
          this.username = res.body
          console.log('sssss')
        })
        .catch((res) => {
          console.error('fff', res)
        })
    },

    gotoSignup () {
      this.$router.push('/signup')
    }
  }
}
</script>
