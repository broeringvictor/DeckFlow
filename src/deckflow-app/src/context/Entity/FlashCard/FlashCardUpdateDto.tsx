// Crie (por exemplo, em um arquivo FlashCardTypes.tsx ou em um novo arquivo DTO)
export interface FlashCardUpdateDto {
    id: number;
    question: string;
    answer: string;
    incorrectAnswerA: string;
    incorrectAnswerB: string;
    incorrectAnswerC: string;
    incorrectAnswerD: string;
    cardImage?: string | null;
    categoryId: number;
}
