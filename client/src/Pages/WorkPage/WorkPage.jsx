import React from "react"
import {NavLink} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import XHR from '../../xhr'
import {setDataOfApart} from '../../store/Slices/dataOfApartSlice'
import {clear} from '../../store/Slices/stylesSlice'

import SVGStrongArrow from '../../components/SVG/SVGStrongArrow'
import AddTodo from '../../components/WorkPageComponents/AddTodo/AddTodo'
import TodoComp from '../../components/WorkPageComponents/TodoComp/TodoComp'
import './WorkPage.scss'

export default function WorkPage(){

   const dataOfApart = useSelector(state => state.dataOfApart?.data)
   const dispatch = useDispatch()

   const [receivedData, setReceivedData] = React.useState()

   React.useEffect(() => {dispatch(clear())}, [])

   React.useEffect(() => {
      if(!dataOfApart) getSingleNote()
      else setReceivedData(dataOfApart.descr)
   }, [dataOfApart])

   async function getSingleNote(){
      const id = localStorage.getItem('Notes_App_KeyID')
      const result = await XHR.getNoteOfID(id)
      setReceivedData(JSON.parse(result)?.descr)
      dispatch(setDataOfApart(...JSON.parse(result)))
   }

   async function getDataFromDB(){
      const result = await XHR.getNotes()
      dispatch(setDataOfApart(JSON.parse(result)))
   }

   return(
      <>
         <div className="title-workpage">
            <h1>Todo Title</h1>
            <NavLink to='/' className="edit-wrapper" onClick={() => getDataFromDB()}>
               <span>Back</span>
               <div className="svg-container">
                  <SVGStrongArrow/>
               </div>
            </NavLink>
         </div>
         <div className="todos-wrapper">
            <AddTodo/>
            {receivedData?.todos.map((item, i) => {
               return <TodoComp key={i} array={item} index={i} id={dataOfApart?.id} />
            })}
         </div>
      </>
   )
}