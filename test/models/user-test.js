import { expect } from 'chai'
import User from '../../src/models/user'
import aes256 from '../../src/utils/aes256'

describe('User', () => {
  let user = new User('k1967702@mvrht.com', 'k1967702', 4217)

  it('key()', async () => {
    let key = await user.key()

    let encrypted = aes256.base64ToBytes('Sh+4CeHEZjiH7q9vhX8YLA==')
    key = aes256.hexToBytes(key)
    let iv = aes256.base64ToBytes('UDi4K79ykirjaZCy9ILC1Q==')

    let username = aes256.decrypt(encrypted, key, iv)
    expect(username).equal('UUsername')
  })

  it('hash()', async () => {
    let hash = await user.hash()
    expect(hash).equal('297aa248939d71a73606891c463a118308f4b8a2c6b15c782d32c4085baa50d4')
  })
})
