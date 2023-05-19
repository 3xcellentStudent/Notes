import {createSlice} from '@reduxjs/toolkit'

const dataOfApartSlice = createSlice({
   name: 'dataOfApart',
   initialState: {data: null},
   reducers: {
      setDataOfApart(state, action){state.data = action.payload}
   }
})

export const {setDataOfApart} = dataOfApartSlice.actions
export default dataOfApartSlice.reducer