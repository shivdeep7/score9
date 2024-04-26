import { QuestionTypesProps } from "@/features/listening/listeningSlice";
import { BaseListetningApiTypes } from "@/types/listening";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation'


const QuestionCard = ({
    question, url
}: {question: BaseListetningApiTypes, url: string}) => {

 const router = useRouter();

    return (
         <div className="flex card  bg-base-100 shadow-md border border-zinc-100" >
            <div className="card-body">
            <h2 className="card-title text-lg font-[500] truncate">#{question?.id} {question?.title}</h2>
            <p className="truncate">{question.question}</p>
            <div className="card-actions justify-start mt-2">
            <button onClick={(() => router.push(`${url}${question.id}`))} className="flex flex-row space-x-2 justify-center  items-center 0 p-2 rounded-md bg-red-400 text-white text-sm px-4">
                <SparklesIcon className="w-4 h-4" />
                <span >Start Test</span>
            </button>
            </div>
        </div>
      </div>
    )
}

export default QuestionCard;