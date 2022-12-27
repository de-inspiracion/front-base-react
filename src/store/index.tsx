
import { configureStore } from '@reduxjs/toolkit'
import UserData from './user/userData'
export default configureStore({
  reducer: {
    userInfo: UserData,
  },
})