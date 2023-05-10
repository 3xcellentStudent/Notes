import React from "react";
import Input from './parts/Input'
import Filter from './parts/Filter'
import './Tools.scss'

export default function Tools(){
   return(
      <div className="tools">
         <Input/>
         <Filter/>
      </div>
   )
}