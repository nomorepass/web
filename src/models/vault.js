import aes256 from '../utils/aes256'

class Vault {
  constructor (key) {
    if (!/[a-z0-9]{64}/.test(key)) {
      throw new Error('invalid key')
    }

    this._key = aes256.hexToBytes(key)

    this.data = {}
  }

  get validAttrs () {
    return ['name', 'url', 'note', 'username', 'password']
  }

  _encrypt (plaintext) {
    let key = this._key.copy()
    let iv = aes256.randomIV()

    let encrypted = aes256.encrypt(plaintext, key, iv.copy())
    encrypted = aes256.hexToBytes(encrypted)
    iv = aes256.bytesToBase64(iv)
    encrypted = aes256.bytesToBase64(encrypted)
    return `!${iv}|${encrypted}`
  }

  _decrypt (payload) {
    let key = this._key.copy()
    let [iv, encrypted] = payload.slice(1).split('|')

    iv = aes256.base64ToBytes(iv)
    encrypted = aes256.base64ToBytes(encrypted)
    return aes256.decrypt(encrypted, key, iv)
  }

  fromSafe (data) {
    if (data.id) {
      this.data.id = data.id
    }

    for (let key of this.validAttrs) {
      if (data[key]) {
        this.data[key] = this._decrypt(data[key])
      }
    }
  }

  toSafe () {
    let result = { id: this.data.id }

    for (let key of this.validAttrs) {
      if (this.data[key]) {
        result[key] = this._encrypt(this.data[key])
      }
    }

    return result
  }

  get id () {
    return this.data.id
  }

  get username () {
    return this.data.username
  }
  set username (value) {
    this.data.username = value
  }

  get password () {
    return this.data.password
  }
  set password (value) {
    this.data.password = value
  }

  get name () {
    return this.data.name
  }
  set name (value) {
    this.data.name = value
  }

  get url () {
    return this.data.url
  }
  set url (value) {
    this.data.url = value
  }

  get note () {
    return this.data.note
  }
  set note (value) {
    this.data.note = value
  }
}

export default Vault
