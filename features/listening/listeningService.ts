import axios, { AxiosResponse } from "axios";

export type QuestionsListNameType = "ListeningSummarizeSpokenText" | "MultipleChoiceMultipleAnswers"; 

// Create a serivce to get the list of the summary questions 
export type QuestionsPropsTypes = {
    uri: string
    name: QuestionsListNameType
}

export const requestList = async <T,>(uri: string)  => {
    const response: AxiosResponse<T> = await axios.get(uri);
    return response.data;
}
