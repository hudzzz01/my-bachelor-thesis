import { useState,useRef } from 'react';
import './App.css';

import CardDekrip from './cardDekrip';
import CardEnkrip from './cardEnkrip';
import CanvasDeSteganoGrafi from './CanvasDeSteganoGrafi';
import Dekrip from './Dekrip';
import Enkrip from './Enkrip';
import MyCanvas from './MyCanvas';
import Base64 from './Base64';
import Base64Dekrip from './Base64Dekrip';



function App() {
  //let plainText = "hudzaifah"
  //let myKey = "assyahid"
  //base64
  

  //variable AES
  const [enableEnkrip,setEnableEnkrip] = useState("false")
  const [enableDekrip,setEnableDekrip] = useState("false")
  const [plainText,setPlaintText] = useState("")
  const [ciperText,setCiperText] = useState("")
  const [myKey,setMyKey] = useState("")
  const [myDekripKey,setMyDekripKey] = useState("")
  const [base64Text,setBase64Text] = useState(null)
  //const [tombolGunakanKunci,setTombolGunakanKunci] = useState("false")


  //variable steganografi
  const [textTombol,setTextTombol] = useState("")
  const [img1,setImg1] = useState("")

  //variable destegano
  const [selectedFile, setSelectedFile] = useState(null);

  function tombolEnkripsi(){
    //document.getElementById("pesan").setAttribute("style","display:''")
    //document.getElementById("elemen Dekripsi").setAttribute("style","display:''")
    
    
    setEnableEnkrip("true")
    setEnableDekrip("false")
    setPlaintText (document.getElementById("plainText").value)
    setMyKey (document.getElementById("myKey").value)
    setTextTombol("Gunakan Cipertext tersebut ")
    
  }

  function tombolDekripsi(){
    setEnableEnkrip("false")
    setEnableDekrip("true")
    setCiperText(document.getElementById("pesanCiperText").value)
    setMyDekripKey (document.getElementById("dekripKey").value)
  }

  function tombolUploadGambar(){
      if(document.getElementById("ciperText")!=null){
        let myCiperText = document.getElementById("ciperText").innerHTML
        setEnableEnkrip("false")
        setCiperText(myCiperText)
        

      }else{
        alert("ciper text belum di definisikan")
      }
  }

  //upload file stegano
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Lakukan permintaan pengunggahan ke server di sini
      // Misalnya, menggunakan fetch() atau axios.post()

      //console.log('File uploaded:', selectedFile);
    }
  }
    

  return (
    <div >
    
      <div id="atas">
            <p>IMPLEMENTASI STEGANOGRAFI MENGGUNAKAN METODE LSB PADA CITRA DINAMIS</p>
            <h6>M. Hudzaifah Assyahid 11190910000108</h6>
      </div>
      <div class="section">
      <div class='containerSection'>
          <div className='judulTahap'>
                <h1>Tahap 1 Enkripsi</h1>
              </div>
          <div id='container' style={{
            display:"flex",flexDirection:"column",alignItems:"center"
            }}>    
            <Base64 />
          </div>
      </div>
      
      <MyCanvas/>

      </div>

      <div class="section" >
        <CanvasDeSteganoGrafi/>
      </div>

      
   
   

    </div>
  );
}

export default App;
