'use client';
import CountDown from "@/components/CountDown.js";
import QuestionHeader from "@/components/QuestionHeader";
import QuestionFooter from "@/components/QuestionsFooter";
import TextContentArea from "@/components/TestContentArea";
import {  readingSingleQuestionData, readingSubmitAnswer, resetResponse } from "@/features/Reading/readingSlice";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { MultipleChoiceOptionsTypes } from "@/types/listening";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";

const INCORRECT_ANSWER_CLASS = "bg-red-100 ";

const MultipleChoiceMultipleAnswers = () => {

    const params = useParams<{id: string}>();
    const dispatch =  AppUseDispatch();
    const [answer,setAnswer] = useState<string[]>([])
    const { isLoading, isError, SingleQuestion, SubmitResponse } = AppUseSelector(state => state.reading)

    useEffect(() => {
        dispatch(readingSingleQuestionData({
            uri:  `/reading/multiple-choice-single-answer/${params.id}`,
        }))
    }, [params.id, dispatch])

    
    const handleAnswerSubmit = () => {
        dispatch(readingSubmitAnswer({
            uri:  `/reading/submit-multiple-choice-single-answer`,
            questionId: Number(params.id),
            userId:  11, 
            answer: answer
        }))
    }


    const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(resetResponse())
        const newValue = [...answer]
        newValue[0] = e.target.value; 
        setAnswer(newValue);
    }

    return !isLoading && (
      <main>
        <QuestionHeader countdown={70} />
        <div className="mt-10 w-full lg:max-w-6xl m-auto">
            <h2 className="text-2xl">#{params.id} {SingleQuestion?.title}</h2>
            <TextContentArea className="mt-10">
                <span className="text-lg font-[500] m-2 mb-3 ">{SingleQuestion?.question}</span>
                {
                    SingleQuestion?.options?.map((current: MultipleChoiceOptionsTypes, index: number) => {
                        return (
                            <div className={`p-2 space-x-1 ${SubmitResponse !== null && SubmitResponse?.score === 0 && ((answer.indexOf(current.options) != -1) ? INCORRECT_ANSWER_CLASS : current.correct && "bg-green-100")}`} key={index}>
                                <input type="radio" name="answer" value={current.options} onChange={(e) => handleRadioClick(e)} />
                                <span>{current?.options}</span>
                            </div>
                        )
                    })
                }
            </TextContentArea>
        </div>
        <QuestionFooter currentPage={params.id} disabled={answer.length == 0 ? true : false} onSubmit={handleAnswerSubmit} />
     </main>
    )
}

export default MultipleChoiceMultipleAnswers;