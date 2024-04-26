export interface BaseListetningApiTypes {
    id: number; 
    questionName: string;
    title: string; 
    audioUrl: string; 
    audioScript: string; 
    answer: string; 
    complexity: number; 
    createdAt: Date; 
    updatedAt: Date; 
    question?: string;
    options?: any
}

export interface MultipleChoiceOptionsTypes {
    id: string;
    index: number;
    correct: number;
    options: string;
    created_at: Date;
    updated_at: Date;
    question_id: number;
}

export interface ListeningSummarizeSpokenTextTypes extends BaseListetningApiTypes { 

}

export interface MultipleChoiceMultipleAnswers  extends BaseListetningApiTypes  {
    question: string;
    options: MultipleChoiceOptionsTypes[];
}