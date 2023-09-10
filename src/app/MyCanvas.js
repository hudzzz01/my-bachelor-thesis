import React, { useRef, useEffect, useState } from 'react';
import Loading from './Loading';

let binaryciperText = ""

function calculatePSNR(originalImageData, stegoImageData) {
  const originalData = originalImageData.data;
  const stegoData = stegoImageData.data;
  const length = originalData.length;

  let mseSum = 0;
  for (let i = 0; i < length; i += 4) {
    const originalRed = originalData[i];
    const originalGreen = originalData[i + 1];
    const originalBlue = originalData[i + 2];

    const stegoRed = stegoData[i];
    const stegoGreen = stegoData[i + 1];
    const stegoBlue = stegoData[i + 2];

    const mseRed = Math.pow(originalRed - stegoRed, 2);
    const mseGreen = Math.pow(originalGreen - stegoGreen, 2);
    const mseBlue = Math.pow(originalBlue - stegoBlue, 2);

    mseSum += mseRed + mseGreen + mseBlue;
  }

  const mse = mseSum / (length / 4);
  const maxValue = 255;
  const psnr = 10 * Math.log10((maxValue * maxValue) / mse);

  return psnr;
}

function hitungScalaInterpolasi(width,higth,panjangPesan){
  
  let scale = 2;

  let bitWadahAkhir = ((width*scale)*(higth*scale))*3

  while(bitWadahAkhir<panjangPesan){
      scale++;
      bitWadahAkhir = ((width*scale)*(higth*scale))*3

      console.log(`bit akhir ${bitWadahAkhir} panjang pesan ${panjangPesan}`)

  }
  

  return scale

}

