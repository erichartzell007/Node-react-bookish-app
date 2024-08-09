import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/Login/LoginSlice";
import bookReducer from "../features/Book/BookSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    book: bookReducer,
  },
});

export default store;
