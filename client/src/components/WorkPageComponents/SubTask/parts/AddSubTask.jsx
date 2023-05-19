import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import {setDataOfApart} from '../../../../store/Slices/dataOfApartSlice'
import SVGPlus from '../../../SVG/SVGPlus'
import XHR from "../../../../xhr";

export default function AddSubTask(props){

   const dispatch = useDispatch()

   const dataOfApart = useSelector(state => state.dataOfApart.data)
   const storeOfIndex = useSelector(state => state.storeOfIndex.store)

   function addSubTaskToSlice(){
      const arrayOfIndex = []
      const depthIndex = props.depthIndex
      const index = +props.container.querySelector('#spanForIndexMap').textContent
      const copyObject = JSON.parse(JSON.stringify(dataOfApart))
      let currentValue = props.container

      for(let i = 0; i <= depthIndex; i++){
         arrayOfIndex.push(+currentValue.querySelector('#spanForIndexMap').textContent)
         currentValue = currentValue.parentElement.parentElement.parentElement
      }
   
      let countOfDepth = 0
      function updateObjectWithContent(obj){
         if(depthIndex === 0){
            obj.next[index].next.push({content: 'Empty', next: []})
            return obj
         }
         else if(countOfDepth - 1 === depthIndex){
            obj.next.push({content: 'Empty', next: []})
            return obj
         } 
         else if (Array.isArray(obj.next)){
            countOfDepth++
            updateObjectWithContent(obj.next[arrayOfIndex.at(-countOfDepth)])
         }
         return obj
      }
   
      const result = updateObjectWithContent(copyObject.descr.todos[storeOfIndex])
      copyObject.descr.todos[storeOfIndex] = result
      addSubTaskToDB(copyObject)
   }

   async function addSubTaskToDB(object){
      await XHR.updateNote(object)
      dispatch(setDataOfApart(object))
   }

   return(
      <button onClick={() => addSubTaskToSlice()} className="item-add-task-container">
         <div className="svg-container">
            <SVGPlus/>
         </div>
      </button>
   )
}