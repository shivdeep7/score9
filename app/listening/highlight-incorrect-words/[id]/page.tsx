'use client';
import CountDown from "@/components/CountDown.js";
import QuestionHeader from "@/components/QuestionHeader";
import QuestionFooter from "@/components/QuestionsFooter";
import TextContentArea from "@/components/TestContentArea";
import { SingleQuestionData, reset } from "@/features/listening/listeningSlice";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";

const SelectedWordClass = 'bg-orange-400 text-white'

const SummariseSpokenText = () => {
    const params = useParams<{id: string}>();
    const dispatch =  AppUseDispatch();
    const [answer, setAnswer] = useState<number[]>([])
    const { isLoading, SingleQuestion } = AppUseSelector(state => state.listening)


    useEffect(() => {

        dispatch(SingleQuestionData({
            uri:  `/listening/highlight-incorrect-words/${params.id}`,
            id: params.id,
            name: "HighlightIncorrectWords"
        }))
    }, [params.id])

    const onWordClick = (index: number) => {
       const pos = answer.indexOf(index);
       const newAnswer = [...answer];   

       if (pos != -1) { 
        newAnswer.splice(pos, 1) 
       } else {
        newAnswer.push(index) 
       }

       return setAnswer(newAnswer)
    }

    return !isLoading && (
     <main>
        <QuestionHeader
            countdown={70}
        />
        <div className="w-full lg:max-w-6xl m-auto mt-20 mb-[200px]">
            <div className="flex flex-1 w-full bg-[#f1f3f4] mt-5">
                 <audio className="w-[30%]" src={`https://s3.ap-southeast-2.amazonaws.com/lamedia21/ptedata/ptemedia/${SingleQuestion?.audioUrl}`} controls />
            </div>
            <TextContentArea className="mt-10 text-lg font-[300]  flex flex-wrap">
                {
                    SingleQuestion?.audioScript.split(" ").map((word, index: number) => {


                        return (
                         <span key={index} className={`py-2 px-1 cursor-pointer ${answer.indexOf(index) != -1 && SelectedWordClass}`} onClick={() => {
                            onWordClick(index)
                         }}>{word}</span>
                        )
                     })
                }
               
            </TextContentArea>
        </div>
        <QuestionFooter currentPage={params.id} disabled={answer.length == 0 ? true : false} />
     </main>
    )
}

export default SummariseSpokenText;