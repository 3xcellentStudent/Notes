import React from "react";
import SideBar from './parts/SideBar/SideBar'
import Description from './parts/Description/Description'
import './Header.scss'

export default function Header(){
   return(
      <header>
         <SideBar/>
         <Description/>
      </header>
   )
}