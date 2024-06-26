import { ApiSubmitResponseTypes, BaseApiTypes } from "@/types/listening";
import { AxiosGetRequest } from "@/utils/AxiosGetRequest";
import { AxiosSubmitAnswerRequest, AxiosSubmitQuetionPropsTypes } from "@/utils/AxiosSubmitAnswerRequest";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"


export interface MultipleChoiceMultipleAnswer extends BaseApiTypes {
    options: {
        "id": number,
        "index": number,
        "correct": number,
        "options": string,
        "created_at": Date,
        "updated_at": Date,
        "question_id": number
    },
    correctAnswers: {
        [id: string]: string
    }
}


export interface ReadingReOrderParagraphsTypes extends BaseApiTypes {
    paragraphs: {
       "id": number,
        "index": number,
        "correct": number,
        "options": string,
        "created_at": Date,
        "updated_at": Date,
        "question_id": number
    },
      correctAnswers: {
        [id: string]: string
    }
}

export interface MultipleChoiceSingleAnswer extends BaseApiTypes {
    options: {
        "id": number,
        "index": number,
        "correct": number,
        "options": string,
        "created_at": Date,
        "updated_at": Date,
        "question_id": number
    },
    correctAnswers: {
    [id: string]: string
    }
}

export interface QuestionListType {    
    "MultipleChoiceSingleAnswer"?: MultipleChoiceSingleAnswer[],
    "MultipleChoiceMultipleAnswer"?: MultipleChoiceMultipleAnswer[],
    "ReadingReOrderParagraphs"?: ReadingReOrderParagraphsTypes[],
    "RFillIntheBlanks"?: MultipleChoiceSingleAnswer[],
    "RWFillInTheBlanks"?: MultipleChoiceMultipleAnswer[],
}

export type SingleQuestionType = BaseApiTypes & QuestionListType[keyof QuestionListType];
export type QuestionsListNameType = keyof QuestionListType;

interface initalStateTypes {
    isLoading: boolean,
    isError: boolean, 
    isSuccess: boolean,
    message: string | undefined,
    QuestionsList: QuestionListType | null,
    totalPages: number,
    SingleQuestion: SingleQuestionType | null,
    SubmitResponse: ApiSubmitResponseTypes | null
}


const initialState: initalStateTypes = {
    isLoading: false, 
    isError: false, 
    isSuccess: false, 
    message: "",
    QuestionsList: null,
    totalPages:0,
    SingleQuestion: null,
    SubmitResponse: null
}

// Create a serivce to get the list of the summary questions 
export interface ApiRequestType {
    uri: string
    name: QuestionsListNameType
}

export interface ApiResponseType {
    name: QuestionsListNameType
    data: ReadingQuestionsAPIData
}

export interface ReadingQuestionsAPIData {
    questions: QuestionListType
    totalPages: number
}


// Action to submit a answer and get results
export const readingSubmitAnswer = createAsyncThunk<ApiSubmitResponseTypes, AxiosSubmitQuetionPropsTypes, {rejectValue: string}>("reading/submitAnswer", async (request, { rejectWithValue } ) => {
    try {
        const response = AxiosSubmitAnswerRequest<ApiSubmitResponseTypes>(request);
        return response; 
    } catch (e: any) {
         const message = e.response?.data?.message || e.toString() || e.message;
        return rejectWithValue(message);
    }
})

// Get the list of reading questions
export const readingQuestionList = createAsyncThunk<ApiResponseType, ApiRequestType,{ rejectValue: string }>("reading/QuestionsList", async (request, { rejectWithValue }) => {
    try {
        const response = await AxiosGetRequest<ReadingQuestionsAPIData>(request.uri);
        const result =  {
            data: response,
            name: request.name
        };
        return result;
    } catch (e: any) {
        const message = e.response?.data?.message || e.toString() || e.message;
        return rejectWithValue(message);
    }
})

// Get the single question 
export const readingSingleQuestionData = createAsyncThunk<SingleQuestionType, {uri: string}, {rejectValue: string}>("reading/SingleQuestionData", async (request, {rejectWithValue}) => {
    try {
        const response = await AxiosGetRequest<SingleQuestionType>(request.uri);
        return response; 
    } catch (e: any) {
        const error = e;
        const message = error.response && error.response.data && error.response.data.message || error.toString() || error.message;
        return rejectWithValue(message)
    }
})

const readingSlice = createSlice({
    name: "reading",
    initialState,
    reducers: {
        reset: (state) => {
            return initialState
        },
        resetResponse: (state) => {
            return {
                ...state,
                SubmitResponse: null
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(readingQuestionList.pending, (state, action) => {
            state.isLoading = true
        }).addCase(readingQuestionList.fulfilled, (state, action: PayloadAction<ApiResponseType>) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true 
            state.QuestionsList = {
                ...state.QuestionsList, 
                [action.payload.name]: action.payload.data.questions
            }
            state.totalPages = action.payload.data.totalPages;
        }).addCase(readingQuestionList.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.isLoading = false 
            state.isError = true 
            state.isSuccess = false 
            state.message = action.payload;
        }).addCase(readingSingleQuestionData.pending, (state, action) => {
            state.isLoading = true
        }).addCase(readingSingleQuestionData.fulfilled, (state, action: PayloadAction<SingleQuestionType>) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true 
            state.SingleQuestion = action.payload;
        }).addCase(readingSingleQuestionData.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.isLoading = false 
            state.isError = true 
            state.isSuccess = false 
            state.message = action.payload;
        })
        .addCase(readingSubmitAnswer.pending, (state, action) => {
            state.isLoading = true
        }).addCase(readingSubmitAnswer.fulfilled, (state, action: PayloadAction<ApiSubmitResponseTypes>) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true 
            state.SubmitResponse = action.payload;
        }).addCase(readingSubmitAnswer.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.isLoading = false 
            state.isError = true 
            state.isSuccess = false 
            state.message = action.payload;
        })
    }
})




export const { reset, resetResponse } = readingSlice.actions;
export default readingSlice.reducer;