import React from "react";
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {setDataOfApart} from '../../../../../store/Slices/dataOfApartSlice'
import XHR from '../../../../../xhr'

import DateComp from "./parts/DateComp";
import Status from "./parts/Status";
import Priority from "./parts/Priority";
import Progress from './parts/Progress'
import Basket from "./parts/Basket";

import SVGEdit from '../../../../SVG/SVGEdit'
import './ItemNote.scss'

export default function ItemNote(props){

   const dispatch = useDispatch()

   const dataOfApart = useSelector(state => state.dataOfApart.data)

   const [content, setContent] = React.useState()

   const titleRef = React.useRef()

   const saveInRedux = () => {
      dispatch(setDataOfApart(props))
      localStorage.setItem('Notes_App_KeyID', props.id)
   }

   React.useEffect(() => {setContent(props)}, [props])


   function changeTitle(){
      const copyObject = JSON.parse(JSON.stringify(dataOfApart))
      copyObject[props.index].title = titleRef.current.value
      sendToDB(copyObject)
   }

   async function sendToDB(object){
      await XHR.updateNote(object[props.index])
      dispatch(setDataOfApart(object))
   }

   return(
      <div className="item-note-container">

      <div className="title-container">
         <input ref={titleRef} className="title-input" defaultValue={content?.title} type="text" onChange={() => changeTitle()} />
      </div>

         <NavLink to='/work' onClick={() => saveInRedux()} className="edit-wrapper">
            <span>Edit</span>
            <div className="svg-container">
               <SVGEdit/>
            </div>
         </NavLink>

         <DateComp date={props.descr.date} index={props.index} />

         <Status data={props} status={content?.descr.status} />

         <Priority data={props} />

         <Progress descr={props.descr} />

         <Basket id={props.id} index={props.index} />
      </div>
   )
}