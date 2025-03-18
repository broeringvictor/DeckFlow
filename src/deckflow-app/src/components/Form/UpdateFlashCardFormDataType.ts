export type UpdateFlashCardFormDataType = {
    question: string;
    answer: string;
    incorrectAnswerA: string;
    incorrectAnswerB: string;
    incorrectAnswerC: string;
    incorrectAnswerD: string;
    cardImage: string | undefined; 
    categoryId: number;
    rating: number;

};