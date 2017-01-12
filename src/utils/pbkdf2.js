import forge from 'node-forge'

class PBKDF2Key {
  constructor (key) {
    this.key = key
  }

  toHex () {
    return forge.util.bytesToHex(this.key)
  }

  toBase64 () {
    return forge.util.encode64(this.key)
  }
}

function pbkdf2 (password, salt, iterations, keylen, digest) {
  return new Promise((resolve, reject) => {
    forge.pkcs5.pbkdf2(password, salt, iterations, keylen, digest, (err, key) => {
      if (err) {
        reject(err)
      } else {
        resolve(new PBKDF2Key(key))
      }
    })
  })
}

export default pbkdf2
