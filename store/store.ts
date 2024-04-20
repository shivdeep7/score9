import { configureStore } from "@reduxjs/toolkit";

// Get the reducers
import ListeningReducer from "../features/listening/listeningSlice"

const store = configureStore({
    reducer: {
        listening: ListeningReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
export default store;