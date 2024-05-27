'use client';
import CountDown from "@/components/CountDown.js";
import QuestionHeader from "@/components/QuestionHeader";
import QuestionFooter from "@/components/QuestionsFooter";
import TextContentArea from "@/components/TestContentArea";
import {  readingSingleQuestionData, readingSubmitAnswer, resetResponse } from "@/features/reading/readingSlice";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { MultipleChoiceOptionsTypes } from "@/types/listening";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";


const INCORRECT_ANSWER_CLASS = "bg-red-100 ";

const MultipleChoiceMultipleAnswers = () => {

    const params = useParams<{id: string}>();
    const dispatch =  AppUseDispatch();
    const { isLoading, isError, SingleQuestion, SubmitResponse } = AppUseSelector(state => state.reading)
    const [answer, setAnswer] = useState<string[]>([])

    useEffect((): any => {

        dispatch(readingSingleQuestionData({
            uri:  `/reading/multiple-choice-multiple-answers/${params.id}`,
        }))

       return () =>  dispatch(resetResponse())
    }, [params.id])


    const handleAnswerSubmit = () => {
        dispatch(readingSubmitAnswer({
            uri:  `/reading/submit-multiple-choice-single-answer`,
            questionId: Number(params.id),
            userId:  11, 
            answer: answer
        }))
    }

    const handleAnswerChange = (option: string) => {
        dispatch(resetResponse())
        let listSelectedAnswers = [...answer];
        const index = listSelectedAnswers.indexOf(option); 
        index !== -1 ? listSelectedAnswers.splice(index, 1) : listSelectedAnswers.push(option)
        setAnswer(listSelectedAnswers)
    }

    return !isLoading && (
      <main>
        <QuestionHeader countdown={70} />
        <div className="mt-20 w-full lg:max-w-6xl m-auto">
            <h2 className="text-2xl">#{params.id} {SingleQuestion?.title}</h2>

            <div className="flex flex-1 w-full bg-[#f1f3f4] mt-5">
                 <audio className="w-[30%]" src={`https://s3.ap-southeast-2.amazonaws.com/lamedia21/ptedata/ptemedia/${SingleQuestion?.audioUrl}`} controls />
            </div>
            <TextContentArea className="mt-10">
                <span className="text-lg font-[500] m-2 mb-3 ">{SingleQuestion?.question}</span>
                {
                    SingleQuestion?.options?.map((current: MultipleChoiceOptionsTypes) => {
                        return (

                            <div className={`p-2 space-x-1 ${SubmitResponse !== null && (current.correct ? "bg-green-100" : SubmitResponse?.score === 0 && answer.indexOf(current.options) !== -1 && "bg-red-100") }`} onChange={() => handleAnswerChange(current?.options) } key={current?.options}>
                                <input type="checkbox" />
                                <span>{current?.options}</span>
                            </div>
                        )
                    })
                }
            </TextContentArea>
        </div>
        <QuestionFooter currentPage={params.id} disabled={answer.length ? false : true} onSubmit={handleAnswerSubmit}/>
     </main>
    )
}

export default MultipleChoiceMultipleAnswers;