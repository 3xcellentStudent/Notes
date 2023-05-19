import React from 'react'
import {Routes, Route} from 'react-router-dom'

import MainPage from './Pages/MainPage/MainPage'
import WorkPage from './Pages/WorkPage/WorkPage'

export default function App(){

   return(
      <div className="wrapper">
         <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/work' element={<WorkPage/>} />
         </Routes>
      </div>
   )
}