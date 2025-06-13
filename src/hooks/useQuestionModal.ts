import { useState } from "react";
import { Question } from "types/Question";

export function useQuestionModal(){

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

    function handleOpenModal(question: Question) {
        setCurrentQuestion(question);
        setIsVisible(true)
    }

    function handleCloseModal() {
        setCurrentQuestion(null);
        setIsVisible(false)
    }

    return {
        isVisible,
        currentQuestion,
        handleOpenModal,
        handleCloseModal
    }
}