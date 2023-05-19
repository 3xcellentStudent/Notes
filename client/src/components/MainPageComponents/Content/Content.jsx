import React from "react";
import {useSelector, useDispatch} from 'react-redux'

import ItemNote from './parts/ItemNote/ItemNote'
import ItemAddNote from './parts/ItemAddNote/ItemAddNote'
import {setDataOfApart} from '../../../store/Slices/dataOfApartSlice'
import XHR from '../../../xhr'

import './Content.scss'

export default function Content(){
   let lock = true
   const dispatch = useDispatch()

   const dataOfApart = useSelector(state => state.dataOfApart.data)
   const filterS = useSelector(state => state.filterS.data)
   
   const [notes, setNotes] = React.useState()
   
   React.useEffect(() => {
      if(lock){
         lock = false
         if(!notes) getData()
         else setNotes(dataOfApart)
      }
      if(Array.isArray(dataOfApart) && notes) filterFunc()
   }, [dataOfApart, filterS])

   function filterFunc(){
      const copyOfArray = JSON.parse(JSON.stringify(dataOfApart))

      const firstStep = copyOfArray?.filter(item => {
         const equals = item.descr.status.text === filterS.status
         const any = filterS.status === 'Not Selected'
         if(equals || any) return item
      })
      const secondStep = firstStep?.filter(item => {
         const equals = item.descr.priority.degree === filterS.priority
         const any = filterS.priority === 0
         if(equals || any) return item
      })
      const thirdStep = secondStep?.filter(item => {
         const index = filterS.date
         const itemDate = new Date(item.descr.date)
         const itemTotalDate = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate()).getTime()
         const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()
         if(index === 0) return item
         else if(index === 1 && itemTotalDate < today) return item
         else if(index === 2 && itemTotalDate === today) return item
         else if(index === 3 && itemTotalDate > today) return item
      })
      const fourthStep = thirdStep?.filter(item => {
         const equals = item.title.includes(filterS.title)
         const any = filterS.title === 0
         if(equals || any) return item
      })
      setNotes(fourthStep)
   }
   
   async function getData(){
      const result = await XHR.getNotes()
      setNotes(JSON.parse(result))
      dispatch(setDataOfApart(JSON.parse(result)))
   }

   return(
      <main>
         <ItemAddNote/>
         {notes?.map((item, i) => {
            return <ItemNote key={i} index={i} id={item.id} title={item.title} descr={item.descr} />
         })}
      </main>
   )
}