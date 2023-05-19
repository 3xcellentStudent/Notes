import React from "react";
import {useSelector} from 'react-redux'

import SubTask from '../../../SubTask/SubTask'
import './SubTaskList.scss'

export default function SubTaskList(props){

   const dataOfApart = useSelector(state => state.dataOfApart.data)
   const [propsArray, setPropsArray] = React.useState()

   React.useEffect(() => {
      setPropsArray(props)
   }, [props, dataOfApart])

   return(
      <>
         {propsArray?.next?.map((item, i) => {
            return <SubTask mark={props.mark} key={i} depthIndex={props.depthIndex || 0} index={i} content={item.content} next={item.next} />
         })}
      </>
   )
}