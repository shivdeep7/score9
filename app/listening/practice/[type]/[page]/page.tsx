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
import { Tabs } from '@mantine/core';
import { literata } from '@/app/layout';



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

     
     
     const { isLoading, isError, isSuccess, QuestionsList,totalPages } = AppUseSelector(state => {
        return state.listening;
     })
     const params = useParams<{"type": string; page: string}>();
       const [activeTab, setActiveTab] = useState<string>(params.type as string)


   useEffect(() => {
        setActiveTab(params.type)
        // Get the the list of questions
        dispatch(ListeningQuestionsList({...MapQuestionsTypesToUrl[params.type], uri: `${MapQuestionsTypesToUrl[params.type].uri}?page=${params.page}`}))

        
    }, [params.type, dispatch, params.page])

    useEffect(() => {

    }, [params.page])

     return !isLoading && (
        <main>
             <div className="flex items-center  w-full lg:max-w-6xl m-auto">
             <h2 className={`text-3xl font-[500] my-5 mb-4  m-auto w-full lg:max-w-7xl ${literata.className}`}>Reading - {MapQuestionsTypesToUrl[params.type]?.["title"]}</h2>
                            
            </div>
              <Tabs color="orange" defaultValue="gallery" className="w-full m-auto mt-5"  value={activeTab} onChange={(v) => router.replace(`/listening/practice/${v}/1`)}>
          
                <Tabs.List>
                  <div  className="w-full lg:max-w-6xl m-auto flex flex-row">
                     <Tabs.Tab value="summerize-spoken-types"  >
          Summarize
        </Tabs.Tab>
        <Tabs.Tab value="multiple-choice">
          Multiple Choice
        </Tabs.Tab>
        <Tabs.Tab value="multiple-choice-single-answer">
          Single answer
        </Tabs.Tab>
       
        <Tabs.Tab value="fill-in-the-blanks">
          Fill in the blanks
        </Tabs.Tab>
         
         <Tabs.Tab value="highlist-correct-summary">
         Hightlight Correct
        </Tabs.Tab>
         <Tabs.Tab value="select-missing-word">
         Select Missing Word
        </Tabs.Tab>
         <Tabs.Tab value="highlight-incorrect-words">
         Hightlight incorrect
        </Tabs.Tab>
         <Tabs.Tab value="write-form-dictation">
         Write from Diciation
        </Tabs.Tab>
                  </div>
      </Tabs.List>
      <Tabs.Panel  value={activeTab}>
         <div className="mt-6 w-full lg:max-w-6xl m-auto mt-10">
            
           <div className="flex flex-row space-x-6">
            <div>
                         
            <h3 className="text-2xl font-bold mt-5">Practice Questions</h3>
              <h3 className="text-lg font-light mb-5">Choose from the practice questions and learn on your pace.</h3>
            <div className="grid grid-cols-3 gap-4 " >
              {  QuestionsList?.[MapQuestionsTypesToUrl[params.type].name]?.map((question) => {
                  return (
                      <QuestionCard key={question.id} url={MapQuestionsTypesToUrl[params.type].uri} question={question} />
                  )
              })}
            </div>
            </div>
             
           
           </div>
          </div>
           <Pagination  className="mt-8 w-full lg:max-w-6xl m-auto" value={Number(params.page)} total={totalPages} onChange={(value) => {
              router.push(`${value}`)
            }}/>
      </Tabs.Panel>
    </Tabs>
        
        </main>
    )
}

export default MultipleChoice;