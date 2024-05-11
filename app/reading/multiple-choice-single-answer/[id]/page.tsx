'use client';
import CountDown from "@/components/CountDown.js";
import QuestionHeader from "@/components/QuestionHeader";
import QuestionFooter from "@/components/QuestionsFooter";
import TextContentArea from "@/components/TestContentArea";
import {  readingSingleQuestionData } from "@/features/reading/readingSlice";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { MultipleChoiceOptionsTypes } from "@/types/listening";
import { useParams } from 'next/navigation'
import { useEffect } from "react";

const MultipleChoiceMultipleAnswers = () => {

    const params = useParams<{id: string}>();
    const dispatch =  AppUseDispatch();
    const { isLoading, isError, SingleQuestion } = AppUseSelector(state => state.reading)

    useEffect(() => {

        dispatch(readingSingleQuestionData({
            uri:  `/reading/multiple-choice-single-answer/${params.id}`,
        }))
    }, [params.id])

    return !isLoading && (
      <main>
        <QuestionHeader  countdown={90} />
        <div className="w-full lg:max-w-6xl m-auto mt-10">
          
        <div className="mt-20">
            <h2 className="text-lg font-[600]">#{params.id} {SingleQuestion?.title}</h2>
            <div className="flex flex-1 w-full bg-[#f1f3f4] mt-5">
                 <audio className="w-[30%]" src={`https://s3.ap-southeast-2.amazonaws.com/lamedia21/ptedata/ptemedia/${SingleQuestion?.audioUrl}`} controls />
            </div>
            <TextContentArea className="mt-10">
                <span className="text-lg font-[500] m-2 mb-3 ">{SingleQuestion?.question}</span>
                {
                    SingleQuestion?.options?.map((current: MultipleChoiceOptionsTypes) => {
                        return (
                            <div className="p-2 space-x-1">
                                <input type="radio" name="answer" />
                                <span>{current?.options}</span>
                            </div>
                        )
                    })
                }
            </TextContentArea>
        </div>
        </div>
       
        <QuestionFooter currentPage={params.id} />
     </main>
    )
}

export default MultipleChoiceMultipleAnswers;