import React from "react";
import {useDispatch} from 'react-redux'

import XHR from '../../../../../xhr'
import {setDataOfApart} from '../../../../../store/Slices/dataOfApartSlice'

import SVGPlus from '../../../../SVG/SVGPlus'
import './ItemAddNote.scss'

export default function ItemAddNote(){

   const dispatch = useDispatch()

   async function databasePOST(){
      const model = {
         title: 'New Note',
         descr: {
            date: new Date().getTime(),
            status: {text: 'Not Started', color: '#E74C3C'},
            priority: {color: '#E74C3C', degree: 1},
            todos: [],
         }
      }
      
      await XHR.createNote(model.title, model.descr)
      const refreshNotes = await XHR.getNotes()
      dispatch(setDataOfApart(JSON.parse(refreshNotes)))
   }

   return(
      <button className="item-add-note-container" onClick={() => databasePOST()}>
         <div className="svg-container">
               <SVGPlus/>
         </div>
         <span className="item-add-note-span">Add New Task</span>
      </button>
   )
}