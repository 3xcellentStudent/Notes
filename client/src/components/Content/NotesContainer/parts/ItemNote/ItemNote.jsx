import React from "react";
import {NavLink} from 'react-router-dom'

import SVGDots from '../../../../SVG/SVGDots'
import SVGFlag from '../../../../SVG/SVGFlag'
import SVGProgress from '../../../../SVG/SVGProgress'
import SVGEdit from '../../../../SVG/SVGEdit'
import './ItemNote.scss'

export default function ItemNote(){

   return(
      <div className="item-note-container">
         <div className="title-container">
            <input type="text" defaultValue={'My Task'} />
         </div>

         <NavLink className="edit-wrapper">
            <span>Edit</span>
            <div className="svg-container">
               <SVGEdit/>
            </div>
         </NavLink>

         <div className="set-date-wrapper">
            <div className="set-date-container">
               <input type="text" placeholder="Set end date" maxLength={10} />
            </div>
         </div>

         <div className="status">
            <button className="colored-button">Not Started</button>
         </div>

         <div className="priority-wrapper">
            <button className="priority-container">
               <div className="svg-container">
                  <SVGFlag/>
               </div>
            </button>
         </div>

         <div className="progress">
            <div className="svg-container">
               <SVGProgress/>
            </div>
            <span>0%</span>
         </div>

         <span className="item-note-span">
            <button className="svg-container">
               <SVGDots/>
            </button>
         </span>
      </div>
   )
}