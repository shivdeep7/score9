'use client';
import Ai from '@/components/Ai';
import { useEffect, useMemo, useState } from "react";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { ListeningQuestionsList, QuestionTypesProps } from "@/features/listening/listeningSlice";
import { MultipleChoiceMultipleAnswers } from "@/types/listening";
import QuestionCard from "@/components/QuestionCard";
import { useParams, useRouter } from 'next/navigation';
import { Pagination } from '@mantine/core';
import { QuestionsPropsTypes } from '@/features/listening/listeningService';
import { PaginationComposer } from '@/utils/PaginationComposer';




interface MapQuestionTypesToUrl extends QuestionsPropsTypes {
  title?: string;
}

const MapQuestionsTypesToUrl: {
 [type: string]: MapQuestionTypesToUrl 
} = {
  "multiple-choice": {
    "name": "MultipleChoiceMultipleAnswers",
     "uri": "/listening/multiple-choice-multiple-answers",
     "title": "Multiple choice"
  },
    "summerize-spoken-types": {
      "name": "ListeningSummarizeSpokenText",
     "uri": "/listening/summarize-spoken-text",
      "title": "Summerize Spoken Types"
  },
  "multiple-choice-single-answer": {
    "name": "MultipleChoiceSingleAnswer",
    "uri": "/listening/multiple-choice-single-answer",
    "title": "Multiple choice Single answer"
  },
  "fill-in-the-blanks" : {
    "name": "FillIntheBlanks",
    "uri": "/listening/fill-in-the-blanks",
    "title": "Fill in the blanks"
  },
  "highlist-correct-summary": {
    "name": "HighlightCorrectSummary",
    "uri": "/listening/highlight-correct-summary",
    "title": "Hightlight Correct Summary"
  },
  "select-missing-word": {
    "name": "SelectMissingWord",
    "uri": "/listening/select-missing-word",
    "title": "Select missing word"
  },
  "highlight-incorrect-words": {
    "name": "HighlightIncorrectWords",
    "uri": "/listening/highlight-incorrect-words",
    "title": "Highlight incorrect words",
  },
  "write-form-dictation": {
    "name": "WriteFromDictation",
     "uri": "/listening/write-from-dictation",
     "title": "Write Form Diciation"
  }
}
const MultipleChoice = () => {

    const router = useRouter();
    
     const dispatch = AppUseDispatch();
     
     
     const { isLoading, isError, isSuccess, QuestionsList } = AppUseSelector(state => {
        return state.listening;
     })
     const params = useParams<{"type": string; page: string}>();

   const totalPagesMemo = useMemo(() => {
    return PaginationComposer(QuestionsList, params, MapQuestionsTypesToUrl)
   }, [QuestionsList])


   useEffect(() => {
        // Get the the list of questions
          dispatch(ListeningQuestionsList(MapQuestionsTypesToUrl[params.type]))
        
    }, [])

    useEffect(() => {

    }, [params.page])

    return !isLoading && (
     <main>

            <div className="flex items-center  mb-8">
                    <span className="text-2xl font-[600]">Listening - {MapQuestionsTypesToUrl[params.type]["title"]}</span>
            </div>
     <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                
            {
             
              QuestionsList?.[MapQuestionsTypesToUrl[params.type]["name"]]?.slice(totalPagesMemo.start, totalPagesMemo.end).map((current) => {
                    return (
                            <QuestionCard key={current.id} question={current} url={MapQuestionsTypesToUrl[params.type].uri} />
                    )
                })
            }
            
            </div>
            <Pagination  className="mt-8" value={Number(params.page)} total={totalPagesMemo.pages} onChange={(value) => {
              router.push(`${value}`)
            }}/>
            
      </main>
    )
}

export default MultipleChoice;