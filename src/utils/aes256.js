import forge from 'node-forge'

let decrypt = (data, key, iv) => {
  let cipher = forge.cipher.createDecipher('AES-CBC', key)

  cipher.start({iv: iv})
  cipher.update(new forge.util.ByteBuffer(data))
  cipher.finish()
  return cipher.output.toString()
}

let encrypt = (data, key, iv) => {
  let cipher = forge.cipher.createCipher('AES-CBC', key)

  cipher.start({iv: iv})
  cipher.update(new forge.util.ByteBuffer(data))
  cipher.finish()
  return cipher.output.toHex()
}

let stringToBytes = (str) => {
  return new forge.util.ByteBuffer(str)
}

let base64ToBytes = (base64) => {
  return stringToBytes(forge.util.binary.base64.decode(base64))
}

let hexToBytes = (hex) => {
  return stringToBytes(forge.util.binary.hex.decode(hex))
}

let randomIV = () => {
  return stringToBytes(forge.random.getBytesSync(32))
}

let bytesToHex = (bytes) => bytes.toHex()

let bytesToBase64 = (bytes) => {
  return forge.util.encode64(bytes.bytes())
}

export default {
  decrypt,
  encrypt,
  randomIV,
  stringToBytes,
  base64ToBytes,
  bytesToBase64,
  hexToBytes,
  bytesToHex
}
