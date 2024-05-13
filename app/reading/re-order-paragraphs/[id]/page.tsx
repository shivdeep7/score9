'use client';
import CountDown from "@/components/CountDown.js";
import QuestionHeader from "@/components/QuestionHeader";
import QuestionFooter from "@/components/QuestionsFooter";
import TextContentArea from "@/components/TestContentArea";
import { readingSingleQuestionData } from "@/features/reading/readingSlice";
import { AppUseDispatch, AppUseSelector } from "@/store/hook";
import { MultipleChoiceOptionsTypes } from "@/types/listening";
import { useParams } from 'next/navigation';
import { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useListState } from "@mantine/hooks";

const ReadingReOrderParagraphs = () => {

    const params = useParams<{id: string}>();
    const dispatch =  AppUseDispatch();
    const { isLoading, isError, SingleQuestion } = AppUseSelector(state => state.reading)
   const [dragList, setDragList] = useListState<MultipleChoiceOptionsTypes>();

    useEffect(() => {

        dispatch(readingSingleQuestionData({
            uri:  `/reading/re-order-paragraphs/${params.id}`,
        }))
    }, [params.id])

    useEffect(() => {
        setDragList.setState(SingleQuestion?.paragraphs)
    }, [SingleQuestion?.paragraphs])


    return !isLoading && (
      <main>
       <QuestionHeader countdown={70} />
        <div className="mt-20 w-full lg:max-w-6xl m-auto mb-[200px]">
            <h2 className="text-2xl">#{params.id} {SingleQuestion?.title}</h2>
            <div className="flex flex-1 w-full bg-[#f1f3f4] mt-5">
                 <audio className="w-[30%]" src={`https://s3.ap-southeast-2.amazonaws.com/lamedia21/ptedata/ptemedia/${SingleQuestion?.audioUrl}`} controls />
            </div>

               
                <span className="text-lg font-[500] m-2 mb-3 ">{SingleQuestion?.question}</span>
                 <DragDropContext
            onDragEnd={({ destination, source }) =>
                {
                 setDragList.reorder({ from: source.index, to: destination?.index || 0})
                }
            }
            >
            <Droppable droppableId="dnd-list" direction="vertical">
                {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}  className="flex flex-col">
                    {
                    dragList?.map((current: MultipleChoiceOptionsTypes, index: number) => {
                        return (
                            <Draggable key={current.id} index={index} draggableId={current.options}>
                                  {(provided, snapshot) => (
                                    <div  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                    <TextContentArea className="mt-5 shadow-sm border-2 border-dashed"  >
                                             <span >{current.options}</span>
                                        </TextContentArea>
                                    </div>
                                      
                                  )}
                            </Draggable>
                        )
                    })
                }
                 {provided.placeholder}
                </div>
                )}
            </Droppable>
            </DragDropContext>
                

        </div>
        <QuestionFooter currentPage={params.id} />
     </main>
    )
}

export default ReadingReOrderParagraphs;