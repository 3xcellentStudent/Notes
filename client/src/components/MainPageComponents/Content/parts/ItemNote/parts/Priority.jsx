import React from "react"
import {useDispatch, useSelector} from 'react-redux'

import {setDataOfApart} from '../../../../../../store/Slices/dataOfApartSlice'
import XHR from '../../../../../../xhr'

import SVGFlag from '../../../../../SVG/SVGFlag'

export default function Priority(props){

   const dataOfApart = useSelector(state => state.dataOfApart.data)

   const colorsAndIndex = [
      {color: '#E74C3C', degree: 1},
      {color: '#FDD835', degree: 2},
      {color: '#2ECC71', degree: 3},
      {color: '#1E88E5', degree: 4},
      {color: '#AB47BC', degree: 5},
   ]

   const dispatch = useDispatch()
   const priorityRef = React.useRef()
   const [count, setCount] = React.useState(props.data.descr.priority.degree === 5 ? 0 : props.data.descr.priority.degree)
   const [color, setColor] = React.useState(props.data.descr.priority.color)
   
   async function changePriority(){
      calcScore()
      setColor(colorsAndIndex[count].color)
      const objectCopy = JSON.parse(JSON.stringify(dataOfApart))
      objectCopy[props.data.index].descr.priority = colorsAndIndex[count]
      dispatchAndSendToDB(objectCopy)
   }

   async function dispatchAndSendToDB(array){
      await XHR.updateNote(array[props.data.index])
      dispatch(setDataOfApart(array))
   }

   function calcScore(){
      if(count + 1 === 5) setCount(0)
      else setCount(count + 1)
   }

   React.useEffect(() => {setColor(props.data.descr.priority.color)}, [props])

   return(
      <div className="priority-wrapper" >
         <button className="priority-container" onClick={() => changePriority()} >
            <div ref={priorityRef} className="svg-container">
               <SVGFlag color={color} />
            </div>
         </button>
      </div>
   )
}