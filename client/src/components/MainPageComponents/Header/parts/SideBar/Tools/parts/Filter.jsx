import React from "react";

import FilterComplete from "./filterParts/FilterComplete";
import FilterPriority from "./filterParts/FilterPriority";
import FilterTime from "./filterParts/FilterTime";

export default function Filter(){

   const SVG = () => {
      return(
         <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V6.17157C3 6.70201 3.21071 7.21071 3.58579 7.58579L9.41421 13.4142C9.78929 13.7893 10 14.298 10 14.8284V20V20.2857C10 20.9183 10.7649 21.2351 11.2122 20.7878L12 20L13.4142 18.5858C13.7893 18.2107 14 17.702 14 17.1716V14.8284C14 14.298 14.2107 13.7893 14.5858 13.4142L20.4142 7.58579C20.7893 7.21071 21 6.70201 21 6.17157V5C21 3.89543 20.1046 3 19 3Z" stroke="#505050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
         </svg>
      )
   }

   const [isActive, setIsActive] = React.useState(false)

   function changeClasses(){setIsActive(!isActive)}

   return(
      <div className="filter-wrapper">
         <button onClick={() => changeClasses()} className="filter">
            <div className="svg-container">
               <SVG/>
            </div>
         </button>

         <FilterComplete toggle={isActive}/>
         <FilterPriority toggle={isActive}/>
         <FilterTime toggle={isActive}/>
      </div>
   )
}