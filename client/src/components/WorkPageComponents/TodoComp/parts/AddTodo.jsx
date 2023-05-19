import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import {setDataOfApart} from '../../../../store/Slices/dataOfApartSlice'
import SVGPlus from '../../../SVG/SVGPlus'
import XHR from "../../../../xhr";

export default function AddTodo(props){

   const dataOfApart = useSelector(state => state.dataOfApart.data)
   const dispatch = useDispatch()

   async function addTodoToSlice(){
      const copyObject = JSON.parse(JSON.stringify(dataOfApart))
      copyObject.descr.todos[props.index].next.push({next: [], content: 'Empty', depthIndex: 0})
      addTodoToDB(copyObject)
   }

   async function addTodoToDB(object){
      await XHR.updateNote(object)
      dispatch(setDataOfApart(object))
   }

   return(
      <button onClick={() => addTodoToSlice()} className="item-add-task-container">
         <div className="svg-container">
            <SVGPlus/>
         </div>
      </button>
   )
}