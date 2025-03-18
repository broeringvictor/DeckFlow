﻿// Deleta um flashcard (endpoint DELETE: /api/FlashCards/{id})
import axiosInstanceDefault from "../axiosInstanceDefault.tsx";

export const deleteCategory = async (id: number): Promise<void> => {
    try {
        await axiosInstanceDefault.delete(`/api/Categories/${id}`);
    } catch (error) {
        console.error("Erro ao deletar flashCard:", error);
        throw error;
    }
};
export default deleteCategory;