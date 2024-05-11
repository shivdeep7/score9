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
        <main className="h-screen  mt-10">
             <div className="flex items-center  w-full lg:max-w-7xl m-auto">
                                <h2 className={`text-3xl font-[500] my-5 mb-4  m-auto w-full lg:max-w-7xl`}>Reading - {MapQuestionsTypesToUrl[params.type]?.["title"]}</h2>

            </div>
            <hr />
          <div className="mt-6 w-full lg:max-w-7xl m-auto">
            
           <div className="flex flex-row space-x-6">
            <div>
                             <div className="grid grid-cols-2 gap-4">
                               <div className="w-full h-[250px] bg-white mb-5 rounded-md shadow-md flex flex-col bg-indigo-100 relative border border-zinc-200">
                              <div className=" flex flex-col  justify-between p-6  h-full">
                                    <span className="text-black text-2xl font-[500]">Answer a random question from this section.</span>
                                <button className=" bg-indigo-500 text-white rounded-full font-bold py-2 w-36">Start Random</button>
                              </div>
                                <div className="absolute right-0 bottom-0">
                                  <svg width="160" height="171" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#graphic-courses-level_svg__clip0_2260_23037)"><path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M233.172-34.331c43.398 17.584 34.502 79.508 68.596 111.608 30.239 28.472 81.581 15.004 103.408 50.342 20.519 33.222-10.959 74.92-23.946 111.747-13.629 38.65-12.781 101.59-53.34 107.422-47.837 6.879-67.018-73.33-114.304-83.315-35.683-7.534-64.026 45.749-99.692 38.13-39.028-8.337-69.327-42.182-86.945-77.998C6.845 182.735-10.55 137.568 9.377 96.61c19.78-40.655 80.034-38.564 119.407-60.779 36.748-20.734 65.283-86.006 104.388-70.162z" fill="#E8DDFB"></path><rect width="25" height="75" rx="2" transform="matrix(-1 0 0 1 144 80)" fill="#3728AA"></rect><rect width="25" height="52" rx="2" transform="matrix(-1 0 0 1 113 103)" fill="#8686DF"></rect><rect x="-0.5" y="0.5" width="24" height="34" rx="1.5" transform="matrix(-1 0 0 1 81 120)" fill="#fff" stroke="#140B41"></rect><path d="M129.056 55.867c-7.701 11.777-18.518 12.021-27.152 8.316m0 0c-9.96-4.275-17.014-13.807-13.023-16.95 6.312-4.97 11.647 5.336 13.023 16.95zm0 0c1.061 8.95-.23 18.677-5.237 22.785-5.793 4.752-13.48 4.273-19.02 1.95m0 0c-5.545-2.325-8.941-6.497-6.144-9.122 3.367-3.16 6.103 2.518 6.143 9.122zm0 0c.03 5.214-1.62 11.006-5.967 13.477-5.095 2.895-10.71.089-14.456-1.927" stroke="#140B41" stroke-linecap="round"></path><path d="M119.916 57.848c2.43-.965 7.654-2.711 9.119-1.977 1.464.734 1.562 7.925.969 11.058" stroke="#140B41" stroke-linecap="round"></path></g><defs><clipPath id="graphic-courses-level_svg__clip0_2260_23037"><path fill="#fff" d="M0 0h160v171H0z"></path></clipPath></defs></svg>
                                </div>
                              </div>
                               <div className="w-full h-[250px] bg-white mb-5 rounded-md shadow-md flex flex-col bg-orange-100 relative border border-zinc-200">
                              <div className=" flex flex-col  justify-between p-6  h-full z-2">
                                    <span className="text-black text-2xl font-[500]">Start section.</span>
                                    <span>Starting module will allow you to track your progress over the time and we will increae the complexity automatically each time you make progress.</span>
                                <button className=" bg-orange-500 text-white rounded-full font-bold py-2 w-36">Start Module</button>
                              </div>
                               
                              </div>
                             </div>
            <h3 className="text-2xl font-bold mt-10">Practice Questions</h3>
              <h3 className="text-lg font-light mb-5">Choose from the practice questions and learn on your pace.</h3>
            <div className="grid grid-cols-1 gap-4 " >
              {  QuestionsList?.[MapQuestionsTypesToUrl[params.type].name]?.slice(totalPagesMemo.start, totalPagesMemo.end).map((question) => {
                  return (
                      <QuestionCard key={question.id} url={MapQuestionsTypesToUrl[params.type].uri} question={question} />
                  )
              })}
            </div>
            </div>
             
            <div className=" rounded-lg  p-4 w-full lg:max-w-sm bg-[#f6f4ee] h-[300px]">
                        
               <button className="border border-black text-black w-full rounded-full bg-white py-2 text-lg font-bold">Filter</button>
            </div>
           </div>
          </div>
           <Pagination  className="mt-8" value={Number(params.page)} total={totalPagesMemo.pages} onChange={(value) => {
              router.push(`${value}`)
            }}/>
        </main>
    )
}

export default ReadingQuestionList;

