import React from "react";
import ItemNote from './NotesContainer/parts/ItemNote/ItemNote'
import ItemAddNote from './NotesContainer/parts/ItemAddNote/ItemAddNote'
import './Content.scss'

export default function Content(){
   return(
      <main>
         <ItemAddNote/>
         <ItemNote/>
         <ItemNote/>
      </main>
   )
}