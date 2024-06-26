'use client';
import CountDown from "@/components/CountDown.js";
import QuestionHeader from "@/components/QuestionHeader";
import QuestionFooter from "@/components/QuestionsFooter";
import TextContentArea from "@/components/TestContentArea";
import { HighlightCorrectSummaryTypes, SingleQuestionData, reset } from "@/features/listening/listeningSlice";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { useParams } from 'next/navigation'
import { useEffect } from "react";

const SummariseSpokenText = () => {

    const params = useParams<{id: string}>();
    const dispatch =  AppUseDispatch();
    const { isLoading, SingleQuestion } = AppUseSelector(state => state.listening)

    useEffect(() => {

        dispatch(SingleQuestionData({
            uri:  `/listening/highlight-correct-summary/${params.id}`,
            id: params.id,
            name: "HighlightCorrectSummary"
        }))
    }, [params.id, dispatch])

    return !isLoading && (
       <main>
        <QuestionHeader
            countdown={70}
        />
        <div className="w-full lg:max-w-6xl m-auto mt-20">
            <div className="flex flex-1 w-full bg-[#f1f3f4] mt-5">
                 <audio className="w-[30%]" src={`https://s3.ap-southeast-2.amazonaws.com/lamedia21${SingleQuestion?.audioUrl}`} controls />
            </div>
         <p className="text-lg font-[500] my-4">Listen to the given audio and choose the correct summary.</p>
                { 
                   SingleQuestion?.summaries?.map((current: HighlightCorrectSummaryTypes, index: number) => {
                    return (
                        <TextContentArea key={index} className="space-x-3 mb-3 cursor-pointer ">
                                    <input type="radio" name="answer" />
                                    <span>{current?.options}</span>
                     </TextContentArea>
                    )
                   })
                }
        </div>
        <QuestionFooter currentPage={params.id} />
     </main>
    )
}

export default SummariseSpokenText;