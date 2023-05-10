import React from "react";
import SVGPlus from '../../../../SVG/SVGPlus'
import './ItemAddNote.scss'

export default function ItemAddNote(){

   return(
      <button className="item-add-note-container">
         <div className="svg-container">
               <SVGPlus/>
         </div>
         <span className="item-add-note-span">Add New Task</span>
      </button>
   )
}