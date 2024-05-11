import { BaseApiTypes } from "@/types/listening";
import { AxiosGetRequest } from "@/utils/AxiosGetRequest";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface AnswerShortQuestions extends BaseApiTypes {}
export interface DescribeImage extends BaseApiTypes {}
export interface ReadAloud extends BaseApiTypes {}
export interface ReapeatSentence extends BaseApiTypes {}
export interface RetelLecture extends BaseApiTypes {}

export interface QuestionListType {
  AnswerShortQuestions?: AnswerShortQuestions[];
  DescibeImage?: DescribeImage[];
  ReadAloud?: ReadAloud[];
  ReapeatSentence?: ReapeatSentence[];
  RetelLecture?: RetelLecture[];
}

export type SingleQuestionType =  BaseApiTypes & QuestionListType[keyof QuestionListType];
export type QuestionsListNameType = keyof QuestionListType;

interface initalStateTypes {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | undefined;
  QuestionsList: QuestionListType | null;
  SingleQuestion: SingleQuestionType | null;
}

const initialState: initalStateTypes = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  QuestionsList: null,
  SingleQuestion: null,
};

// Create a serivce to get the list of the summary questions
export interface ApiRequestType {
  uri: string;
  name: QuestionsListNameType;
}

export interface ApiResponseType {
  name: QuestionsListNameType;
  data: QuestionListType;
}

// Get the list of reading questions
export const speakingQuestionList = createAsyncThunk<
  ApiResponseType,
  ApiRequestType,
  { rejectValue: string }
>("reading/QuestionsList", async (request, { rejectWithValue }) => {
  try {
    const response = await AxiosGetRequest<QuestionListType>(request.uri);
    const result = {
      data: response,
      name: request.name,
    };
    return result;
  } catch (e: any) {
    const message = e.response?.data?.message || e.toString() || e.message;
    return rejectWithValue(message);
  }
});

// Get the single question
export const SingleQuestionData = createAsyncThunk<
  SingleQuestionType,
  { uri: string },
  { rejectValue: string }
>("reading/SingleQuestionData", async (request, { rejectWithValue }) => {
  try {
    const response = await AxiosGetRequest<SingleQuestionType>(request.uri);
    return response;
  } catch (e: any) {
    const error = e;
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.toString() ||
      error.message;
    return rejectWithValue(message);
  }
});

const readingSlice = createSlice({
  name: "reading",
  initialState,
  reducers: {
    reset: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(speakingQuestionList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        speakingQuestionList.fulfilled,
        (state, action: PayloadAction<ApiResponseType>) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.QuestionsList = {
            ...state.QuestionsList,
            [action.payload.name]: action.payload.data,
          };
        },
      )
      .addCase(
        speakingQuestionList.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload;
        },
      ).addCase(SingleQuestionData.pending, (state, action) => {
            state.isLoading = true
        }).addCase(SingleQuestionData.fulfilled, (state, action: PayloadAction<SingleQuestionType>) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true 
            state.SingleQuestion = action.payload;
        }).addCase(SingleQuestionData.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.isLoading = false 
            state.isError = true 
            state.isSuccess = false 
            state.message = action.payload;
        })
  },
});

export const { reset } = readingSlice.actions;
export default readingSlice.reducer;
