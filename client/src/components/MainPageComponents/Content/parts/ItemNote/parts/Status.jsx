import React from "react";
import {useDispatch, useSelector} from 'react-redux'

import {setDataOfApart} from '../../../../../../store/Slices/dataOfApartSlice'

import XHR from '../../../../../../xhr'


export default function Status(props){

   const arrayOfStatuses = [
      {text: 'Not Started', color: '#E74C3C'},
      {text: 'In Progress', color: '#1E88E5'},
      {text: 'Pause', color: '#FDD835'},
      {text: 'Completed', color: '#2ECC71'},
   ]

   const [count, setCount] = React.useState(0)
   const [status, setStatus] = React.useState(props.data.descr.status)

   let lock = true
   React.useEffect(() => {
      if(lock){
         lock = false
         setStatus(props.status)
      }
   }, [props.status])

   const dispatch = useDispatch()
   const dataOfApart = useSelector(state => state.dataOfApart.data)

   const [compare, setCompare] = React.useState()

   React.useEffect(() => {
      if(dataOfApart){
         const localTodos = dataOfApart[props?.data?.index]?.descr?.todos
         const restItems = localTodos?.filter(item => {if(item.status) return item})
         setCompare(localTodos?.length > 0 && restItems.length > 0 && localTodos?.length === restItems.length)
      }
   }, [dataOfApart])

   React.useEffect(() => {
      const copyObject = JSON.parse(JSON.stringify(dataOfApart))
      const textOfCopyObj = copyObject[props.data.index].descr.status.text
      arrayOfStatuses.filter((item, i) => {if(item.text === textOfCopyObj){
         if(i === 3 && !compare){
            copyObject[props.data.index].descr.status = arrayOfStatuses[0]
            setStatus(arrayOfStatuses[0])
            setCount(0)
            dispatch(setDataOfApart(copyObject))
         }
         else setCount(i + 1 !== 4 && compare ? i + 1 : i + 1 !== 3 && !compare ? i + 1 : 0)}
      })
   }, [])

   function changeStatusObject(){
      calcScore(compare)
      const copyObject = JSON.parse(JSON.stringify(dataOfApart))
      const statusOfCopy = copyObject[props.data.index].descr
      statusOfCopy.status = arrayOfStatuses[count >= 4 ? 0 : count]
      setStatus(statusOfCopy.status)
      changeStatusDB(copyObject)
   }

   function calcScore(compare){
      if(count >= 4) setCount(1)
      else if(!compare && count + 1 === 3) setCount(0)
      else if(count + 1 === 4) setCount(0)
      else setCount(count + 1)
   }

   async function changeStatusDB(object){
      await XHR.updateNote(object[props.data.index])
      dispatch(setDataOfApart(object))
   }

   return(
      <div className="status">
         <button onClick={() => changeStatusObject()} className="colored-button" style={{background: status?.color}} >{status?.text}</button>
      </div>
   )
}