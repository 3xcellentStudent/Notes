import React from "react";
import {useDispatch, useSelector} from 'react-redux'

import {setDataOfApart} from '../../../../../../store/Slices/dataOfApartSlice'

import SVGBasket from "../../../../../SVG/SVGBasket";
import XHR from '../../../../../../xhr'


export default function Basket(props){

   const dispatch = useDispatch()
   const dataOfApart = useSelector(state => state.dataOfApart.data)

   async function removeOfID(){
      const statusArray = []
      const changedArray = []
      const copyTodos = dataOfApart[props.index].descr.todos
      copyTodos.filter(item => {if(item.status) statusArray.push(0)})
      for(let i = 0; i < dataOfApart.length; i++) if(i !== props.index){changedArray.push(dataOfApart[i])}
      if(copyTodos.length === 0){
         await XHR.remove({id: props.id})
         dispatch(setDataOfApart(changedArray))
      }
      else if(copyTodos.length !== statusArray.length){
         await XHR.remove({id: props.id})
         dispatch(setDataOfApart(changedArray))
      }
   }

   return(
      <span className="item-note-span">
         <button onClick={() => removeOfID()} className="svg-container">
            <SVGBasket/>
         </button>
      </span>
   )
}