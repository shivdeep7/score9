import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { QuestionsPropsTypes, QuestionsListNameType,  requestList } from "./listeningService";
import { ListeningSummarizeSpokenTextTypes, MultipleChoiceMultipleAnswers } from "../../types/listening";
import { Axios, AxiosResponse } from "axios";



export type QuestionTypesProps = {
    [key in QuestionsListNameType]?: ListeningSummarizeSpokenTextTypes[] | MultipleChoiceMultipleAnswers[];
};



export type ListeningStateProps = { 
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
    QuestionsList:  null
}


type ListeningQuestionTypes = QuestionTypesProps[keyof QuestionTypesProps]

type ApiResponse  = {
    name: QuestionsListNameType;
    data: ListeningQuestionTypes;
}

// Get the list of questions from the database
export const ListeningQuestionsList =  createAsyncThunk<ApiResponse, QuestionsPropsTypes,  { rejectValue: string }>("listening/ListeningQuestionsList", async (request, { rejectWithValue }) => {
    try {
        // Get the list of the questions
        const response = await requestList<ListeningQuestionTypes>(request.uri)
       
         const result =  {
            data: response,
            name: request.name
        } ;
        return result; 
       
    } catch (e: any) {
        const error = e;
        const message = (error.response && error.response.data && error.response.data?.message || error.response.data.message.errors ) || error.message || error.toString()
        return rejectWithValue(message)
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
       }).addCase(ListeningQuestionsList.fulfilled, (state, action: PayloadAction<ApiResponse>  ) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        console.log(action.payload)
        state.QuestionsList = {
            ...state.QuestionsList,
            [action.payload.name]: action.payload.data
        }
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