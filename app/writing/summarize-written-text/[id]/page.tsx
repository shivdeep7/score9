'use client';
import { useState, useEffect, useMemo } from "react";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import QuestionHeader from "@/components/QuestionHeader";
import CountDown from "@/components/CountDown";
import { useParams, useRouter } from "next/navigation";
import { SingleQuestionData } from "@/features/writing/writingSlice";
import TextContentArea from "@/components/TestContentArea";
import { Textarea } from "@mantine/core";
import QuestionFooter from "@/components/QuestionsFooter";

const SummerizeWrittenTest = () => {

    const dispatch = AppUseDispatch();
    const [answer, setAnswer] = useState<string>("");
    const [wordCount, setWordCount] = useState<number>(0);
    const params = useParams<{id: string}>();
    const { isLoading, isError, SingleQuestion, QuestionsList } = AppUseSelector(state => state.writting)


    useEffect(() => {
        dispatch(SingleQuestionData({
            uri: `/writing/summarize-written-text/${params.id}`
        }))
    }, [params.id])

     const hanldeTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
       const value = e.target.value;
       const count = value == "" ? 0 : e.target.value.split(" ").length

       setAnswer(value);
       setWordCount(count);

    }


    // Get the count of the questions list
    const QuestionsListCount = useMemo(() => {
        console.log("count", QuestionsList?.SummerizeWrittenText?.length)
        return QuestionsList?.SummerizeWrittenText?.length; 
    }, [QuestionsList?.SummerizeWrittenText])

    

    return !isLoading && (
        <main>
            {/* <QuestionHeader initial="SW" title="Summerize Written test" description="Read the passage below. Summarize the passage using between 25 and 50 words. Type your response in the box at the bottom of the screen. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the passage."  /> */}
            <div className="mt-3">
                <h1 className="text-xl font-[500] my-4">#{params.id} {SingleQuestion?.title}</h1>
                {<CountDown seconds={1200} setProgress={()=>{}}/>}
                <TextContentArea className="my-3">
                   {SingleQuestion?.question}
                </TextContentArea>
                <Textarea rows={10} onChange={(e) => {
                  hanldeTextAreaChange(e)
                }}></Textarea>
             </div>
                              <span className="flex my-4">Word Count: {wordCount}</span>
                              <hr />

         <QuestionFooter currentPage={params.id} disabled={wordCount ? false : true } />
        </main>
    )
}

export default SummerizeWrittenTest;