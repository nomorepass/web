import { http } from 'vue'
import { Notification } from 'element-ui'
import Vault from '../models/vault'
import store from '../store'

const descryptVault = (v) => {
  let vault = new Vault(store.state.key)
  vault.fromSafe(v)
  return vault
}

const list = () => {
  return http.get('api/vaults')
    .then((res) => {
      return res.body.map(descryptVault)
    })
    .catch((res) => {
      Notification.error({
        title: 'load vaults failed'
      })
    })
}

const get = (id) => {
  return http.get(`api/vaults/${id}`)
    .then((res) => {
      return descryptVault(res.body)
    })
}

const create = (body) => {
  http.post('api/vaults', body)
    .then((res) => {
      return descryptVault(res.body)
    })
    .catch((res) => {
      Notification.error({
        title: 'create vault failed'
      })
    })
}

const update = (id, body) => {
  http.put(`api/vaults/${id}`, body)
    .then((res) => {
      return descryptVault(res.body)
    })
    .catch((res) => {
      Notification.error({
        title: 'put vault failed'
      })
    })
}

const remove = (id) => {
  return http.delete(`api/vaults/${id}`)
    .then((res) => {
      Notification.success({
        title: 'delete success'
      })
    })
    .catch((res) => {
      Notification.error({
        title: 'delete failed'
      })
    })
}

export default {
  list,
  get,
  create,
  update,
  remove
}
