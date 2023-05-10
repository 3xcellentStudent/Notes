import React from "react";

export default function Input(){

   
   const SVG = () => {
      return(
         <svg fill="#505050" width="800px" height="800px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
            <path d="M1458.948 1305.626c104.637-136.95 167.527-307.187 167.527-492.388C1626.475 364.764 1261.711 0 813.238 0 364.764 0 0 364.764 0 813.238c0 448.473 364.764 813.237 813.238 813.237 185.201 0 355.547-62.89 492.496-167.527L1766.678 1920 1920 1766.678l-461.052-461.052Zm-645.71 103.986c-328.874 0-596.375-267.61-596.375-596.374 0-328.765 267.501-596.375 596.375-596.375 328.873 0 596.374 267.61 596.374 596.375s-267.501 596.374-596.374 596.374Z" fillRule="evenodd"/>
         </svg>
      )
   }

   const svgCont = React.useRef()
   
   function changeInput(e){
      const {value} = e.target
      if(value) svgCont.current.classList.add('contain')
      else svgCont.current.classList.remove('contain')
   }

   return(
      <div className="search-input-container" onChange={e => changeInput(e)}>
         <input type="text" className="search-input" placeholder="Search:" />
         <div ref={svgCont} className="svg-container">
            <SVG/>
         </div>
      </div>
   )
}