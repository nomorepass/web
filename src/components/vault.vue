<template>
<div>
  {{vault}}
</div>
</template>

<script>
import VaultAPI from '../apis/vault'

export default {
  data () {
    return {
      vault: {}
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      let id = this.$route.params.id
      return VaultAPI.get(id)
        .then(vault => {
          this.vault = vault
        })
    }
  }
}
</script>
