import { expect } from 'chai'
import pbkdf2 from '../../src/utils/pbkdf2'

describe('pbkdf2', () => {
  it('should ok', async () => {
    let key = await pbkdf2('password', 'salt', 5, 32)
    expect(key.toHex()).equal('1a6192e53a6f18673cf3c0e707d330e77985e7a40faa6e2f021726cdd5a026e2')
    expect(key.toBase64()).equal('GmGS5TpvGGc888DnB9Mw53mF56QPqm4vAhcmzdWgJuI=')
  })
})
