import { expect } from 'chai'
import userMocker from '../mockers/user'
import vaultMocker from '../mockers/vault'
import Vault from '../../src/models/vault'

describe('Vault', () => {
  describe('constructor', () => {
    it('should throw if key not match /[a-z0-9]{64}/', () => {
      let func = () => new Vault('abcdef')
      expect(func).throw(Error, 'invalid key')
    })

    it('should ok', () => {
      let key = ''
      for (let i = 0; i < 8; i++) {
        key = key + 'abcdefgh'
      }
      let func = () => new Vault(key)
      expect(func).not.throw(Error)
    })
  })

  describe('set/get', () => {
    let vault = new Vault('abcd'.repeat(16))

    for (let key of vault.validAttrs) {
      describe(key, () => {
        it('should ok', () => {
          let value = `${key}-value`
          vault[key] = value
          expect(vault[key]).equal(value)
        })
      })
    }
  })

  describe('toSafe', () => {
    it('should ok', async () => {
      let vault = await vaultMocker(userMocker())

      vault.username = 'UUsername'
      vault.data.id = 5

      let encrypt = vault.toSafe()

      expect(encrypt.username).match(/![a-zA-Z0-9+/=]+\|[a-zA-Z0-9+/=]+/)
      expect(encrypt.id).equal(5)
    })
  })

  describe('fromSafe', () => {
    it('should ok', async () => {
      let vault = await vaultMocker(userMocker())

      vault.fromSafe({
        id: 5,
        password: '!ONUVupB3Ci+F1AcwMyVKZA==|glNJylmJLCk5jl/XBMNMdA=='
      })
      expect(vault.password).equal('PPassword')
      expect(vault.data.id).equal(5)
    })
  })
})
