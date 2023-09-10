
import { ReactDOM } from "react";
import CryptoJS from "crypto-js";
import MyCanvas from "./MyCanvas";
import './App.css';
import Loading from "./Loading";
import React, { useEffect, useState } from 'react';
const AESlib = require('crypto-aes-ecb');


const Enkrip = (props)=>{
    const [cipertextBelumDibuat, setCipertextBelumDibuat] = useState(true);
    const [hasilCiperText,setHasilCiperText] = useState(null)
    const [kunciEnkripsi,setkunciEnkripsi] = useState(null)
    useEffect(() => {
        createCiphertext();
      }, []);
    

    let cipertext = null

    let plainText = props.plainText;

    if(plainText == ''){
        alert("Pesan Belum Di Upload !")
        window.location.reload()
        return 
    }

    let key = props.myKey

    const createCiphertext = () => {
        // Fungsi asinkron untuk membuat cipertext
        new Promise((resolve, reject) => {
          // Simulasi proses pembuatan cipertext
          setTimeout(() => {
            console.log(`Plaintext hasil base64 dari upload file adalah : \n ${plainText}`)
            console.log(`key yang diberikan dari user adalah : \n ${key}`)
            let keyHash = CryptoJS.SHA256(key).toString().slice(0,16);
            console.log(`key yang dilakukan hasing dengan SHA 256 adalah : \n ${keyHash}`)
            keyHash = keyHash.toString()
            console.log(`key hasing yang dipotong sejumlah 128 bit adalah : \n ${keyHash}`)
            
            console.log(`proses melakukan encripsi \n plaintext : \n ${plainText} \n key : ${keyHash}`)
            const cipertext = AESlib.Aes128EcbEncrypt(plainText,keyHash);
            console.log(`Hasil Cipertext adalah cipertext : ${cipertext}`)

            //return
            
            resolve(cipertext); // Mengirimkan hasil cipertext ke resolve promise
          
            // console.log("cipertext : ",cipertext)
            // console.log("key : ",keyHash)

            //const cipertext = CryptoJS.AES.encrypt(plainText, key).toString();

            // const iv = { words: [ 0, 0, 0, 0 ], sigBytes: 16 }
            // let code = CryptoJS.AES.encrypt(plainText, CryptoJS.enc.Utf8.parse(key), { iv }).toString()
            // console.log("ciper asw : ", code);
            // return
            
            //CryptoJS.AES.decrypt(code, CryptoJS.enc.Utf8.parse('your secret key'), { iv }).toString(CryptoJS.enc.Utf8)
            
          }, 2000); // Waktu simulasi pembuatan cipertext
    
        }).then((cipertext) => {
          setCipertextBelumDibuat(false); // Memperbarui nilai cipertextBelumDibuat setelah cipertext selesai dibuat
          console.log("panjang plaintext : " + plainText.length)
            console.log("panjang cipertext : " + cipertext.length)
            console.log("panjang cipertext setelah di tambahkan penanda dalam satuan bit : " + (cipertext.length + "-=HUDZA=-".length) *8)
            console.log("panjang cipertext setelah di tambahkan penanda dalam dalam satuan KB : " + ((cipertext.length + "-=HUDZA=-".length) *8)*0.000125)
            console.log("maximal panjang bit : 84588300 bit atau 10573,5375 KB ")
            //console.log(cipertext)
            if((cipertext.length + "-=HUDZA=-".length) *8 > 84588300){
                alert("Maaf Panjang text enkripsi yang dihasilkan terlalu panjang. upload file yang lebih kecil ukuranya")
                window.location.href = "index.js"
                return
            } 

            setHasilCiperText (<textarea id="ciperText" className="box">{cipertext}</textarea>)
            setkunciEnkripsi (<textarea className="box" id="myKey">{key}</textarea>)
            document.getElementById("tahap2").scrollIntoView();

        
        });
      };
    //console.log(props)
    //cipertext = CryptoJS.AES.encrypt(plainText,key,{keySize: 128/8}).toString()
    
    return(
        <div>
            <div>
                {hasilCiperText}
                {kunciEnkripsi}
            </div>
            {cipertextBelumDibuat && (<Loading/>)}
            {/*<MyCanvas message={cipertext}/> */}

        </div>
    )
}


export default Enkrip;
