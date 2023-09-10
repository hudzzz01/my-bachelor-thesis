import React, { useState } from 'react';

const Base64Dekrip = (props) => {
  const [base64Data, setBase64Data] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [formatFile,setFormatFile] = useState(null);

  const handleBase64Change = (event) => {
    
  };


  const handleDecryptClick = () => {
      let formatFile = ""
      if(props.base64Data.slice(0,4) == "iVBO"){
        formatFile = ".png"
      }else if(props.base64Data.slice(0,4) == "/9j/"){
        formatFile = ".jpg"
      }else if (props.base64Data.slice(0,4) == "AAAA"){
        formatFile = ".mp4"
      }else if (props.base64Data.slice(0,4) == "SUQz"){
        formatFile = ".mp3"
      }else{
        formatFile = ".txt"
      }
      setFormatFile("decrypted_file"+formatFile)
 
      const byteCharacters = atob(props.base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      setDownloadLink(url);
    
  };
  

  return (
    <div id='decodeElm'>
      {/*<textarea class='textBox' value={base64Data} onChange={handleBase64Change} placeholder='masukan pesan' />*/}
      <button class='tombol' onClick={handleDecryptClick}>Create Link Download</button>
      {downloadLink && (
        <div>
          <h3>Download Link:</h3>
          <a href={downloadLink} download={formatFile}>Download</a>
        </div>
      )}
    </div>
  );
};

export default Base64Dekrip;
