import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Question from "./Question";

const Quiz = () => {
    const [questions, setQuestions] = useState([])
    const {token} = useAuth()

    useEffect(() => {
        const fetchQuestions = async () => {

            console.log(token);
            
            
            const response = await fetch("http://localhost:8080/api/questions", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error("question not found")
            }
    
            const data = await response.json();
    
            setQuestions(data)
        }

        fetchQuestions()
    }, [token])

    return(
        <div>
            <h2 className="text-2xl font-bold text-center text-blue-800 mt-2">Sección Quiz</h2>
            <h3 className="text-center text-gay-400 mt-2">Acontinuacion encontrará una serie de preguntas basadas en el diccionario, las cuales debe responder para obtener un puntaje al final</h3>
            {questions.length > 0 ? (
                <ul>
                    {questions.map((q) => (
                        <Question key={q.id} question={q}/>
                    ))}
                </ul>
            ) : (
                <p>No hay preguntas disponibles.</p>
            )}
        </div>
    )
}

export default Quiz;