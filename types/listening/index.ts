export interface BaseApiTypes {
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
    options?: any;
     paragraphs?: any
     summaries?: any
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


export interface ApiSubmitResponseTypes {
    "id": number;
    "userId": number;
    "questionId": number;
    "answers": string[];
    "score": number;
    "createdAt": number;
"updatedAt": number;
}

export interface ListeningSummarizeSpokenText extends BaseApiTypes { 

}

export interface MultipleChoiceMultipleAnswers  extends BaseApiTypes  {
    question: string;
    options: MultipleChoiceOptionsTypes[];
}