import React from "react";
import SubTaskList from '../TodoComp/parts/SubTaskList/SubTaskList'
import {useSelector} from 'react-redux'

import SVGArrowTurn from '../../SVG/SVGArrowTurn'
import './SubTask.scss'
import Basket from "./parts/Basket";
import AddSubTask from "./parts/AddSubTask";
import Content from "./parts/Content";

export default function SubTask(props){

   const stylesObj = {
      inactiveCont: {maxHeight: 'calc((1vw + 1vh) * 2)'},
      activeCont: {maxHeight: `calc(((1vw + 1vh) * 16) * ${props.depthIndex === 0 ? 1 : props.depthIndex + 1} + (${props.next.length} * (1vw + 1vh) * 2)`},
   }
   
   const [propsCopy, setPropsCopy] = React.useState()
   const [stylesContLock, setStylesContLock] = React.useState(true)
   const [isActive, setIsActive] = React.useState(false)

   const dataOfApart = useSelector(state => state.dataOfApart.data)

   React.useEffect(() => {setPropsCopy(props)}, [props])

   const [dataProps, setDataProps] = React.useState(props)

   React.useEffect(() => {setDataProps(props)}, [props])

   const todoContainer = React.useRef()
   const arrowCont = React.useRef()
   const arrowBelow = React.useRef()
   const subtaskList = React.useRef()

   function stylingContainer(){
      setStylesContLock(!stylesContLock)
      if(stylesContLock) todoContainer.current.setAttribute('style', `max-height: ${stylesObj.activeCont.maxHeight}`)
      else todoContainer.current.setAttribute('style', `max-height: ${stylesObj.inactiveCont.maxHeight}`)
   }

   React.useEffect(() => {
      todoContainer.current.setAttribute('style', `max-height: ${stylesObj.inactiveCont.maxHeight}`)
   }, [])

   function showAndRotate(e){
      todoContainer.current.classList.toggle('active')
      arrowCont.current.classList.toggle('active')
      const list = e.target.parentElement.querySelector('.subtask-list')
      const svg = e.target.parentElement.querySelectorAll('.arrow-container.below .svg-container.active')
      if(!e.target.getAttribute('class').includes('active')){
         const allActives = list.querySelectorAll('.active')
         list.classList.remove('active')
         if(allActives.length > 0) allActives.forEach(item => item.classList.remove('active'))
         if(svg.length > 0) svg.forEach(item => item.classList.remove('active'))
      }
      // StylingElements.stylingTextarea()
      // StylingElements.stylingContainer()
      setIsActive(!isActive)
      stylingContainer()
   }

   function showAndRotateBottom(){
      arrowBelow.current.classList.toggle('active')
      subtaskList.current.classList.toggle('active')
   }

   return(
      <div ref={todoContainer} className={`subitem-todo-container ${props.mark || ''}`}>
         <span id="spanForIndexMap" style={{position: 'absolute', pointerEvents: 'none', visibility: 'hidden'}}>{propsCopy?.index || props.index}</span>
         <div ref={arrowCont} className="arrow-container subitem main" onClick={e => showAndRotate(e)} >
            <div className="svg-container">
               <SVGArrowTurn/>
            </div>
         </div>

         <Content container={todoContainer.current} data={dataProps} isActive={isActive} />

         <AddSubTask depthIndex={props.depthIndex} container={todoContainer.current} />

         <Basket index={props.index} depthIndex={props.depthIndex} container={todoContainer.current} />

         <div className="subtask-wrapper inside">
            <button className="arrow-container below" onClick={() => showAndRotateBottom()} >
               <div ref={arrowBelow} className="svg-container">
                  <SVGArrowTurn/>
               </div>
            </button>
            <div ref={subtaskList} className="subtask-list">
               <SubTaskList depthIndex={props.depthIndex + 1} next={props.next} mark={'mark'} />
            </div>
         </div>
      </div>
   )
}