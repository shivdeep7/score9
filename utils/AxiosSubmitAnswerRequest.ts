
import { AxiosResponse } from "axios";
import axios from "@/utils/axios"


export interface AxiosSubmitQuetionPropsTypes  {
    uri: string;
    questionId: number;
    userId: number;
    answer: string[]
}

export const AxiosSubmitAnswerRequest = async <T,>(data: AxiosSubmitQuetionPropsTypes)  => {
    
    const response: AxiosResponse<T> = await axios.post(data.uri, {
       questionId: data.questionId,
       userId:  data.userId, 
       answers: data.answer
    });
    return response.data;
}

