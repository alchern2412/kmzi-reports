const { generator, rc4encrypt, rc4decrypt } = require('./util')

const a = 421
const c = 1663
const n = 7875

const count = 10
const result = generator(a, c, n, count)

console.log('Generated: ', result)

const text = 'Aliaksei Charniauski1 hello world!'

const key = Buffer.from([1, 11, 21, 31, 41, 51])


const encryptedText = rc4encrypt(text, key)
console.log('Encrypted text: ', encryptedText)

const decryptedText = rc4decrypt(encryptedText, key)
console.log('Decrypted text: ', decryptedText)