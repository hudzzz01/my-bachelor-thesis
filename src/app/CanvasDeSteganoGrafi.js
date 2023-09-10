import React, { useRef, useEffect, useState } from 'react';
import Dekrip from './Dekrip';
import './App.css'
import CardDekrip from './cardDekrip';
import Base64Dekrip from './Base64Dekrip';
import Loading from './Loading';



function CanvasDeSteganoGrafi(props){

    const [loading,setLoading] = useState(false);

    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [celarPlainTextString,setCelarPlainTextString] = useState(null)

    //variable AES
    const [enableEnkrip,setEnableEnkrip] = useState("false")
    const [enableDekrip,setEnableDekrip] = useState("false")
    const [plainText,setPlaintText] = useState("")
    const [ciperText,setCiperText] = useState("")
    const [myKey,setMyKey] = useState("")
    const [myDekripKey,setMyDekripKey] = useState("")
    const [base64Text,setBase64Text] = useState(null)


    const canvasRef = useRef(null);

    function tombolDekripsi(){
      setEnableEnkrip("false")
      setEnableDekrip("true")
      setCiperText(celarPlainTextString)
      setMyDekripKey (document.getElementById("dekripKey").value)
    }
    // if(celarPlainTextString){
       
    // }

    const handleImageUpload = (event) => {
        setLoading(true)
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImage(reader.result);
                 
        };
      };

      useEffect(() => {
        if (image) {
          
          //console.log(ciperText)
          //original canvas image
          
          const canvas = canvasRef.current;
          
          const ctx = canvas.getContext('2d');
    
          const img = new Image();
          img.src = image;
          img.onload = () => {
            canvasRef.current.width = img.width
            canvasRef.current.height = img.height
            ctx.drawImage(img, 0, 0);
            setImage2(image)
            
          };
    
          //
          
        }
      }, [image]);
    
    
    
    useEffect(()=>{
        if(image2){
        
            
            let stegaCanvas = canvasRef.current;
            let ctxStegaCanvas = stegaCanvas.getContext('2d')
        
            let width = stegaCanvas.width
            let height = stegaCanvas.height
        
            let myImage = ctxStegaCanvas.getImageData(0,0,width,height);
            let scan = myImage.data
        
            let plainTextBinary = '';
            let num = 0;
        
            for(let i =0; i<scan.length;i+=4){
                let redBinnary = scan[i].toString(2).padStart(8,'0');
                let blueBinnary = scan[i+1].toString(2).padStart(8,'0');
                let greenBinnary = scan[i+2].toString(2).padStart(8,'0');
            
                plainTextBinary = plainTextBinary + redBinnary[redBinnary.length-1] ;
                num ++
                if(num %8 == 0){
                    plainTextBinary+=" "
                }
                    
                plainTextBinary = plainTextBinary + blueBinnary[blueBinnary.length-1] ;
                num ++
                if(num %8 == 0){
                    plainTextBinary+=" "
                }
                    
                plainTextBinary = plainTextBinary + greenBinnary[greenBinnary.length-1];
                num ++
        
                if(num %8 == 0){
                    plainTextBinary+=" "
                }
        
            }
        
            plainTextBinary = plainTextBinary.split(" ")
            let  plainTextString = '';
        
            plainTextBinary.forEach(binStr => {
                let numCharCode = parseInt(binStr,2)
        
        
                if(numCharCode>=32 && numCharCode<= 127){
                    plainTextString += String.fromCharCode(numCharCode)
                    
                }
        
            });

            console.log(plainTextString.split("-=HUDZA=-")[0])
            
        
            setCelarPlainTextString(plainTextString.split("-=HUDZA=-")[0])

            const blob = new Blob([plainTextString.split("-=HUDZA=-")[0]], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'pesan_Tersemat_TerEnkripsi.txt';
            //link.click();
            //URL.revokeObjectURL(url);
            
        
            //console.log("pesan tersembunyi yang masih ter enkripsi : ", celarPlainTextString)        
            
            setLoading(false)
            
           }
          
    
      },[image2])
     
      return(
        <div className='containerSection' >
          
          {loading && (<Loading/>)}
          <div className='judulTahap'>
            <h1>Tahap 3 Dekripsi</h1>
          </div>
          <div className='main'>
              <div id='deStegano'>
                <div id="dsElm">
                <input class='tombol' type="file" onChange={handleImageUpload} />
                <canvas ref={canvasRef}/>
            
                <div id='dekripElm'>
                  { /*<input class='textBox' type="text" id="pesanCiperText" placeholder='pesan ciper'></input> */}
                  <div><label>Masukan kunci : </label><input class='textBox' type="text" id="dekripKey" placeholder='kunci'></input> </div> 
                </div>
              </div>
              <div className='decodeElm'>
                <button class='button' onClick={tombolDekripsi}  > Dekripsi Pesan </button>
                <CardDekrip elementDekrip={enableDekrip} ciperText={celarPlainTextString} myKey={myDekripKey} id="elementDekripsi" />
              </div>
            
              </div>  
          </div>
          
        </div>
    )

} 

export default CanvasDeSteganoGrafi;