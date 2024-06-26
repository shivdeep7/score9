import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { QuestionsPropsTypes } from "./listeningService";
import { AxiosGetRequest } from "@/utils/AxiosGetRequest";
import {
  BaseApiTypes,
  ListeningSummarizeSpokenText,
  MultipleChoiceMultipleAnswers,
} from "../../types/listening";


export interface HighlightCorrectSummaryTypes extends BaseApiTypes {
  summaries: 
    {
      options: string
    }[]
}

export type QuestionsDataType= {
  questions: QuestionTypesProps;
  totalPages : number;
}

export type QuestionTypesProps = {
  ListeningSummarizeSpokenText?: ListeningSummarizeSpokenText[];
  MultipleChoiceMultipleAnswers?: MultipleChoiceMultipleAnswers[];
  MultipleChoiceSingleAnswer?: MultipleChoiceMultipleAnswers[];
  FillIntheBlanks?: MultipleChoiceMultipleAnswers[];
  HighlightCorrectSummary?: HighlightCorrectSummaryTypes[];
  SelectMissingWord?: MultipleChoiceMultipleAnswers[];
  HighlightIncorrectWords?: MultipleChoiceMultipleAnswers[];
  WriteFromDictation?: MultipleChoiceMultipleAnswers[];
};

export type QuestionsListNameType = keyof QuestionTypesProps;

type SingleQuestionType = BaseApiTypes &
  QuestionTypesProps[keyof QuestionTypesProps];

export type ListeningStateProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  totalPages: number;
  QuestionsList: QuestionTypesProps | null;
  SingleQuestion: SingleQuestionType | null;
};

const initialState: ListeningStateProps = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  QuestionsList: null,
  totalPages: 0,
  SingleQuestion: null,
};

type ListApiResponse = {
  name: QuestionsListNameType;
  data: QuestionsDataType;
};

// Get the list of questions from the database
export const ListeningQuestionsList = createAsyncThunk<
  ListApiResponse,
  QuestionsPropsTypes,
  { rejectValue: string }
>("listening/ListeningQuestionsList", async (request , { rejectWithValue }) => {
  try {
    // Get the list of the questions
    const response = await AxiosGetRequest<QuestionsDataType>(request.uri);

    const result = {
      data: response,
      name: request.name,
    };
    return result;
  } catch (e: any) {
    const error = e;
    const message =
      (error.response && error.response.data && error.response.data?.message) ||
      error.response.data.message.errors ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

type ThunkArgs = { uri: string; name: QuestionsListNameType; id: string };

// Get the single question type
export const SingleQuestionData = createAsyncThunk(
  "listening/SingleQuestionData",
  async (request: ThunkArgs, { rejectWithValue }) => {
    try {
      const response = await AxiosGetRequest<SingleQuestionType>(request.uri);
      return response;
    } catch (e: any) {
      const error = e;
      const message =
        (error.response &&
          error.response.data &&
          error.response.data?.message) ||
        error.response.data.message.errors ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  },
);

// Listening slice
const listeningSlice = createSlice({
  name: "listening",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...initialState,
        QuestionsList: state.QuestionsList,
        totalPages: state.totalPages,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ListeningQuestionsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        ListeningQuestionsList.fulfilled,
        (state, action: PayloadAction<ListApiResponse>) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.QuestionsList = {
            ...state.QuestionsList,
            [action.payload.name]: action.payload.data.questions,
          };
          state.totalPages = action.payload.data.totalPages;
        },
      )
      .addCase(ListeningQuestionsList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(SingleQuestionData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        SingleQuestionData.fulfilled,
        (state, action: PayloadAction<SingleQuestionType>) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.SingleQuestion = action.payload;
        },
      )
      .addCase(SingleQuestionData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

// Selectors

export const { reset } = listeningSlice.actions;
export default listeningSlice.reducer;
