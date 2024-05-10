'use client';
import QuestionCard from "@/components/QuestionCard";
import { useParams, useRouter } from "next/navigation";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { useEffect, useMemo } from "react";
import {  QuestionsListNameType, readingQuestionList } from "@/features/Reading/readingSlice";
import { PaginationComposer } from "@/utils/PaginationComposer";
import { Pagination } from "@mantine/core";


type MapQuestionsTypesToUrlTypes = {
   [url: string]: {
     name: QuestionsListNameType, 
    uri: string, 
    title?: string
   }
}

const MapQuestionsTypesToUrl: MapQuestionsTypesToUrlTypes = {
    "multiple-choice-multiple-answers": {
        name: "MultipleChoiceMultipleAnswer",
        uri: "/reading/multiple-choice-multiple-answers",
        title: "Multiple choice multiple answer"
    },
     "multiple-choice-single-answer": {
        name: "MultipleChoiceSingleAnswer",
        uri: "/reading/multiple-choice-single-answer",
        title: "Multiple choice Single answer"
    },
      "reading-re-order-paragraphs": {
        name: "ReadingReOrderParagraphs",
        uri: "/reading/re-order-paragraphs",
        title: "Reading re-order paragraphs"
    },
      "reading-fill-in-the-blanks": {
        name: "RFillIntheBlanks",
        uri: "/reading/reading-fill-in-the-blanks",
        title: "Reading fill in the blanks"
    },
      "reading-and-writing-fill-in-the-blanks": {
        name: "RWFillInTheBlanks",
        uri: "/reading/reading-and-writing-fill-in-the-blanks",
        title: "Reading and writing fill in the blanks"
    }
}

const ReadingQuestionList = () => {

    const dispatch = AppUseDispatch();
    const { isLoading, isError, QuestionsList } = AppUseSelector(state => state.reading);
    const params = useParams<{type: string, page: string}>();
    const router = useRouter();


    useEffect(() => {
         if ( MapQuestionsTypesToUrl[params.type] === undefined ) {
            return router.push("/")
         }
        dispatch(readingQuestionList(MapQuestionsTypesToUrl[params.type]))
    }, [params.type])

    const totalPagesMemo = useMemo(() => {
     return PaginationComposer(QuestionsList, params, MapQuestionsTypesToUrl)
    }, [QuestionsList])




    return !isLoading && (
        <main>
             <div className="flex items-center  mb-8">
                    <span className="text-2xl font-[600]">Reading - {MapQuestionsTypesToUrl[params.type]?.["title"]}</span>
            </div>
     <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {  QuestionsList?.[MapQuestionsTypesToUrl[params.type].name]?.slice(totalPagesMemo.start, totalPagesMemo.end).map((question) => {
                return (
                    <QuestionCard key={question.id} url={MapQuestionsTypesToUrl[params.type].uri} question={question} />
                )
            })}
          </div>
           <Pagination  className="mt-8" value={Number(params.page)} total={totalPagesMemo.pages} onChange={(value) => {
              router.push(`${value}`)
            }}/>
        </main>
    )
}

export default ReadingQuestionList;

