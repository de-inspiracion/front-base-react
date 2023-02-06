import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  name: null,
  email: null,
  directive: null,
  profile: null,
  age: null,
  authenticated: null,
  finished: [],
  inprogress:[],
  scored:[]
}
export const UserData = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    newDataUser: (state, newdata) => {
      state.id = newdata.payload.id
      state.name = newdata.payload.name
      state.email = newdata.payload.email,
      state.directive = newdata.payload.directive
      state.profile = newdata.payload.profile
      state.authenticated = newdata.payload.authenticated
      state.age = newdata.payload.age
      state.inprogress = newdata.payload.inprogress
      state.finished = newdata.payload.finished,
      state.scored = newdata.payload.scored
    },
  },
})

// Action creators are generated for each case reducer function
export const { newDataUser } = UserData.actions

export default UserData.reducer