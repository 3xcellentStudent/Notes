import {configureStore} from '@reduxjs/toolkit'
import dataOfApartSlice from './Slices/dataOfApartSlice'
import stylesSlice from './Slices/stylesSlice'
import storeOfIndexSlice from './Slices/storeOfIndex'
import filterSlice from './Slices/filterSlice'

export default configureStore({
   reducer: {
      dataOfApart: dataOfApartSlice,
      stylesS: stylesSlice,
      storeOfIndex: storeOfIndexSlice,
      filterS: filterSlice,
   }
})