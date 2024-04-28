import { configureStore } from "@reduxjs/toolkit";

// Get the reducers
import ListeningReducer from "../features/listening/listeningSlice"
import ReadingReducer from "../features/Reading/readingSlice"


const store = configureStore({
    reducer: {
        listening: ListeningReducer,
        reading: ReadingReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
export default store;