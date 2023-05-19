import React from "react";
import {useSelector, useDispatch} from 'react-redux'

import {setDataOfApart} from '../../../../store/Slices/dataOfApartSlice'
import XHR from '../../../../xhr'

import SVGBasket from '../../../SVG/SVGBasket'

export default function Basket(props){

   const dataOfApart = useSelector(state => state.dataOfApart.data)
   const dispatch = useDispatch()

   async function removeTask(){
      const newTodos = []
      for(let i = 0; i < dataOfApart.descr.todos.length; i++) if(i !== props.index) newTodos.push(dataOfApart.descr.todos[i])
      const copyOfSliceObj = Object.assign({}, dataOfApart)
      const totalObject = Object.defineProperty(copyOfSliceObj, 'descr', {
         value: {date: dataOfApart.descr.date, status: dataOfApart.descr.status, todos: newTodos, priority: dataOfApart.descr.priority},
         writable: true,
         enumerable: true,
         configurable: true
      })
      sendDataToDB(totalObject)
   }

   async function sendDataToDB(object){
      await XHR.updateNote(object)
      dispatch(setDataOfApart(object))
   }

   return(
      <span className="item-todo-span">
         <button onClick={() => removeTask()} className="svg-container">
            <SVGBasket/>
         </button>
      </span>
   )
}