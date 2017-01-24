<template>
  <el-row>
    <el-col :span="14" :offset="5">
      <el-card v-for="vault in vaults">
        <div style="padding: 14px;" @click="showVaultDetail(vault.id)">
          <span>{{vault.name}}</span>
          <div class="bottom clearfix">
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Vault from '../models/vault'
import VaultAPI from '../apis/vault'

export default {
  data () {
    return {
      vaults: []
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      VaultAPI.list()
        .then(vaults => {
          this.vaults = vaults
        })
    },
    showVaultDetail (id) {
      this.$router.push({
        path: `vaults/${id}`
      })
    }
  }
}
</script>
