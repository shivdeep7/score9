'use client';
import CountDown from "@/components/CountDown.js";
import QuestionHeader from "@/components/QuestionHeader";
import QuestionFooter from "@/components/QuestionsFooter";
import TextContentArea from "@/components/TestContentArea";
import { SingleQuestionData, reset } from "@/features/listening/listeningSlice";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { MultipleChoiceOptionsTypes } from "@/types/listening";
import { Textarea } from "@mantine/core";
import { useParams } from 'next/navigation'
import { useEffect } from "react";


const SummariseSpokenText = () => {

    const params = useParams<{id: string}>();
    const dispatch =  AppUseDispatch();
    const { isLoading, isError, SingleQuestion } = AppUseSelector(state => state.listening)

    useEffect(() => {

        dispatch(SingleQuestionData({
            uri:  `/listening/fill-in-the-blanks/${params.id}`,
            id: params.id,
            name: "FillIntheBlanks"
        }))
    }, [params.id, dispatch])

    return !isLoading && (
      <main>
        <QuestionHeader
            countdown={70}
        />
        <div className="w-full lg:max-w-6xl m-auto mt-20">
            <div className="flex flex-1 w-full bg-[#f1f3f4] mt-5">
                 <audio className="w-[30%]" src={`https://s3.ap-southeast-2.amazonaws.com${SingleQuestion?.audioUrl}`} controls />
            </div>
            <TextContentArea className="mt-10 items-center overflow-hidden">
              {
                SingleQuestion?.question?.split("__add_blank__").map((p) => {
                    return (
                        <>
                            <span>{p}</span>
                            <input className="m-2 rounded-md shadow-md border border-zinc-200 px-3 py-1 " type="text" />
                        </>

                    )
                })
              }
            </TextContentArea>
        </div>
        <QuestionFooter currentPage={params.id} />
     </main>
    )
}

export default SummariseSpokenText;