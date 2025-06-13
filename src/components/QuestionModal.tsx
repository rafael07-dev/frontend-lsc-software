import { Question } from "types/Question";

interface QuestionModalProps {
    isVisible: boolean,
    currentQuestion: Question | null,
    closeModal: () => void
}

const QuestionModal = ({ isVisible, currentQuestion, closeModal }: QuestionModalProps) => {

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-lg relative">
                <h2 className="text-xl font-bold mb-4">Editar Pregunta</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium">Título</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Contenido</label>
                        <textarea
                            className="w-full border rounded p-2"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">URL del Medio</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Tipo de Medio</label>
                        <select
                            className="w-full border rounded p-2"
                            value={mediaType}
                            onChange={(e) => setMediaType(e.target.value)}
                        >
                            <option value="image">Imagen</option>
                            <option value="video">Video</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Respuestas</label>
                        <div className="space-y-2">
                            {answers.map((answer, index) => (
                                <div
                                    key={answer.id}
                                    className="flex items-center gap-2 bg-gray-100 p-2 rounded"
                                >
                                    <input
                                        type="text"
                                        value={answer.content}
                                        onChange={(e) => {
                                            const newAnswers = [...answers];
                                            newAnswers[index].content = e.target.value;
                                            setAnswers(newAnswers);
                                        }}
                                        className="flex-1 border rounded p-1"
                                    />
                                    <label className="flex items-center text-sm gap-1">
                                        <input
                                            type="checkbox"
                                            checked={answer.correct}
                                            onChange={(e) => {
                                                const newAnswers = [...answers];
                                                newAnswers[index].correct = e.target.checked;
                                                setAnswers(newAnswers);
                                            }}
                                        />
                                        Correcta
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                            onClick={closeModal}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QuestionModal;