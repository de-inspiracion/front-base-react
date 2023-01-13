import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  age: null,
  authenticated: null
}
export const UserData = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    newDataUser: (state, newdata) => {
      console.log('en slice: payload: ',newdata)
      state.name = newdata.payload.userName
      state.authenticated = newdata.payload.isAthenticated
      state.age = newdata.payload.age
    },
  },
})

// Action creators are generated for each case reducer function
export const { newDataUser } = UserData.actions

export default UserData.reducer