'use client';
import { useState, useEffect, useMemo } from "react";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import QuestionHeader from "@/components/QuestionHeader";
import CountDown from "@/components/CountDown";
import { useParams } from "next/navigation";
import { SingleQuestionData } from "@/features/writing/writingSlice";
import TextContentArea from "@/components/TestContentArea";
import { Textarea } from "@mantine/core";
import QuestionFooter from "@/components/QuestionsFooter";



const WrittenEssay = () => {

    const dispatch = AppUseDispatch();
    const [wordCount, setWordCount] = useState<number>(0);
    const params = useParams<{id: string}>();
    const { isLoading, isError, SingleQuestion, QuestionsList } = AppUseSelector(state => state.writting)


    useEffect(() => {
        dispatch(SingleQuestionData({
            uri: `/writing/write-essay/${params.id}`
        }))
    }, [params.id])


    // Get the count of the questions list
    const QuestionsListCount = useMemo(() => {
        console.log("count", QuestionsList?.SummerizeWrittenText?.length)
        return QuestionsList?.SummerizeWrittenText?.length; 
    }, [QuestionsList?.SummerizeWrittenText])

    

    return !isLoading && (
        <main>
            <QuestionHeader initial="SW" title="Written Essay" description="Read a description of a situation. Then write an essay about the situation. You will have 9 minutes. You should aim to write at least 100 words. Write using complete sentences.
"  />
            <div className="mt-3">
                <h1 className="text-xl font-[500] my-4">#{params.id} {SingleQuestion?.title}</h1>
                {<CountDown seconds={1200} />}
                <TextContentArea className="my-3">
                   {SingleQuestion?.question}
                </TextContentArea>
                <Textarea rows={10} onChange={(e) => {
                    setWordCount(e.target.value == "" ? 0 : e.target.value.split(" ").length)
                }}></Textarea>
             </div>
                              <span className="flex my-2">Word Count: {wordCount}</span>
                              <hr />

                <QuestionFooter  currentPage={params.id} disabled={wordCount ? false : true} />
        </main>
    )
}

export default WrittenEssay;