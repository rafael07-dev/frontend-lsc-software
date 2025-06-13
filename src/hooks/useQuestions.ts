import { useEffect, useState } from "react";
import { deleteQuestions, getQuestions } from "../service/questionService";
import { useAuth } from "./useAuth";
import { Question } from "types/Question";

export function useQuestions () {

    const { token } = useAuth();
    const [questions, setQuestions] = useState<Question[]>()

    async function loadQuestions() {
        const data = await getQuestions(token)

        setQuestions(data);
    }

    async function handleDeleteQuestion(id: number) {
        await deleteQuestions(id, token);
    }

    useEffect(() => {
        loadQuestions()
    }, [token])

    useEffect(() => {
        loadQuestions()
    }, [questions])

    return {
        questions,
        handleDeleteQuestion
    }
}