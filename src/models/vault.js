import aes256 from '../utils/aes256'

class Vault {
  constructor (key, payload) {
    if (!/[a-z0-9]{64}/.test(key)) {
      throw new Error('invalid key')
    }

    this._key = aes256.hexToBytes(key)

    if (!payload) {
      throw new Error('payload required')
    }

    this.data = {}
    for (let prop of ['username', 'password', 'url', 'note']) {
      this.data[prop] = payload[prop]
      if (payload[prop] && /![a-zA-Z0-9+/=]+\|[a-zA-Z0-9+/=]+/.test(payload[prop])) {
        this.data[prop] = payload[prop]
      } else {
        throw new Error(`payload.${prop} invalid`)
      }
    }
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

  get username () {
    return this._decrypt(this.data.username)
  }

  set username (username) {
    this.data.username = this._encrypt(username)
  }
}

export default Vault
