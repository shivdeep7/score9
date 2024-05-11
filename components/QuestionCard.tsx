import { QuestionTypesProps } from "@/features/listening/listeningSlice";
import { BaseApiTypes } from "@/types/listening";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation'


const QuestionCard = ({
    question, url
}: {question: BaseApiTypes, url: string}) => {

 const router = useRouter();

    return (
        <div className="flex card rounded-sm  shadow-none border-none border-zinc-200 border-b-300 bg-[#f6f4ee]" >
            <div className="card-body flex-row justify-between items-center">
            <div className="flex flex-col w-[90%] justify-start ">
                <div className="bg-zinc-200 rounded-full p-4 w-14 items-center justify-center mb-2 font-[500]">#{question?.id}</div>
                <h2 className=" text-md font-[500] "> {question?.question}</h2>
            <p className="text-sm truncate">{question.title}</p>
                        <div className="card-actions justify-start mt-2">

            </div>
            <button onClick={(() => router.push(`${url}/${question.id}`))} className="flex flex-row space-x-2 justify-center  items-center 0 p-2 rounded-full bg-white border border-black text-black font-[600] text-sm px-4 w-[140px]">
                <SparklesIcon className="w-4 h-4" />
                <span>Start Test</span>
            </button>
            </div>
        </div>
      </div>
    )
}

export default QuestionCard;