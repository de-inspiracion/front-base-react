import { configureStore } from "@reduxjs/toolkit";
import SearchEvent  from "./search/search.store";
import UserData from "./user/userData";
export default configureStore({
  reducer: {
    userInfo: UserData,
    searchValue: SearchEvent,
  },
});
