'use client';
import CountDown from "@/components/CountDown.js";
import QuestionHeader from "@/components/QuestionHeader";
import TextContentArea from "@/components/TestContentArea";
import { SingleQuestionData, reset } from "@/features/listening/listeningSlice";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";

const AnswerSelectoClass = 'bg-red-300 '

const SummariseSpokenText = () => {

    const params = useParams<{id: string}>();
    const dispatch =  AppUseDispatch();
    const [answer, setAnswer] = useState<string[]>([])
    const { isLoading, SingleQuestion } = AppUseSelector(state => state.listening)

    useEffect(() => {

        dispatch(SingleQuestionData({
            uri:  `/listening/highlight-incorrect-words/${params.id}`,
            id: params.id,
            name: "HighlightIncorrectWords"
        }))
    }, [params.id])

    const onWordClick = (word: string) => {
       const index = answer.indexOf(word);
       const newAnswer = answer;   
       console.log(index)

       if (index !=0 -1) { 
        newAnswer.splice(index, 1) 
       } else {
        newAnswer.push(word) 
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
                    SingleQuestion?.answer.split(" ").map((word) => {
                        return (
                         <span className={`py-2 px-1 cursor-pointer ${answer.indexOf(word) != -1 && AnswerSelectoClass}`} onClick={() => {
                            onWordClick(word)
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