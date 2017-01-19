<template>
  <div class="columns">
    <div class="column is-half is-offset-3">
      <label class="label">Username</label>
      <p class="control">
        <input class="input is-medium" type="text" placeholder="username" v-model="username">
      </p>

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
          <button class="button is-primary" @click="signup">SIGNUP</button>
        </p>
        <p class="control">
          <button class="button" @click="gotoLogin">LOGIN</button>
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
      username: '',
      email: '',
      password: ''
    }
  },

  methods: {
    async signup () {
      let user = new User(this.email, this.password)

      user.key().then((key) => {
        let body = {
          username: this.username,
          password: key,
          email: this.email
        }

        return this.$http.post('api/users/signup', body)
          .then((res) => {
            console.log('success')
          })
          .catch((res) => {
            console.error('fail', res)
          })
      })
    },

    gotoLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
