import React, { useState,useRef } from 'react';
import './App.css';
import CardEnkrip from './cardEnkrip';
import Loading from './Loading';

const Base64 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Data, setBase64Data] = useState('');
  const [enableEnkrip,setEnableEnkrip] = useState("false")
  const [enableDekrip,setEnableDekrip] = useState("false")
  const [plainText,setPlaintText] = useState("")
  const [ciperText,setCiperText] = useState("")
  const [myKey,setMyKey] = useState("")
  const [myDekripKey,setMyDekripKey] = useState("")
  const [loading,setLoading] = useState("");


  function tombolEnkripsi(){
    //document.getElementById("pesan").setAttribute("style","display:''")
    //document.getElementById("elemen Dekripsi").setAttribute("style","display:''")
    
    
    setEnableEnkrip("true")
    setEnableDekrip("false")
    setPlaintText (base64Data)
    setMyKey (document.getElementById("myKey").value)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setLoading("true");
    convertToBase64(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    convertToBase64(file);
    console.log(file)
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setBase64Data(base64String);

      if( base64String.length*8 > 84588300){
        alert("Maaf Panjang text Base64 yang dihasilkan terlalu panjang. upload file yang lebih kecil ukuranya di bawah 10MB")
        window.location.href="";
    } 


      console.log(base64String)
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div id="conBase64">
      {loading && (<Loading/>)}
      <div id="flexBase64"> 
          <div>
            <div className="input">  
              <p>Pilih pesan yang akan disisipkan :</p>   
                <input
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <p>#Ukuran maximal pesan adalah 1 MB</p>
              <p>#Pesan dapat berupa tulisan (.txt)</p>
              <p>#Pesan dapat berupa gambar (.jpg,.png)</p>
              <p>#Pesan dapat berupa video (.mp4)</p>
              
          </div>
        

        <div id='enkripElm'>
            {/* <input type="text" id="plainText" placeholder='pesan anda' class="textBox"></input> */}
            <div><label>Masukan Kunci : </label><input type="text" id="myKey" placeholder='kunci' class="textBox"></input></div>
            <p>#panjang maksimal kunci 100 carakter</p>
        </div>
      </div>
      <button onClick={tombolEnkripsi}  > ENKRIPSI </button>
      
      <CardEnkrip elementEnkrip={enableEnkrip} plainText={base64Data} myKey={myKey} id="elementEnkripsi" />
    </div>
  );
};

export default Base64;
