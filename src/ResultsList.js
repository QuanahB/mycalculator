import React from "react";
import Results from "./Results.js"

export default function ResultsList({results,reuse}){
    return(
        results.map(result => {
            return <Results key={result.id} number={result.number} reuse={reuse} />
        })
    )
}