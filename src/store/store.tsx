import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";

const store = configureStore(
    {
        reducer: usersReducer
    }
);

export default store;