import { createSlice } from '@reduxjs/toolkit'

export const UserData = createSlice({
  name: 'userInfo',
  initialState: {
    name: 'ale',
    age: 33
  },
  reducers: {
    newDataUser: (state, newdata) => {
      console.log(newdata)
      state.name = newdata.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { newDataUser } = UserData.actions

export default UserData.reducer