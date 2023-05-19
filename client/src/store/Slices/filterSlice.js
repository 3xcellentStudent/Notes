import {createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice({
   name: 'dataOfApart',
   initialState: {data: {status: 'Not Selected', priority: 0, date: 0, title: ''}},
   reducers: {
      setStatus(state, action){state.data.status = action.payload},
      setPriority(state, action){state.data.priority = action.payload},
      setDate(state, action){state.data.date = action.payload},
      setTitle(state, action){state.data.title = action.payload},
   }
})

export const {setStatus, setPriority, setDate, setTitle} = filterSlice.actions
export default filterSlice.reducer