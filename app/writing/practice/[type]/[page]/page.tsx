'use client'
import QuestionCard from "@/components/QuestionCard";
import { QuestionsListNameType, writingQuestionList } from "@/features/writing/writingSlice";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { PaginationComposer } from "@/utils/PaginationComposer";
import { Pagination } from "@mantine/core";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";



type MapQuestionsTypesToUrlTypes = {
    
        name: QuestionsListNameType,
        uri: string, 
        title?: string
    
}

const MapQuestionsTypesToUrl: { [type: string]: MapQuestionsTypesToUrlTypes} = {
    "summerize-written-text": {
        name: "SummerizeWrittenText",
        uri: "/writing/summarize-written-text",
        title: "Summerize Written Text"
    },
     "written-essay": {
        name: "WrittenEssay",
        uri: "/writing/write-essay",
        title: "Written eassy"
    }
}

const WrittentQuestionList = () => {

    const router = useRouter();
    const dispatch = AppUseDispatch();
    const { isLoading, QuestionsList } = AppUseSelector(state => state.writting)
    const params = useParams<{type: string, page: string}>();
    const [currentQuestionType, setCurrentQuestionType] = useState<MapQuestionsTypesToUrlTypes>( MapQuestionsTypesToUrl[params.type] as MapQuestionsTypesToUrlTypes)

    useEffect(() => {
        dispatch(writingQuestionList(currentQuestionType))
    }, [params.page])

    const TotalMemoPages = useMemo(() => {
       return PaginationComposer(QuestionsList, params, MapQuestionsTypesToUrl)
    }, [QuestionsList])


    return !isLoading && (
        <main>
     <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {
                QuestionsList?.[currentQuestionType.name]?.slice(TotalMemoPages.start, TotalMemoPages.end).map((current) => {
                    return <QuestionCard key={current.id}  url={currentQuestionType.uri} question={current} />
                })
            }
            </div>
              <Pagination  className="mt-8" value={Number(params.page)} total={TotalMemoPages.pages} onChange={(value) => {
              router.push(`${value}`)
            }}/>
        </main>
    )
}

export default WrittentQuestionList;