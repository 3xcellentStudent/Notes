import React from "react";
import {useSelector, useDispatch} from 'react-redux'

import XHR from '../../../../../../xhr'
import {setDataOfApart} from '../../../../../../store/Slices/dataOfApartSlice'

export default function DateComp(props){

   const dispatch = useDispatch()

   const [dateFromProps, setDateFromProps] = React.useState(props.date)
   const dataOfApart = useSelector(state => state.dataOfApart.data)

   const [date, setDate] = React.useState()
   const [month, setMonth] = React.useState()
   const [year, setYear] = React.useState()

   React.useEffect(() => {if(typeof props.date === 'number'){
      setDateFromProps(props.date)
      defineDate()
   }}, [props])

   function defineDate(){
      const currentDate = new Date(dateFromProps)
      setDate(currentDate.getDate())
      setMonth(currentDate.getMonth() + 1)
      setYear(currentDate.getFullYear())
   }

   const dateRef = React.useRef('')
   const monthRef = React.useRef('')
   const yearRef = React.useRef('')

   class DateClass{
      prev = new Date(year, month - 1, 1)
      current = new Date(year, month, 1)

      writeDate(){
         const value = dateRef.current.value
         if(value >= 0 && value <= 31) setDate(value)
      }
      writeMonth(){
         const value = monthRef.current.value
         if(value >= 0 && value <= 12) setMonth(value)
      }
      writeYear(){
         const value = yearRef.current.value
         setYear(value)
      }
   }
   const dateClass = new DateClass()

   function createTimeFunc(){
      const valueOfDate = date
      const valueOfMonth = +monthRef.current.value === 0 ? 0 : monthRef.current.value - 1
      const valueOfYear = yearRef.current.value
      const time = new Date(valueOfYear, valueOfMonth, valueOfDate).getTime()
      
      const copyObject = JSON.parse(JSON.stringify(dataOfApart))
      copyObject[props.index].descr.date = time
      if(valueOfDate && valueOfMonth && valueOfYear >= 1000) sendToDB(copyObject)
   }

   async function sendToDB(array){
      await XHR.updateNote(array[props.index])
      dispatch(setDataOfApart(array))
   }

   const styles = {fontSize: 'calc(1vw + 1vh)', fontWeight: 900, margin: '0 calc((1vw + 1vh) / 10)'}

   return(
      <div className="set-date-wrapper">
         <div className="set-date-container">
            <input type="number" ref={dateRef} onChange={() => dateClass.writeDate()} 
            defaultValue={date} maxLength={2} />

            <span style={styles} >/</span>
            <input type="number" ref={monthRef} onChange={() => dateClass.writeMonth()} 
            defaultValue={month} maxLength={2} />

            <span style={styles} >/</span>
            <input type="number" ref={yearRef} onChange={() => dateClass.writeYear()} 
            defaultValue={year} maxLength={4} />
         </div>

         <button onClick={() => createTimeFunc()} >Save</button>
      </div>
   )
}