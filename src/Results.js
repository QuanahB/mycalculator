//Results should be text with a "Delete" and "Use in input" buttons
import React from "react";

export default function Results({number,reuse}){


    function letsSee(){
        reuse(number)
    }

    return(
        <>
        <div className="result">
        <p className="text-white">{number}</p>
        <button className="reuse-button" onClick={letsSee}>Reuse</button>
        </div>
        </>
    )
}