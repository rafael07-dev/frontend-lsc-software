import { useQuestions } from "../hooks/useQuestions";
import { PencilIcon, TrashIcon } from "lucide-react";
import QuestionModal from "./QuestionModal";
import { useQuestionModal } from "../hooks/useQuestionModal";

const Questions = () => {

  const { questions, handleDeleteQuestion } = useQuestions();
  const { isVisible, currentQuestion, handleOpenModal, handleCloseModal } = useQuestionModal();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Preguntas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions?.map((q) => (
          <div
            key={q.id}
            className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 relative"
          >
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => handleOpenModal(q)}
                className="p-1 text-blue-600 hover:text-blue-800"
                title="Editar"
              >
                <PencilIcon size={18} />
              </button>
              <button
                onClick={() => handleDeleteQuestion(q.id)}
                className="p-1 text-red-600 hover:text-red-800"
                title="Eliminar"
              >
                <TrashIcon size={18} />
              </button>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {q.title}
            </h2>
            <p className="text-gray-600 mb-2">{q.content}</p>

            {q.mediaType === "image" && (
              <img
                src={q.mediaUrl}
                alt="media"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            )}

            {q.mediaType === "video" && (
              <video
                controls
                src={q.mediaUrl}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            )}

            <div className="mt-4">
              <p className="font-semibold text-sm text-gray-700 mb-1">
                Respuestas:
              </p>
              <ul className="space-y-1">
                {q.answers.map((answer) => (
                  <li
                    key={answer.id}
                    className={`p-2 rounded-md text-sm ${
                      answer.correct
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {answer.content}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Creado el: {new Date(q.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <QuestionModal isVisible={isVisible} closeModal={handleCloseModal} currentQuestion={currentQuestion}/>
    </div>
  );
};

export default Questions;