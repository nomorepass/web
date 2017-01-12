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
      let func = () => new Vault(key, {
        username: '!UDi4K79ykirjaZCy9ILC1Q==|Sh+4CeHEZjiH7q9vhX8YLA==',
        password: '!ONUVupB3Ci+F1AcwMyVKZA==|glNJylmJLCk5jl/XBMNMdA==',
        url: '!nWPC5q2KnCe9w8I7T7HBQw==|W48P4TX68/hWjzjfKy0QeA==',
        note: '!CJLaavHQgCADnF2mfadsQg==|Hg98YK4jGH1XzraZ7/SsTQ=='
      })
      expect(func).not.throw(Error)
    })
  })

  describe('username', () => {
    let user = userMocker()
    let vault

    before(async () => {
      vault = await vaultMocker(user)
    })

    it('get', () => {
      expect(vault.username).equal('UUsername')
    })

    it('set', () => {
      vault.username = 'newname'
      expect(vault.username).equal('newname')
    })
  })
})