function MyCanvas(props) {
  
  const canvasElements = document.querySelectorAll('canvas');


  // canvasElements.forEach((canvas) => {
  //   canvas.style.display = 'none'; // Mengubah properti display menjadi 'none'
  // });

  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const canvasRef3 = useRef(null);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [loading,setLoading] = useState(null);
  const [arrDraw,setarrDraw] = useState(null);


  const [imageOri, setImageOri] = useState(null);
  const [imageInter, setImageInter] = useState(null);
 
  const [psnr,setpsnr] = useState('')

  const handleImageUpload = (event) => {  
    setLoading(true)

    if(document.getElementById("ciperText") === null){
      alert("Lakukan Enkripsi pesan terlebih dahulu !")
      window.location.href="index.js"
      return
    }
    const ciperText = document.getElementById("ciperText").value + "-=HUDZA=-";

    for(let i=0;i<ciperText.length;i++){
      binaryciperText += 
      ciperText[i].charCodeAt(0).toString(2).padStart(8,'0')
      }
    
    // console.log(ciperText)
    // return
    console.log("Cipertext : " + ciperText)
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  function calculatePSNR(originalImageData, stegoImageData) {
    const originalData = originalImageData.data;
    const stegoData = stegoImageData.data;
    const length = originalData.length;
  
    let mseSum = 0;
    for (let i = 0; i < length; i += 4) {
      const originalRed = originalData[i];
      const originalGreen = originalData[i + 1];
      const originalBlue = originalData[i + 2];
  
      const stegoRed = stegoData[i];
      const stegoGreen = stegoData[i + 1];
      const stegoBlue = stegoData[i + 2];
  
      const mseRed = Math.pow(originalRed - stegoRed, 2);
      const mseGreen = Math.pow(originalGreen - stegoGreen, 2);
      const mseBlue = Math.pow(originalBlue - stegoBlue, 2);
  
      mseSum += mseRed + mseGreen + mseBlue;
    }
  
    const mse = mseSum / (length / 4);
    const maxValue = 255;
    const psnr = 10 * Math.log10((maxValue * maxValue) / mse);
  
    return psnr;
  }

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
        setImageOri ( ctx.getImageData(0, 0, img.width,img.height))
        const imageURL = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = imageURL;
        downloadLink.download = 'original_image.png';
        //downloadLink.click();
      };

      //auto download gambar
      
    }
  }, [image]);

  useEffect(()=>{
    if(image2){
        //nn interpolation
        const canvas =canvasRef.current;
        const ctx = canvas.getContext('2d')
    
        let myImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        let imageData = myImageData.data;
        console.log("panjang asli data image",imageData.length);
        console.log("panjang data pesan ",binaryciperText.length);
        let pembulatan = 1
        if(binaryciperText.length>imageData.length){
            //pembulatan = Math.ceil(binaryciperText.length/imageData.length)
            pembulatan = hitungScalaInterpolasi(myImageData.width,myImageData.height,binaryciperText.length)

            if(myImageData.width * pembulatan >= 5310){
              alert("hasil interpolasi lebar lebih dari 5310 px silahkan ganti gambar yang perfektif 1:1 atau mengurangi panjang pesan")
              window.location.href="index.js"
              return
            }
            if(myImageData.height * pembulatan >5310){
              alert("hasil interpolasi lebar lebih dari 5310 px silahkan ganti gambar yang perfektif 1:1 atau mengurangi panjang pesan")
              window.location.href="index.js"
              return
            }

        }
        let sclX = pembulatan;
        let sclY = sclX;
        let pixelRGB = imageData.length - (imageData.length/4)

        console.log(`banyaknya wadah pixel : ${pixelRGB}`)
        console.log(`Scaling ${pembulatan} x`)
        let selisih = (imageData.length*sclX*sclY) - imageData.length
        console.log(`banyak pixel yang di tambah ${selisih}`)
        let selisihSetelahInterpolasi = (imageData.length*sclX*sclY) - (pixelRGB*sclX*sclY)
        console.log(`selisih jumlah pixel asli dengan pixel wadah yang tersedia setelah interpolasi ${selisihSetelahInterpolasi} `)
        let pixelRGBInter = (pixelRGB*sclX*sclY)
        console.log(`jumlah wadah pixel yang tersedia setelah interpolasi ${pixelRGBInter}`)
        console.log("keseluruhan pixel hasil scale",imageData.length*sclX*sclY)
        let imageDataNew = []
        let x = []
        let baris = []
        for(let i=0; i<imageData.length-1;i+=4){
          baris.push(imageData[i])
          baris.push(imageData[i+1])
          baris.push(imageData[i+2])
          baris.push(imageData[i+3])

        }
        let temp = []
        let count = 0
        let newData = []
        for(let i=1;i<baris.length+1;i++){
          
          temp.push(baris[i-1])
          count ++
          
          if(count == myImageData.width*4){
            count = 0
            console.log(i)
            newData.push(temp)  
            //console.log(temp)
            temp = []
          }
        }

        let newImageData = []
        for(let i=0;i<newData.length;i++){
          //console.log(newData[i])
          let tempRow = []
          for(let j=0; j<newData[i].length; j+=4){
            //tambah row sebanyak scaling
            for(let k=0; k<pembulatan;k++){
              tempRow.push(newData[i][j])
              tempRow.push(newData[i][j+1])
              tempRow.push(newData[i][j+2])
              tempRow.push(newData[i][j+3])
            }
            //count++
            
          }
          console.log(pembulatan,tempRow)

          //tambah colom sebanyak scaling
          for(let k=0; k<pembulatan;k++){
            newImageData.push(tempRow)
          }

        }

        let clearNewImageData = []
        for(let i=0; i<newImageData.length; i++){
          for(let j=0; j<newImageData[i].length; j++){
            clearNewImageData.push(newImageData[i][j])
          }
        }
        
        //console.log(clearNewImageData)
        

        //setarrDraw(newImageData)
        setarrDraw(clearNewImageData)
        
        
        //console.log(imageData);
        //console.log(imageData.length);
        //console.log(x);
        //console.log(x.length);
        //console.log(baris)
        

        // for (let y = 0; y < myImageData.height * sclY; y++) {
        //     const origY = Math.round(y / sclY);
        //     for (let x = 0; x < myImageData.width * sclX; x++) {
        //         const origX = Math.round(x / sclX);
        //         const index = (origY * myImageData.width + origX) * 4;
        
        //         // Menambahkan nilai RGBA ke array imageDataNew
        //         imageDataNew.push(imageData[index]);        // R
        //         imageDataNew.push(imageData[index + 1]);    // G
        //         imageDataNew.push(imageData[index + 2]);    // B
        //         imageDataNew.push(imageData[index + 3]);    // A
        //     }
        // }
        

        //interpolasi
          // let scl = pembulatan
          // for(let i=0; i<myImageData.height-1)
        
          console.log(imageDataNew.length);

          const canvas2 = canvasRef2.current;
          const ctx2 = canvas2.getContext('2d')

          const imageBesar = ctx.createImageData(myImageData.width*sclX, myImageData.height * sclY)
          imageBesar.data.set(clearNewImageData)

          canvasRef2.current.width = myImageData.width*sclX;
          canvasRef2.current.height = myImageData.height * sclY;
          ctx2.putImageData(imageBesar,0,0)
          setImage3 (image2)
          setImageInter (ctx2.getImageData(0, 0, myImageData.width*sclX,myImageData.height * sclY))
           //auto download gambar
           const imageURL = canvas2.toDataURL('image/png');
           const downloadLink = document.createElement('a');
           downloadLink.href = imageURL;
           downloadLink.download = 'interpolasi_image.png';
           //downloadLink.click();
        
        
    }
    

  },[image2])

  //steganografi
  useEffect(()=>{
        //image steganografi lsb
        if(image3){
            const canvas =canvasRef2.current;
            const ctx = canvas.getContext('2d');

            let canvas2 = canvasRef3.current;
            let ctx2 = canvas2.getContext('2d');

            let width = canvasRef2.current.width
            let height = canvasRef2.current.height

            let myImage = ctx.getImageData(0,0,width,height)
            let scan = myImage.data
            let textIndex = 0;

            for(let i =0; i<scan.length;i+=4){
                let redBinnary = scan[i].toString(2).padStart(8,'0');
                let blueBinnary = scan[i+1].toString(2).padStart(8,'0');
                let greenBinnary = scan[i+2].toString(2).padStart(8,'0');


                let redBinnaryadd = redBinnary
                let blueBinnaryadd = blueBinnary
                let greenBinnaryadd = greenBinnary

                if(binaryciperText[textIndex] != undefined){
                    redBinnaryadd = redBinnary.slice(0,-1)+binaryciperText[textIndex]
                }
                if(binaryciperText[textIndex+1] != undefined){
                    blueBinnaryadd = blueBinnary.slice(0,-1)+binaryciperText[textIndex+1]
                }
                if(binaryciperText[textIndex+2] != undefined){
                    greenBinnaryadd = greenBinnary.slice(0,-1)+binaryciperText[textIndex+2]
                }

                scan[i] = parseInt(redBinnaryadd,'2')
                scan[i+1] = parseInt(blueBinnaryadd,'2')
                scan[i+2] = parseInt(greenBinnaryadd,'2')

                textIndex+=3

            }
            
            //myImage.data = scan;
            canvas2.width = width
            canvas2.height = height
            ctx2.putImageData(myImage,0,0)
            
            const imageNew = ctx.createImageData(width,height)
            imageNew.data.set(scan)
  
            canvasRef3.current.width = width;
            canvasRef3.current.height = height;
            ctx2.putImageData(imageNew,0,0)
            
            // setImage3 (image2)
            const imageStega = ctx2.getImageData(0, 0, width,height)
            //auto download gambar
            const imageURL = canvas2.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = imageURL;
            downloadLink.download = 'stega_image.png';
            downloadLink.click();

            console.log("ori",imageOri,"inter",imageInter,"stega",imageStega)
            
            console.log("ori,inter",calculatePSNR(imageOri,imageInter))
            console.log("ori,stega",calculatePSNR(imageOri,imageStega))
            console.log("inter,stega",calculatePSNR(imageInter,imageStega))
            console.log("ori,ori",calculatePSNR(imageOri,imageOri))
            console.log("inter,inter",calculatePSNR(imageInter,imageInter))

            setpsnr(calculatePSNR(imageInter,imageStega))
            setLoading(false)
            document.getElementById("psnr").scrollIntoView();

            //ambil array yang berbeda 
            let beda = []
            let bedaSelisih = []
            for(let i=0; i<imageInter.data.length;i++){
              //console.log(imageStega.data[i])
              if(imageInter.data[i] != imageStega.data[i]){
                beda.push(imageStega.data[i])
                bedaSelisih.push(imageStega.data[i] - imageInter.data[i])
                //console.log("beda")
              }else{
                bedaSelisih.push(0)
              }
            }
            console.log(beda)
            console.log(bedaSelisih)
        }
  },[image3]);

 
  
 

  return (
    <div className='containerSection'>
      {loading && (<Loading/>)}
      <div className='judulTahap'>
        <h1 id="tahap2" >Tahap 2 Steganografi</h1>
      </div>
        <div className='main'>
          <div className='input'>
            <label>Pilih gambar format (*.png,*jpg) yang akan disisipi pesan </label> <input type="file" onChange={handleImageUpload} />
          </div>
          <canvas ref={canvasRef} className='allCanvas' />
          <div className='judulTahap'>
            <p>2.a Nearst Neigboor Interpolation</p>
          </div>
          <canvas ref={canvasRef2} className='allCanvas'/>
          <div className='judulTahap'>
            <p>2.b Penyisipan pesan</p>
          </div>
          <canvas ref={canvasRef3} className='allCanvas'/>
          <p id='psnr' >PSNR : {psnr} </p>
      </div>
      
    </div>
  );
}

export default MyCanvas;