import Vault from '../../src/models/vault'

export default async (user) => {
  let key = await user.key()
  return new Vault(key, {
    username: '!UDi4K79ykirjaZCy9ILC1Q==|Sh+4CeHEZjiH7q9vhX8YLA==',
    password: '!ONUVupB3Ci+F1AcwMyVKZA==|glNJylmJLCk5jl/XBMNMdA==',
    url: '!nWPC5q2KnCe9w8I7T7HBQw==|W48P4TX68/hWjzjfKy0QeA==',
    note: '!CJLaavHQgCADnF2mfadsQg==|Hg98YK4jGH1XzraZ7/SsTQ=='
  })
}
