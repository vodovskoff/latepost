import { combineReducers } from "redux";
import allPostsSlice from "./slices/getAllPostsSlice";
import postByIdSlice from "./slices/postByIdSlice";

export const rootReducer = combineReducers({
    allPosts: allPostsSlice,
    postById : postByIdSlice
})