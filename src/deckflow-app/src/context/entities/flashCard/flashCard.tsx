export class FlashCard {
    id: number;
    question: string;
    answer: string;
    incorrectAnswerA: string;
    incorrectAnswerB: string;
    incorrectAnswerC: string;
    incorrectAnswerD: string;
    cardImage?: string | null;
    createDate: Date;
    lastUpdateDate: Date;
    rating: number;
    categoryId: number;

    // Construtor para leitura/atualização
    constructor(data: Partial<FlashCard>) {
        this.id = data.id ?? 0;
        this.question = data.question ?? "";
        this.answer = data.answer ?? "";
        this.incorrectAnswerA = data.incorrectAnswerA ?? "";
        this.incorrectAnswerB = data.incorrectAnswerB ?? "";
        this.incorrectAnswerC = data.incorrectAnswerC ?? "";
        this.incorrectAnswerD = data.incorrectAnswerD ?? "";
        this.cardImage = data.cardImage;
        this.createDate = data.createDate ? new Date(data.createDate) : new Date();
        this.lastUpdateDate = data.lastUpdateDate ? new Date(data.lastUpdateDate) : new Date();
        this.rating = data.rating ?? 0;
        this.categoryId = data.categoryId ?? 0;
    }

    // Função estática para criação de novo flashCard
    static create(data: Partial<FlashCard>): FlashCard {
        return new FlashCard({
            question: data.question ?? "",
            answer: data.answer ?? "",
            incorrectAnswerA: data.incorrectAnswerA ?? "",
            incorrectAnswerB: data.incorrectAnswerB ?? "",
            incorrectAnswerC: data.incorrectAnswerC ?? "",
            incorrectAnswerD: data.incorrectAnswerD ?? "",
            cardImage: data.cardImage,
            categoryId: data.categoryId ?? 2, // Define 2 como valor default para criação
        });
    }

    /**
     * Cria uma instância de flashCard a partir de um JSON
     */
    static fromJson(json: unknown): FlashCard {
        if (typeof json !== "object" || json === null) {
            throw new Error("Invalid JSON format for flashCard");
        }

        const data = json as Record<string, unknown>;

        return new FlashCard({
            id: typeof data.id === "number" ? data.id : 0,
            question: typeof data.question === "string" ? data.question : "",
            answer: typeof data.answer === "string" ? data.answer : "",
            incorrectAnswerA: typeof data.incorrectAnswerA === "string" ? data.incorrectAnswerA : "",
            incorrectAnswerB: typeof data.incorrectAnswerB === "string" ? data.incorrectAnswerB : "",
            incorrectAnswerC: typeof data.incorrectAnswerC === "string" ? data.incorrectAnswerC : "",
            incorrectAnswerD: typeof data.incorrectAnswerD === "string" ? data.incorrectAnswerD : "",
            cardImage: typeof data.cardImage === "string" ? data.cardImage : undefined,
            createDate: typeof data.createDate === "string" ? new Date(data.createDate) : new Date(),
            lastUpdateDate: typeof data.lastUpdateDate === "string" ? new Date(data.lastUpdateDate) : new Date(),
            rating: typeof data.rating === "number" ? data.rating : 0,
            categoryId: typeof data.categoryId === "number" ? data.categoryId : 0,
        });
    }
}