<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4" :xs="{span:20, offset:2}" :sm="{span:16, offset:4}" :md="{span:18, offset:3}" :lg="{span:16, offset:4}">
        <el-button type="primary" icon="plus" @click="addVault"></el-button>
        <el-button type="primary" @click="loadAllVaults">Refresh</el-button>
        <el-table v-loading.body="loading" :data="vaults" height="250" border style="width: 100%">
          <el-table-column prop="name" label="Name" width="180">
          </el-table-column>
          <el-table-column prop="url" label="Url" width="180">
          </el-table-column>
          <el-table-column prop="note" label="Note" width="180">
          </el-table-column>
          <el-table-column prop="username" label="Username" width="180">
          </el-table-column>
          <el-table-column prop="password" label="Password">
          </el-table-column>
          <el-table-column label="CRUD">
            <template scope="scope">
              <el-button icon="edit" @click="handleEdit(scope.row, 'edit')"></el-button>
              <el-button icon="delete" @click="handleEdit(scope.row, 'delete')"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog :title="currentVault.name" v-model="dialogEditVaultVisible">
      <el-form>
        <el-form-item label="Name">
          <el-input v-model="currentVault.name"></el-input>
        </el-form-item>
        <el-form-item label="Username">
          <el-input v-model="currentVault.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="currentVault.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Url">
          <el-input v-model="currentVault.url"></el-input>
        </el-form-item>
        <el-form-item label="Note">
          <el-input v-model="currentVault.note"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setDialogVisible(false)">取 消</el-button>
        <el-button type="primary" @click="updateOrInsertVault">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vault from '../models/vault'

export default {
  data() {
    return {
      vaults: [],
      loading: true,
      dialogEditVaultVisible: false,
      currentVault: {}
    }
  },
  computed: {
    userKey () {
      return this.$store.state.key
    }
  },
  created () {
    this.loadAllVaults()
  },
  methods: {
    setDialogVisible (value) {
      this.dialogEditVaultVisible = !!value
    },
    loadAllVaults () {
      this.$http.get('api/vaults')
        .then((res) => {
          this.loading = false
          let vaults = res.body.map((v) => {
            let vault = new Vault(this.userKey)
            vault.fromSafe(v)
            return vault
          })
          this.vaults = vaults
        })
        .catch((res) => {
          console.log(res)
          this.loading = false
          this.$notify({
            type: 'error',
            title: 'Loading vaults failed'
          })
        })
    },
    addVault () {
      this.currentVault = new Vault(this.userKey)
      this.setDialogVisible(true)
    },
    updateOrInsertVault () {
      let vault = this.currentVault.toSafe()
      let request = null
      let requestType = ''

      if (vault.id) {
        request = this.$http.put(`api/vaults/${vault.id}`, vault)
        requestType = 'update'
      } else {
        request = this.$http.post('api/vaults', vault)
        requestType = 'create'
      }

      request.then((res) => {
        if (requestType === 'create') {
          this.vaults.push(this.currentVault)
        }
        this.setDialogVisible(false)
        this.$notify({
          type: 'success',
          title: `${requestType} success`
        })
      })
      .catch((res) => {
        this.$notify({
          type: 'error',
          title: `${requestType} failed: ${res.body.message}`
        })
      })
    },
    handleEdit (row, oper) {
      switch (oper) {
        case 'edit':
          this.currentVault = this.vaults.find((v) => {
            return v.id === row.id
          })

          this.setDialogVisible(true)
          break
        case 'delete':
          this.$http.delete(`api/vaults/${row.id}`)
            .then((res) => {
              let index = this.vaults.find((v) => {
                return v.id === row.id
              })
              this.vaults.splice(index, 1)

              this.$notify({
                type: 'success',
                title: 'delete success'
              })
            })
            .catch((res) => {
              this.$notify({
                type: 'error',
                title: 'delete failed'
              })
            })
          break
      }
    }
  }
}
</script>
