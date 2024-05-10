'use client';
import { useMemo, useState, useEffect } from "react";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { useRouter, useParams } from "next/navigation";
import type { QuestionsListNameType } from "@/features/speaking/speakingSlice";
import { speakingQuestionList } from "@/features/speaking/speakingSlice";
import { PaginationComposer } from "@/utils/PaginationComposer";
import QuestionCard from "@/components/QuestionCard";
import { Pagination } from "@mantine/core";

interface MapQuestionsTypesToUrlTypes {
  name: QuestionsListNameType;
  uri: string;
  title?: string;
}


const MapQuestionsTypesUrl: {
  [type: string]: MapQuestionsTypesToUrlTypes;
} = {
  "answer-short-question": {
    name: "AnswerShortQuestions",
    uri: "/speaking/answer-short-question",
    title: "Answer Short Qustions",
  },
  "describe-image": {
    name: "DescibeImage",
    uri: "/speaking/describe-image",
    title: "Describe Image",
  },
  "read-aloud": {
    name: "ReadAloud",
    uri: "/speaking/read-aloud",
    title: "Read Aloud",
  },
  "repeat-sentence": {
    name: "ReapeatSentence",
    uri: "/speaking/repeat-sentence",
    title: "Reapeat Sentence",
  },
  "retel-lecture": {
    name: "RetelLecture",
    uri: "/speaking/retell-lecture",
    title: "Retel Lecture",
  },
};

const SpeakingQuestionList = () => {
  const router = useRouter();
  const params = useParams<{ type: string; page: string }>();
  const dispatch = AppUseDispatch();
  const { isLoading, QuestionsList } = AppUseSelector(
    (state) => state.speaking,
  );
  const [currentQuestionType, setCurrentQuestionType] =
    useState<MapQuestionsTypesToUrlTypes>(
      MapQuestionsTypesUrl[params.type] as MapQuestionsTypesToUrlTypes,
    );



  useEffect(() => {

  
    
  dispatch(speakingQuestionList(currentQuestionType));
  }, [params.type, currentQuestionType, dispatch]);

  const TotalMemoPages = useMemo(() => {
    return PaginationComposer(QuestionsList, params, MapQuestionsTypesUrl);
  }, [QuestionsList]);


  console.log(TotalMemoPages)

  return !isLoading && <main>

     <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

       { 
        QuestionsList?.[currentQuestionType.name]?.slice(TotalMemoPages.start, TotalMemoPages.end).map(current => {
          return (
            <QuestionCard key={current.id} url={currentQuestionType.uri} question={current} />
          )
        }) 
      }
     </div>
      <Pagination  className="mt-8" value={Number(params.page)} total={TotalMemoPages.pages} onChange={(value) => {
        router.push(`${value}`)
      }}/>
  </main>;
};

export default SpeakingQuestionList;
