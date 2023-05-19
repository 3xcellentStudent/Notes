import {createSlice} from '@reduxjs/toolkit'

const storeOfIndexSlice = createSlice({
   name: 'storeOfIndex',
   initialState: {store: undefined},
   reducers: {
      setStore(state, action){state.store = action.payload}
   }
})

export const {setStore} = storeOfIndexSlice.actions
export default storeOfIndexSlice.reducer