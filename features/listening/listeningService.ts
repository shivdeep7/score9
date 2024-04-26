import { AxiosResponse } from "axios";
import axios from "@/utils/axios"

export type QuestionsListNameType = "ListeningSummarizeSpokenText" | "MultipleChoiceMultipleAnswers"; 

// Create a serivce to get the list of the summary questions 
export interface QuestionsPropsTypes {
    uri: string
    name: QuestionsListNameType
}


export const AxiosGetRequest = async <T,>(uri: string, id?: string )  => {
    
    const response: AxiosResponse<T> = await axios.get(uri);
    return response.data;
}

