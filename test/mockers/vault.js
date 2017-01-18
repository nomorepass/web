import Vault from '../../src/models/vault'

export default async (user) => {
  let key = await user.key()
  return new Vault(key)
}
