import {useState} from "react";
import {getDeepSeekInstance} from "../../api/deepSeekInstance.tsx";

const useIncorrectCreateAnswerDS = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([]);

    const generateAnswers = async (question: string, correctAnswer: string) => {
        setLoading(true);
        setError(null);

        try {
            const instance = await getDeepSeekInstance();
            const completion = await instance.chat.completions.create({
                    messages: [{
                        role: "system",
                        content: "You are an advanced study assistant specializing in question creation. Users will provide a question along with the correct answer. Your task is to analyze both and generate four plausible but incorrect answer choices at the level of a higher education exam. Format the response in the same language as the question using multiple-choice format:\n\nA. [Incorrect 1]\nB. [Incorrect 2]\nC. [Incorrect 3]\nD. [Incorrect 4]\nE. [Correct Answer]"
                }, {
                    role: "user",
                    content: `**Question:** ${question}\n**Correct Answer:** ${correctAnswer}`
                }],
                model: "deepseek-chat",
            });

            const result = completion?.choices?.[0]?.message?.content;
            if (!result) {
                throw new Error("No response from AI");
            }
            console.log(result);

            const answers = result.match(/[A-D]\.\s(.*?)(?=\n|$)/g)
                    ?.map(a => a.replace(/^[A-D]\.\s/, ''))
                ?? [];

            setIncorrectAnswers(answers);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to generate incorrect answers";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, incorrectAnswers, generateAnswers };
};

export default useIncorrectCreateAnswerDS;
