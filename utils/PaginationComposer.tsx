
const QUESTION_PER_PAGE = 12;



export const PaginationComposer = (QuestionsList: any, params: { type: string, page: string }, MapQuestionsTypesToUrl: any): {
    pages: number, 
    start: number, 
    end: number
}  => {
        const questions = QuestionsList?.[MapQuestionsTypesToUrl[params.type]["name"]];
        const totalQuestionsList = questions?.length;
        const totalPages =  Math.ceil((totalQuestionsList ? totalQuestionsList / 12 : 0))
        return {
          pages:  totalPages, 
          start: Number(params.page) * QUESTION_PER_PAGE - QUESTION_PER_PAGE,
          end: Number(params.page) * QUESTION_PER_PAGE
         }
   }