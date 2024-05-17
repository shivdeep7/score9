'use client';
import QuestionCard from "@/components/QuestionCard";
import { useParams, useRouter } from "next/navigation";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { useEffect, useMemo, useState } from "react";
import {  QuestionsListNameType, readingQuestionList } from "@/features/Reading/readingSlice";
import { PaginationComposer } from "@/utils/PaginationComposer";
import { Pagination } from "@mantine/core";
import { Tabs } from '@mantine/core';
import { literata } from "@/app/layout";


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
    const [activeTab, setActiveTab] = useState<string>(params.type as string)


    useEffect(() => {
      setActiveTab(params.type)
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
             <div className="flex items-center  w-full lg:max-w-6xl m-auto">
             <h2 className={`text-3xl font-[500] my-5 mb-4  m-auto w-full lg:max-w-7xl ${literata.className}`}>Reading - {MapQuestionsTypesToUrl[params.type]?.["title"]}</h2>
                            
            </div>
              <Tabs color="orange" defaultValue="gallery" className="w-full m-auto mt-5"  value={activeTab} onChange={(v) => router.replace(`/reading/practice/${v}/1`)}>
          
                <Tabs.List>
                  <div  className="w-full lg:max-w-6xl m-auto flex flex-row">
                     <Tabs.Tab value="multiple-choice-multiple-answers"  >
          Multiple Choice
        </Tabs.Tab>
        <Tabs.Tab value="multiple-choice-single-answer">
         Single Answer
        </Tabs.Tab>
        <Tabs.Tab value="reading-re-order-paragraphs">
          Re-order paragraphs
        </Tabs.Tab>
       
        <Tabs.Tab value="reading-fill-in-the-blanks">
          Fill in the blanks
        </Tabs.Tab>
         
         <Tabs.Tab value="reading-and-writing-fill-in-the-blanks">
          Reading and writing fill in blanks
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
              {  QuestionsList?.[MapQuestionsTypesToUrl[params.type].name]?.slice(totalPagesMemo.start, totalPagesMemo.end).map((question) => {
                  return (
                      <QuestionCard key={question.id} url={MapQuestionsTypesToUrl[params.type].uri} question={question} />
                  )
              })}
            </div>
            </div>
             
           
           </div>
          </div>
           <Pagination  className="mt-8 w-full lg:max-w-6xl m-auto" value={Number(params.page)} total={totalPagesMemo.pages} onChange={(value) => {
              router.push(`${value}`)
            }}/>
      </Tabs.Panel>
    </Tabs>
        
        </main>
    )
}

export default ReadingQuestionList;

