import React from "react"

export default function SVGProgress(){

   const [strokeDashoffset, setDashoffset] = React.useState(0)

   function calcProgress(){}

   return(
      <svg style={{transform: 'rotate(-90deg)'}} viewBox="0 0 100 100">
         <circle cx="50" cy="50" r="46" stroke="#2ECC71" strokeWidth="8" fill="transparent" 
         strokeDashoffset={strokeDashoffset} strokeDasharray={295} />
      </svg>
   )
}