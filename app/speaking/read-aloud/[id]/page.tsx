'use client';
import React, { useEffect, useState } from "react";
import Recorder, { TimerTypes } from "@/components/Recorder";
import TextContentArea from "@/components/TestContentArea";
import QuestionHeader from "@/components/QuestionHeader"
import { useParams } from "next/navigation";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { SingleQuestionData } from "@/features/speaking/speakingSlice";
import QuestionFooter from "@/components/QuestionsFooter";


const ReadAloud = () => {
    const params = useParams<{id: string}>();
    const dispatch = AppUseDispatch();
    const { isLoading, SingleQuestion} = AppUseSelector(state => state.speaking);
    const [time, setTime] = useState<TimerTypes>({time: 120, percentage: 100});
    const [recordingState, setRecordingState] = useState<boolean>(false);

    useEffect(() => {
        dispatch(SingleQuestionData({
            uri: `/speaking/read-aloud/${params.id}`
        }))
    }, [params.id, dispatch])

    return !isLoading &&  (
      <main>
        {/* <QuestionHeader
            initial="RA"
            description="Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud."
            title="Read Aloud"
        /> */}
        <div className="mt-10">
            <h2 className="text-2xl">#1443 Extracting Carbon Dioxide  
           
        </h2>
            <TextContentArea className="mt-10">
                {SingleQuestion?.question}
            </TextContentArea>
        </div>
        <Recorder className="mt-10" time={time} setTime={setTime} setRecordingState={setRecordingState} seconds={120} />
         {
                 recordingState && <div className="radial-progress mr-5 mt-5" 
                //  style={{"--value":time.percentage,  "--size": "3rem", "--thickness": "2px"}} 
                 role="progressbar">{time.time}</div>
            }
        <QuestionFooter currentPage={params.id} submit={false} />

     </main>
    )
}


export default ReadAloud;