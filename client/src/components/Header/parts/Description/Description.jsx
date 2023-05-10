import React from "react";
import SVGDots from '../../../SVG/SVGDots'
import './Description.scss'

export default function Description(){

   return(
      <div className="description-container">
         <span className="description-span">Task</span>
         <span className="description-span">Edit</span>
         <span className="description-span">End Date</span>
         <span className="description-span">Status</span>
         <span className="description-span">Priority</span>
         <span className="description-span">Progress</span>
         <span className="description-span">
            <div className="svg-container">
               <SVGDots/>
            </div>
         </span>
      </div>
   )
}