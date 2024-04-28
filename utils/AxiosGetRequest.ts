
import { AxiosResponse } from "axios";
import axios from "@/utils/axios"

export const AxiosGetRequest = async <T,>(uri: string, id?: string )  => {
    
    const response: AxiosResponse<T> = await axios.get(uri);
    return response.data;
}

