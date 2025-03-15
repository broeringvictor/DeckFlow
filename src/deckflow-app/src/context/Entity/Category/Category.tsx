export class Category {
    id: number;
    title: string;
    description: string;

    constructor(data: Partial<Category>) {
        this.id = data.id ?? 0;
        this.title = data.title ?? "";
        this.description = data.description ?? "";
    }

    /**
     * Cria uma instância de Category a partir de um JSON
     */
    static fromJson(json: { id: number; title: string; description: string }): Category {
        return new Category({
            id: json.id,
            title: json.title,
            description: json.description,
        });
    }
}