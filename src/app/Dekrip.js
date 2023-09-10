import React from "react";
import { ReactDOM } from "react";
import CryptoJS from "crypto-js";
import './App.css'
import Base64Dekrip from "./Base64Dekrip";
const AESlib = require('crypto-aes-ecb');

const Dekrip = (props)=>{
    //let getText = document.getElementById("ciperText").innerHTML.split(" ")
    let ciperText = props.ciperText
    let myKey = props.myKey
    console.log('dekrip function running',myKey,ciperText)
    let keyHash = CryptoJS.SHA256(myKey).toString().slice(0,16);
    let plainText = ""
    try {
        plainText = AESlib.Aes128EcbDecrypt(ciperText,keyHash)
    } catch (error) {
        alert("Kunci yang dimasukan salah")
        window.location.href="index.js"
    }

    
    console.log("keynya adalah : "+myKey,"Plaint text : "+plainText,"Cipertext : "+ciperText)

    let hasilPlainText = <textarea id="plainTextUntukDekrip" class='box'>{plainText}</textarea>
    let hasilKunci = <textarea class='box'>{myKey}</textarea>

    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    // link.href = url;
    // link.download = 'plain_text.txt';
    // link.click();
    console.log(plainText)
    return(
        <div>
            {hasilPlainText}
            {hasilKunci}
            <Base64Dekrip base64Data={plainText}/>
        </div>
    )
}


export default Dekrip;
