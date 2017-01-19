import pbkdf2 from '../utils/pbkdf2'

class User {
  constructor (username, password, iterations = 5000) {
    this.username = username
    this.password = password
    this.iterations = iterations
  }

  async key () {
    let key = await pbkdf2(this.password, this.username, this.iterations, 32, 'sha256')
    return key.toHex()
  }

  async hash () {
    let key = await pbkdf2(this.password, this.username, this.iterations, 32, 'sha256')
    let result = await pbkdf2(key.key, this.password, 1, 32, 'sha256')
    return result.toHex()
  }
}

export default User
