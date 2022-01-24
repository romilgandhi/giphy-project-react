import { combineReducers } from "@reduxjs/toolkit";
import { giphySlice } from "./giphy/giphy.reducer";

const rootReducer = combineReducers({
  giphy: giphySlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
