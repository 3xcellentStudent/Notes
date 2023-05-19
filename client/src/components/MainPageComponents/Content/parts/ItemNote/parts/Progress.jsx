import React from "react";

import SVGProgress from '../../../../../SVG/SVGProgress'

export default function Progress(props){

   const [progress, setProgress] = React.useState(0)
   const [dasharray, setDasharray] = React.useState(0)

   let lock = true
   React.useEffect(() => {
      if(lock){
         lock = false
         calcProgress()
      }
   }, [props])

   function calcProgress(){
      const doneTasks = []
      props.descr.todos.filter(item => {if(item.status) doneTasks.push(0)})
      const percent = Math.round(100 * doneTasks.length / props.descr.todos.length)
      setProgress(isNaN(percent) ? 0 : percent)
      const stroke = 295 * percent / 100
      setDasharray(isNaN(stroke) ? 0 : stroke)
   }

   return(
      <div className="progress">
         <div className="svg-container">
            <SVGProgress dasharray={dasharray} />
         </div>
         <span>{progress}%</span>
      </div>
   )
}