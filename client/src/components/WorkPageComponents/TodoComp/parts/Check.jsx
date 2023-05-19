import React from "react";
import {useSelector, useDispatch} from 'react-redux'

import {setDataOfApart} from '../../../../store/Slices/dataOfApartSlice'
import {setStyles} from '../../../../store/Slices/stylesSlice'
import XHR from '../../../../xhr'

import SVGCheck from '../../../SVG/SVGCheck'

export default function Check(props){

   const dispatch = useDispatch()

   const dataOfApart = useSelector(state => state.dataOfApart.data)

   const [status, setStatus] = React.useState(props.data.array.status)

   let lock = true
   React.useEffect(() => {
      if(lock){
         lock = false
         const localStatus = dataOfApart?.descr?.todos[props.data.index]?.status
         if(localStatus) dispatch(setStyles({style: 'box-shadow: 0 0 1px 2px #2ECC71', index: props.data.index}))
         else dispatch(setStyles({style: 'box-shadow: 0 0 3px #505050', index: props.data.index}))
      }
   }, [dataOfApart])

   function changeCheck(){
      const copyObject = JSON.parse(JSON.stringify(dataOfApart))
      copyObject.descr.todos[props.data.index].status = !status
      
      if(!status) dispatch(setStyles({style: 'box-shadow: 0 0 1px 2px #2ECC71', index: props.data.index}))
      else dispatch(setStyles({style: 'box-shadow: 0 0 3px #505050', index: props.data.index}))
      sendToDB(copyObject)
      setStatus(!status)
   }

   async function sendToDB(object){
      await XHR.updateNote(object)
      dispatch(setDataOfApart(object))
   }

   return(
      <div className="check-wrapper">
         <button onClick={() => changeCheck()} className="check-container">
            <div className="svg-container">
               <SVGCheck/>
            </div>
         </button>
      </div>
   )
}