'use client';
import CountDown from "@/components/CountDown.js";
import QuestionHeader from "@/components/QuestionHeader";
import TextContentArea from "@/components/TestContentArea";
import { SingleQuestionData, reset } from "@/features/listening/listeningSlice";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";

const SelectedWordClass = 'bg-red-300 '

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
            initial="MC"
            description="You will hear a short report. Write a summary for a fellow student who was not present. You should write 50-70 words. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points presented in the lecture."
            title=""
        />
        <div className="mt-10">
            <h2 className="text-2xl">#{params.id} {SingleQuestion?.title}</h2>
            {<CountDown seconds={70} />}
            <div className="flex flex-1 w-full bg-[#f1f3f4] mt-5">
                 <audio className="w-[30%]" src={`https://s3.ap-southeast-2.amazonaws.com/lamedia21/ptedata/ptemedia/${SingleQuestion?.audioUrl}`} controls />
            </div>
            <TextContentArea className="mt-10 text-lg font-[300]  flex flex-wrap">
                {
                    SingleQuestion?.answer.split(" ").map((word, index: number) => {
                                                   

                        return (
                         <span key={index} className={`py-2 px-1 cursor-pointer ${answer.indexOf(index) != -1 && SelectedWordClass}`} onClick={() => {
                            onWordClick(index)
                         }}>{word}</span>
                        )
                     })
                }
               
            </TextContentArea>
        </div>
     </main>
    )
}

export default SummariseSpokenText;