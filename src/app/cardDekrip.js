import React, { useState } from "react";
import Dekrip from "./Dekrip";
import Enkrip from "./Enkrip";


function CardDekrip (props){

    //handler Card Dekripsi
    let elementDekrip = <p></p>

     if(props.elementDekrip === "true" ){
         let ciperText = props.ciperText;
         let myKey = props.myKey
        
         console.log(ciperText,myKey)

         elementDekrip = <Dekrip ciperText={ciperText} myKey={myKey}/>
     }

     return(
        <div>
            {elementDekrip}
        </div>
     )

      
       



}

export default CardDekrip