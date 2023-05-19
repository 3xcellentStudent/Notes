import React from "react";
import {useSelector, useDispatch} from 'react-redux'

import {setStore} from '../../../store/Slices/storeOfIndex'
import {setDataOfApart} from '../../../store/Slices/dataOfApartSlice'
import SubTaskList from "./parts/SubTaskList/SubTaskList";
import Basket from "./parts/Basket";
import Check from './parts/Check'
import AddTodo from "./parts/AddTodo";
import XHR from '../../../xhr'

import SVGArrowTurn from '../../SVG/SVGArrowTurn'
import './TodoComp.scss'

export default function TodoComp(props){

   const dispatch = useDispatch()

   const [interfaceData, setInterfaceData] = React.useState()

   const dataOfApart = useSelector(state => state.dataOfApart.data)
   const stylesS = useSelector(state => state.stylesS.boxShadow)

   React.useEffect(() => {
      stylesS.filter(item => {if(item.index === props.index) todoContainer.current.setAttribute('style', item.style)})
   }, [stylesS])

   React.useEffect(() => {
      setInterfaceData(dataOfApart)
   }, [props, dataOfApart])
   

   const todoContainer = React.useRef()
   const arrowBelow = React.useRef()
   const subtaskList = React.useRef()
   const textarea = React.useRef()
   
   function showSubTasks(){
      subtaskList.current.classList.toggle('active')
      arrowBelow.current.classList.toggle('active')
   }

   function showAndRotate(e){
      todoContainer.current.classList.toggle('active') 
      if(!e.target.getAttribute('class').includes('active')){
         const allActives = e.target.parentElement.querySelectorAll('.active')
         if(allActives.length > 0) allActives.forEach(item => item.classList.remove('active'))
      }
   }

   function recordIndexToStore(){dispatch(setStore(props.index))}

   async function sendTextToDB(){
      const copyObject = JSON.parse(JSON.stringify(dataOfApart))
      copyObject.descr.todos[props.index].content = textarea.current.value
      await XHR.updateNote(copyObject)
      dispatch(setDataOfApart(copyObject))
   }

   return(
      <div ref={todoContainer} className="item-todo-container">
         <div className="arrow-container" onClick={e => {showAndRotate(e);recordIndexToStore()}} >
            <div className="svg-container">
               <SVGArrowTurn/>
            </div>
         </div>

         <div className="content-container">
            <textarea className="todo-textarea" name="content" cols="30" rows="10" onChange={() => sendTextToDB()}
            ref={textarea} defaultValue={interfaceData?.descr?.todos[props.index].content} ></textarea>
         </div>

         <Check data={props} />

         <AddTodo index={props.index} />

         <Basket data={dataOfApart} index={props.index} />

         <div className="subtask-wrapper">
            <button className="arrow-container-below" onClick={() => showSubTasks()} >
               <div ref={arrowBelow} className="svg-container">
                  <SVGArrowTurn/>
               </div>
            </button>
            <div ref={subtaskList} className="subtask-list">
               <SubTaskList next={props.array.next} />
            </div>
         </div>
      </div>
   )
}