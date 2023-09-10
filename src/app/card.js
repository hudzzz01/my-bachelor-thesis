import React, { useState } from "react";
import Dekrip from "./Dekrip";
import Enkrip from "./Enkrip";

function Card (props){

    //handler Card Enkripsi
    let elementEnkripsi  = <p></p>

    if(props.elementEnkrip === "true"){
        let plainText = props.plainText
        let myKey = props.myKey


        elementEnkripsi = <Enkrip plainText={plainText} myKey={myKey} />
        return(
            <div>
                {elementEnkripsi}
            </div>
        )
    }


    //handler Card Dekripsi
    let elementDekrip = <p></p>

    if(props.elementDekrip === "true" ){
        let ciperText = props.ciperText;
        let myKey = props.myDekripKey

        console.log(ciperText,myKey)
    }
    

}

export default Card