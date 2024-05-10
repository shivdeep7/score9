import { configureStore } from "@reduxjs/toolkit";

// Get the reducers
import ListeningReducer from "../features/listening/listeningSlice";
import ReadingReducer from "../features/Reading/readingSlice";
import WritingReducer from "@/features/writing/writingSlice";
import SpeakerReducer from "@/features/speaking/speakingSlice";

const store = configureStore({
  reducer: {
    listening: ListeningReducer,
    reading: ReadingReducer,
    writting: WritingReducer,
    speaking: SpeakerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
