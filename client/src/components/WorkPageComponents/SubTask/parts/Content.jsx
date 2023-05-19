import React from "react"
import {useDispatch, useSelector} from 'react-redux'

import {setDataOfApart} from '../../../../store/Slices/dataOfApartSlice'
import XHR from '../../../../xhr'

export default function Content(props){
   
   const dispatch = useDispatch()
   const dataOfApart = useSelector(state => state.dataOfApart.data)
   const storeOfIndex = useSelector(state => state.storeOfIndex.store)

   const [content, setContent] = React.useState(props.data.content)
   const [stylesTXTLock, setStylesTXTLock] = React.useState(true)

   React.useEffect(() => {setContent(props.data.content)}, [props])

   const textarea = React.useRef()

   const stylesObj = {
      inactiveTXT: {background: 'transparent',},
      activeTXT: {
         background: '#1111111a',
         top: 'calc((1vw + 1vh) * .5)'
      },
   }

   function stylingTextarea(){
      setStylesTXTLock(!stylesTXTLock)
      if(!stylesTXTLock) textarea.current.setAttribute('style', `background: ${stylesObj.activeTXT.background}; top: ${stylesObj.activeTXT.top};`)
      else textarea.current.setAttribute('style', `background: ${stylesObj.inactiveTXT.background};`)
   }

   React.useEffect(() => {stylingTextarea()}, [props.isActive])

   React.useEffect(() => {
      textarea.current.setAttribute('style', `background: ${stylesObj.inactiveTXT.background};`)
   }, [])


   function changeObject(){
      const arrayOfIndex = []
      const value = textarea.current.value
      const depthIndex = props.data.depthIndex
      const index = +props.container.querySelector('#spanForIndexMap').textContent
      const copyObject = JSON.parse(JSON.stringify(dataOfApart))
      let currentValue = props.container

      for(let i = 0; i <= depthIndex; i++){
         arrayOfIndex.push(+currentValue.querySelector('#spanForIndexMap').textContent)
         currentValue = currentValue.parentElement.parentElement.parentElement
      }

      let countOfDepth = 0
      function updateObjectWithContent(obj){
         if(depthIndex === 0){
            obj.next[arrayOfIndex.at(-countOfDepth)].content = value
            return obj
         }
         if(countOfDepth === depthIndex){
            obj.next[index].content = value
            return obj
         } else if (Array.isArray(obj.next)){
            countOfDepth++
            updateObjectWithContent(obj.next[arrayOfIndex.at(-countOfDepth)])
         }
         return obj
      }

      const result = updateObjectWithContent(copyObject.descr.todos[storeOfIndex])
      copyObject.descr.todos[storeOfIndex] = result
      refreshSliceAndSendToDB(copyObject)
   }

   async function refreshSliceAndSendToDB(object){
      await XHR.updateNote(object)
      dispatch(setDataOfApart(object))
   }

   return(
      <div className="content-container subitem">
         <textarea ref={textarea} defaultValue={content} onChange={() => changeObject()} className="subitem-textarea" name="content" 
         cols="30" rows="10"></textarea>
      </div>
   )
}