import React from 'react'
import {useDispatch} from 'react-redux'

import {setPriority} from '../../../../../../../../store/Slices/filterSlice'

import SVGFlag from '../../../../../../../SVG/SVGFlag'

export default function FilterPriority(props){

   const dispatch = useDispatch()

   const colorsAndIndex = [
      {color: '#111', degree: 0},
      {color: '#E74C3C', degree: 1},
      {color: '#FDD835', degree: 2},
      {color: '#2ECC71', degree: 3},
      {color: '#1E88E5', degree: 4},
      {color: '#AB47BC', degree: 5},
   ]

   const [color, setColor] = React.useState(colorsAndIndex[0].color)
   const [count, setCount] = React.useState(0)

   function changeState(){
      calcCount()
      if(count + 1 < colorsAndIndex.length){
         setColor(colorsAndIndex[count + 1].color)
         dispatch(setPriority(colorsAndIndex[count + 1].degree))
      }
      else {
         setColor(colorsAndIndex[0].color)
         dispatch(setPriority(colorsAndIndex[0].degree))
      }
   }
   
   function calcCount(){
      if(count + 1 === colorsAndIndex.length) setCount(0)
      else setCount(count + 1)
   }

   const priorityRef = React.useRef()

   React.useEffect(() => {
      priorityRef.current.classList.toggle('active')
   }, [props])

   return(
      <button ref={priorityRef} onClick={() => changeState()} className="filter-priority">
         <div className="svg-container">
            <SVGFlag color={color} />
         </div>
      </button>
   )
}