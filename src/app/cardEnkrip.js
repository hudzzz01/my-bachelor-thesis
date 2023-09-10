import React, { useState } from "react";
import Dekrip from "./Dekrip";
import Enkrip from "./Enkrip";
import Loading from "./Loading";


function CardEnkrip (props){

    //handler Card Enkripsi
    let elementEnkripsi 

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



}

export default CardEnkrip