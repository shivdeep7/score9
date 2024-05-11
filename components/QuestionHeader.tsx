'use client';
import Link from "next/link";
import CountDown from "./CountDown";
import { useState } from "react";

interface QuestionHeaderPropsTypes {
    initial: string; 
    title: string;
    description: string;
}

const QuestionHeader = ({
    countdown
}: {countdown: number}) => {

    const [progress, setProgress] = useState<number>(0)

    return (
        <div className="absolute top-0  bg-white w-full border-b border-zinc-200">
            <div>
            <div className="w-full m-auto lg:max-w-6xl flex justify-between items-center p-4">
                 <Link href="/dashboard"><span className="bg-[#fe4d00] font-bold text-2xl bg-clip-text text-transparent">Score9</span></Link>
                            <div className="bg-zinc-100 rounded-full p-2 px-5 font-[500]">
                                 <CountDown seconds={countdown} setProgress={setProgress}  />
                            </div>
                <Link href="/dashboard"><span className="bg-black  text-md bg-clip-text text-transparent">Close</span></Link>
            </div>
            </div>
            <progress className="progress progress-error h-1 w-full absolute b-[-10px] bg-transparent" value={progress} max={100}></progress>
        </div>
         
    )
}

export default QuestionHeader;