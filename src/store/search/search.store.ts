import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  valueToSearch: null,
}
export const SearchEvent = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    newSearchValue: (state: any, newdata) => {
      state.valueToSearch = newdata
    },
    updateSearchValue: (state: any, newdata: any) => {
      state.valueToSearch = newdata.newValue
    }
  },
})

// Action creators are generated for each case reducer function
export const { newSearchValue, updateSearchValue } = SearchEvent.actions

export default SearchEvent.reducer