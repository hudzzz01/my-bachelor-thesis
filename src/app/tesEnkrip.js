




// let aesjs = require('aes-js');


// const message = "aHVkemFpZmFoMTIzNDU2Nw==";
// const key = "hudzaifah1234567";

// let messageBy = aesjs.utils.utf8.toBytes(message)
// let keyBy = aesjs.utils.utf8.toBytes(key)

// var aesEcb = new aesjs.ModeOfOperation.ecb(keyBy);
// var encryptedBytes = aesEcb.encrypt(messageBy);


// //console.log(messageBy)
// console.log(encryptedBytes)
// console.log(keyBy)






const AESlib = require('crypto-aes-ecb');
const CryptoJS = require('crypto-js');


const message = "aHVkemFpZmFoMTIzNDU2Nw==";
const key = "hudzaifah12345";
//jadikan kunci ke hash
let keyHash = CryptoJS.SHA256(key).toString().slice(0,16);
//console.log(keyHash)

encriptedMessage = AESlib.Aes128EcbEncrypt(message,keyHash);
result = AESlib.Aes128EcbDecrypt(encriptedMessage,keyHash)
console.log(encriptedMessage)
console.log(result)







// const CryptoJS = require('crypto-js');

// // Kunci teks (panjang harus 16 karakter)
// const keyText = 'mysecretkey12345';

// // Konversi kunci teks menjadi bentuk bytes (panjang 16 byte)
// const key = CryptoJS.enc.Utf8.parse(keyText);
// console.log(key)

// // Data yang akan dienkripsi
// const plaintext = 'Hello, this is a secret message!';

// // Konversi data plaintext menjadi bentuk bytes
// const plaintextBytes = CryptoJS.enc.Utf8.parse(plaintext);

// // Enkripsi menggunakan AES-128
// const ciphertext = CryptoJS.AES.encrypt(plaintextBytes, key, {
//   mode: CryptoJS.mode.ECB, // Mode enkripsi (Electronic Codebook)
//   padding: CryptoJS.pad.Pkcs7 // Padding scheme
// });

// // Hasil enkripsi dalam bentuk Base64
// const encryptedText = ciphertext.toString();
// console.log('Encrypted:', encryptedText);