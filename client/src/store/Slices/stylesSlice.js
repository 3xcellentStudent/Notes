import {createSlice} from '@reduxjs/toolkit'

const stylesSlice = createSlice({
   name: 'notes',
   initialState: {boxShadow: []},
   reducers: {
      clear(state, action){
         state.boxShadow.length = 0
      },
      setStyles(state, action){
         state.boxShadow = [...state.boxShadow, action.payload]
      }
   }
})

export const {setStyles, clear} = stylesSlice.actions
export default stylesSlice.reducer