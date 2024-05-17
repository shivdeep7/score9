'use client';
import CountDown from "@/components/CountDown.js";
import QuestionHeader from "@/components/QuestionHeader";
import QuestionFooter from "@/components/QuestionsFooter";
import TextContentArea from "@/components/TestContentArea";
import { SingleQuestionData, reset } from "@/features/listening/listeningSlice";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { Textarea } from "@mantine/core";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";

const SummariseSpokenText = () => {

    const params = useParams<{id: string}>();
    const [answer, setAnswer] = useState<string>("");
    const [wordCount, setWordCount] = useState<number>(0);
    const dispatch =  AppUseDispatch();
    const { isLoading, isError, SingleQuestion } = AppUseSelector(state => state.listening)

    useEffect(() => {

        dispatch(SingleQuestionData({
            uri:  `/listening/summarize-spoken-text/${params.id}`,
            id: params.id,
            name: "ListeningSummarizeSpokenText"
        }))
    }, [params.id])

    const hanldeTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
       const value = e.target.value;
       const count = value == "" ? 0 : e.target.value.split(" ").length

       setAnswer(value);
       setWordCount(count);

    }

    return !isLoading && (
      <main>
        <QuestionHeader
            countdown={70}
        />
        <div className="w-full lg:max-w-6xl m-auto mt-20">
            <h2 className="text-2xl">#{params.id} {SingleQuestion?.title}</h2>

            <div className="flex flex-1 w-full bg-[#f1f3f4] mt-5">
                 <audio className="w-[30%]" src={`https://s3.ap-southeast-2.amazonaws.com/lamedia21/ptedata/ptemedia/${SingleQuestion?.audioUrl}`} controls />
            </div>
            <TextContentArea className="flex mt-10 p-0">
                Listen to the given audio above and write the summary in 50-70 words.
            </TextContentArea>
            <Textarea style={{border: 0}}className="w-full resize-x outline-none border-none mt-5" onChange={(e) => {
                hanldeTextAreaChange(e)
            }}></Textarea>
                 <span className="flex my-4">Word Count: {wordCount}</span>
                              <hr />
        </div>
    

        <QuestionFooter currentPage={params.id} disabled={wordCount ? false : true } />
     </main>
    )
}

export default SummariseSpokenText;