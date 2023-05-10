import React from "react";
import './SideBar.scss'
import Tools from "./Tools/Tools";

export default function SideBar(){
   return(
      <div className="sidebar-wrapper">
         <div className="sidebar-container">
            <h1>Task Board</h1>
            <Tools/>
         </div>
      </div>
   )
}