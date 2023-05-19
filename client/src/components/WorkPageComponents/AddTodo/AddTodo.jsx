import React from "react";
import {useSelector, useDispatch} from 'react-redux'

import XHR from '../../../xhr'
import {setDataOfApart} from '../../../store/Slices/dataOfApartSlice'

import SVGPlus from '../../SVG/SVGPlus'
import './AddTodo.scss'

export default function ItemAddNote(){

   const dispatch = useDispatch(state => state.dataOfApart.data)

   const dataOfApart = useSelector(state => state.dataOfApart.data)
   
   function changeObject(){
      const copyObject = JSON.parse(JSON.stringify(dataOfApart))
      copyObject.descr.todos.push({content: 'Empty', status: false, next: []})
      sendToDB(copyObject)
   }

   async function sendToDB(object){
      await XHR.updateNote(object)
      dispatch(setDataOfApart(object))
   }

   return(
      <button className="item-add-todo-container" onClick={() => changeObject()}>
         <div className="svg-container">
               <SVGPlus/>
         </div>
         <span className="item-add-todo-span">Add New Task</span>
      </button>
   )
}