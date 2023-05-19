import React from 'react'
import {useDispatch} from 'react-redux'

import {setStatus} from '../../../../../../../../store/Slices/filterSlice'

import SVGCheck from '../../../../../../../SVG/SVGCheck'

export default function FilterComplete(props){

   const dispatch = useDispatch()

   const completeRef = React.useRef()
   
   React.useEffect(() => {
      completeRef.current.classList.toggle('active')
   }, [props])

   const arrayOfStatuses = [
      {text: 'Not Selected', color: '#111'},
      {text: 'Not Started', color: '#E74C3C'},
      {text: 'In Progress', color: '#1E88E5'},
      {text: 'Pause', color: '#FDD835'},
      {text: 'Completed', color: '#2ECC71'},
   ]

   const [color, setColor] = React.useState(arrayOfStatuses[0].color)
   const [count, setCount] = React.useState(0)

   function changeState(){
      calcCount()
      if(count + 1 < arrayOfStatuses.length){
         setColor(arrayOfStatuses[count + 1].color)
         dispatch(setStatus(arrayOfStatuses[count + 1].text))
      }
      else {
         setColor(arrayOfStatuses[0].color)
         dispatch(setStatus(arrayOfStatuses[0].text))
      }
   }
   
   function calcCount(){
      if(count + 1 === arrayOfStatuses.length) setCount(0)
      else setCount(count + 1)
   }

   return(
      <button ref={completeRef} onClick={() => changeState()} className="filter-complete">
         <div className="svg-container">
            <SVGCheck color={color} />
         </div>
      </button>
   )
}