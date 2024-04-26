'use client';
import Ai from '@/components/Ai';
import { useEffect, useMemo, useState } from "react";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { ListeningQuestionsList } from "@/features/listening/listeningSlice";
import { MultipleChoiceMultipleAnswers } from "@/types/listening";
import QuestionCard from "@/components/QuestionCard";
import { useParams, useRouter } from 'next/navigation';
import { Pagination } from '@mantine/core';



const QUESTION_PER_PAGE = 12;

const MultipleChoice = () => {

    const router = useRouter();
    
     const dispatch = AppUseDispatch();
     const { isLoading, isError, isSuccess, QuestionsList } = AppUseSelector(state => {
        return state.listening;
     })
     const params = useParams<{page: string}>();

     

   const totalPagesMemo = useMemo(() => {
       const questions = QuestionsList?.MultipleChoiceMultipleAnswers;
        const totalQuestionsList = questions?.length;
        const totalPages =  Math.ceil((totalQuestionsList ? totalQuestionsList / 12 : 0))
        return {
          pages:  totalPages, 
          start: Number(params.page) * QUESTION_PER_PAGE - QUESTION_PER_PAGE,
          end: Number(params.page) * QUESTION_PER_PAGE
         }
   }, [QuestionsList])


   useEffect(() => {
        // Get the the list of questions
          dispatch(ListeningQuestionsList({
            "uri": "/listening/multiple-choice-multiple-answers",
            "name": "MultipleChoiceMultipleAnswers"
        }))
        
    }, [])

    useEffect(() => {

    }, [params.page])

    return !isLoading && (
     <main>

            <div className="flex items-center  mb-8">
                    <span className="text-2xl font-[600]">Speaking - Read Aloud</span>
                <Ai />
            </div>
            <div className="grid grid-cols-4 gap-4 ">
                
            {
             
              QuestionsList?.MultipleChoiceMultipleAnswers?.slice(totalPagesMemo.start, totalPagesMemo.end).map((current: MultipleChoiceMultipleAnswers) => {
                    return (
                            <QuestionCard key={current.id} question={current} url="/listening/multiple-choice/" />
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