import React from 'react'
import {useDispatch} from 'react-redux'

import {setDate} from '../../../../../../../../store/Slices/filterSlice'

import SVGClock from '../../../../../../../SVG/SVGClock'

export default function FilterTime(props){

   const dispatch = useDispatch()

   const timeRef = React.useRef()

 const arrayOfIndexes = [
      {index: 0, color: '#111'},
      {index: 1, color: '#E74C3C'},
      {index: 2, color: '#2ECC71'},
      {index: 3, color: '#1E88E5'},
   ]

   const [color, setColor] = React.useState(arrayOfIndexes[0].color)
   const [count, setCount] = React.useState(0)

   function changeState(){
      calcCount()
      if(count + 1 < arrayOfIndexes.length){
         setColor(arrayOfIndexes[count + 1].color)
         dispatch(setDate(arrayOfIndexes[count + 1].index))
      }
      else {
         setColor(arrayOfIndexes[0].color)
         dispatch(setDate(arrayOfIndexes[0].index))
      }
   }
   
   function calcCount(){
      if(count + 1 === arrayOfIndexes.length) setCount(0)
      else setCount(count + 1)
   }

   React.useEffect(() => {
      timeRef.current.classList.toggle('active')
   }, [props])

   return(
      <button ref={timeRef} onClick={() => changeState()} className="filter-time">
         <div className="svg-container">
            <SVGClock color={color} />
         </div>
      </button>
   )
}