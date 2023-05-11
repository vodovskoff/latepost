import { combineReducers } from "redux";
import allPostsSlice from "./slices/getAllPostsSlice";

export const rootReducer = combineReducers({
    allPosts: allPostsSlice
})