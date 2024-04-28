'use client';
import CountDown from "@/components/CountDown.js";
import QuestionHeader from "@/components/QuestionHeader";
import TextContentArea from "@/components/TestContentArea";
import { SingleQuestionData, reset } from "@/features/listening/listeningSlice";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { MultipleChoiceOptionsTypes } from "@/types/listening";
import { useParams } from 'next/navigation'
import { useEffect } from "react";

const SummariseSpokenText = () => {

    const params = useParams<{id: string}>();
    const dispatch =  AppUseDispatch();
    const { isLoading, SingleQuestion } = AppUseSelector(state => state.listening)

    useEffect(() => {

        dispatch(SingleQuestionData({
            uri:  `/listening/multiple-choice-multiple-answers/${params.id}`,
            id: params.id,
            name: "ListeningSummarizeSpokenText"
        }))
    }, [params.id])

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
            <TextContentArea className="mt-10">
                <span className="text-lg font-[500] m-2 mb-3 ">{SingleQuestion?.question}</span>
                {
                    SingleQuestion?.options?.map((current: MultipleChoiceOptionsTypes) => {
                        return (
                            <div className="p-2 space-x-1">
                                <input type="radio" name="answer" className="border border-red-200" />
                                <span>{current?.options}</span>
                            </div>
                        )
                    })
                }
            </TextContentArea>
        </div>
     </main>
    )
}

export default SummariseSpokenText;