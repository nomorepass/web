export default {
  setAuthorized (state, user) {
    state.authorized = !!user
    state.user = user
  }
}
