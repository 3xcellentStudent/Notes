import React from "react";
import {useDispatch} from 'react-redux'

import {setTitle} from '../../../../../../../store/Slices/filterSlice'

import SVGSearch from '../../../../../../SVG/SVGSearch'

export default function Input(){

   const dispatch = useDispatch()

   const svgCont = React.useRef()
   
   function changeInput(e){
      const {value} = e.target
      if(value) svgCont.current.classList.add('contain')
      else svgCont.current.classList.remove('contain')
      dispatch(setTitle(value))
   }

   return(
      <div className="search-input-container" onChange={e => changeInput(e)}>
         <input type="text" className="search-input" placeholder="Search:" />
         <div ref={svgCont} className="svg-container">
            <SVGSearch/>
         </div>
      </div>
   )
}