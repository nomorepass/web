import { expect } from 'chai'
import aes256 from '../../src/utils/aes256'

describe('aes256', () => {
  describe('encrypt', () => {
    it('should ok', () => {
      let iv = aes256.base64ToBytes('UDi4K79ykirjaZCy9ILC1Q==')
      let key = aes256.hexToBytes('48e44b0bf13375d777b84b134f4cee035c15f82ab407c25b1cabfa4b360b3db5')
      let encrypt = aes256.encrypt('UUsername', key, iv)
      expect(encrypt).equal('4a1fb809e1c4663887eeaf6f857f182c')
    })
  })

  describe('decrypt', () => {
    it('should ok', () => {
      let iv = aes256.base64ToBytes('UDi4K79ykirjaZCy9ILC1Q==')
      let key = aes256.hexToBytes('48e44b0bf13375d777b84b134f4cee035c15f82ab407c25b1cabfa4b360b3db5')
      let decrypt = aes256.decrypt(aes256.base64ToBytes('Sh+4CeHEZjiH7q9vhX8YLA=='), key, iv)
      expect(decrypt).equal('UUsername')
    })
  })

  describe('randomIV', () => {
    it('should ok', () => {
      let iv = aes256.randomIV()
      expect(aes256.bytesToHex(iv)).match(/[a-f0-9]{64}/)
    })
  })

  describe('stringToBytes', () => {
    it('should ok', () => {
      let bytes = aes256.stringToBytes('abcdefg')
      expect(bytes.toString()).equal('abcdefg')
    })
  })

  describe('base64ToBytes', () => {
    it('should ok', () => {
      let bytes = aes256.base64ToBytes('YmFzZTY0')
      expect(bytes.toString()).equal('base64')
    })
  })

  describe('bytesToBase64', () => {
    it('should ok', () => {
      let bytes = aes256.stringToBytes('base64')
      expect(aes256.bytesToBase64(bytes)).equal('YmFzZTY0')
    })
  })

  describe('hexToBytes', () => {
    it('should ok', () => {
      let bytes = aes256.hexToBytes('61626364656667')
      expect(bytes.toString()).equal('abcdefg')
    })
  })

  describe('bytesToHex', () => {
    it('should ok', () => {
      let bytes = aes256.stringToBytes('abcdefg')
      expect(aes256.bytesToHex(bytes)).equal('61626364656667')
    })
  })
})
