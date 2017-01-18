import Vault from '../../src/models/vault'

let count = 0

export default async (user) => {
  let key = await user.key()
  return new Vault(key, {
    name: `name${count}`,
    username: `username${count}`,
    password: `password${count}`,
    url: `url${count}`,
    note: `note${count}`
  })
}
