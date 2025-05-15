import { useState } from "react";

type Answer = {
    id: number;
    content: string;
    createdAt: string;
    correct: boolean;
};

type QuestionProps = {
    question: {
        id: number;
        title: string;
        content: string;
        mediaUrl: string;
        answers: Answer[];
    };
};

const Question = ({ question }: QuestionProps) => {

    if (!question) {
        return (
            <div className="text-center text-gray-500 mt-10">
                No hay pregunta disponible.
            </div>
        );
    }

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean>(false)

    const handleCorrectAnswer = (answerId: number): void => {
        setSelectedAnswer(answerId)
        const correctAnswer = question.answers.find(a => a.correct === true)?.id;

        if (correctAnswer === answerId) {
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
    };

    return (
        <div className="max-w-5xl mx-auto my-8 bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-400 grid grid-cols-1 md:grid-cols-2">
            {/* Sección de Pregunta y Video */}
            <div className="p-4 flex flex-col justify-center border-r border-gray-100">
                <h1 className="text-center font-bold text-gray-800 mb-2">{question.title}</h1>
                <p className="text-gray-600 text-center mb-5">{question.content}</p>

                {question.mediaUrl && (
                    <div className="flex justify-center">
                        <video
                            className="rounded-xl shadow-md max-w-full h-auto border border-gray-300"
                            width="280"
                            controls
                            autoPlay
                            loop
                            muted
                        >
                            <source src={`http://localhost:8080${question.mediaUrl}`} type="video/mp4" />
                            Tu navegador no soporta videos en HTML5.
                        </video>
                    </div>
                )}
            </div>

            {/* Sección de Respuestas */}
            <div className="p-6 flex flex-col justify-center bg-gray-50">
                <h3 className="text-center font-bold text-gray-800 mb-4">
                    Seleccione una respuesta:
                </h3>
                <ul className="space-y-3">
                    {question.answers?.map((a) => {
                        let bgClass = "bg-white hover:bg-blue-100 text-gray-700";

                        if (selectedAnswer === a.id) {
                            bgClass = isCorrect
                                ? (a.correct ? "bg-green-700 text-white" : "bg-red-700 text-white")
                                : (a.correct ? "bg-green-700 text-white" : "bg-red-700 text-white");
                        }

                        return (
                            <li
                                onClick={() => handleCorrectAnswer(a.id)}
                                key={a.id}
                                className={`p-3 border border-gray-300 rounded-lg font-medium shadow-sm cursor-pointer transition duration-200 ${bgClass}`}
                            >
                                {a.content}
                            </li>
                        );

                    })}
                </ul>
            </div>
        </div>
    );
};

export default Question;
