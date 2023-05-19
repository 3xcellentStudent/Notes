import React from "react";
import {useSelector, useDispatch} from 'react-redux'

import {setDataOfApart} from '../../../../store/Slices/dataOfApartSlice'
import XHR from "../../../../xhr";

import SVGBasket from '../../../SVG/SVGBasket'

export default function Basket(props){
   
   const dispatch = useDispatch()
   
   const dataOfApart = useSelector(state => state.dataOfApart.data)
   const storeOfIndex = useSelector(state => state.storeOfIndex.store)

   function changeObject(){
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
            const result = obj.next.filter((item, i) => {if(i !== index) return item})
            obj.next = result
            return obj
         }
         if(countOfDepth + 1 === depthIndex){
            const result = obj.next[arrayOfIndex.at(-countOfDepth)].next.filter((item, i) => {if(i !== index) return item})
            obj.next[arrayOfIndex.at(-countOfDepth)].next = result
            return obj
         } else if (Array.isArray(obj.next)){
            countOfDepth++
            updateObjectWithContent(obj.next[arrayOfIndex.at(-1)])
         }
         return obj
      }

      const result = updateObjectWithContent(copyObject.descr.todos[storeOfIndex])
      copyObject.descr.todos[storeOfIndex] = result
      refreshSliceAndSendToDB(copyObject)
   }

   async function refreshSliceAndSendToDB(object){
      await XHR.updateNote(object)
      dispatch(setDataOfApart(object))
   }

   return(
      <span className="subitem-todo-span">
         <button className="svg-container" onClick={() => changeObject()} >
            <SVGBasket/>
         </button>
      </span>
   )
}