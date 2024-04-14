import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ListeningSummarizeSpokenTextTypes } from "../../types/listening";
import axios from "axios";


export interface QuestionTypesProps {
    ListeningSummarizeSpokenText: ListeningSummarizeSpokenTextTypes
}

export interface ListeningStateProps { 
    isLoading: boolean, 
    isError: boolean, 
    isSuccess: boolean, 
    message: string, 
    QuestionsList: QuestionTypesProps | null 
}

const initialState: ListeningStateProps = {
    isLoading: false, 
    isError: false, 
    isSuccess: false,
    message: "",
    QuestionsList: null 
}

interface QuestionThunkPropTypes {
    QuestionType: String,
}

// Create a serivce to get the list of the summary questions 
interface QuestionsPropsTypes {
    uri: string;
    name: string;
    method: "GET"
    responseType: ListeningSummarizeSpokenTextTypes
}

// Get the list of questions from the database
export const ListeningQuestionsList = createAsyncThunk("listening/ListeningQuestionsList", async () => {
    try {
        // Get the list of the questions
        const response = await axios.get("/listening/summary-spoeken-text")
        return response;  
    } catch (error) {
        const message = (error.reponse && error.response.data && error.response.data.messsage || error.response.data.message.errors ) || error.message || error.toString()
    }
})

// Listening slice
const listeningSlice = createSlice({
    name: "listening",
    initialState,
    reducers: {
        reset: (state) => {
            return {
                ...initialState, 
                QuestionsList: state.QuestionsList    
            }
        }
    },
    extraReducers: (builder) => {
       builder.addCase(ListeningQuestionsList.pending, (state) => {
        state.isLoading = true 
       }).addCase(ListeningQuestionsList.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
       }).addCase(ListeningQuestionsList.rejected, state => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
       })
    }
})

// Selectors 

export const { reset } = listeningSlice.actions;
export default listeningSlice.reducer;