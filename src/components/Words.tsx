import { useState } from "react";
import AddWord from "./AddWord";
import EditWord from "./EditWord";
import { useWords } from "../hooks/useWords";

export interface Word {
    id: number;
    word: string;
    letter: {
        id: number;
        letter: string;
    };
}

const Words = () => {
    const [showAddModal, setShowAddModal] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [currentWord, setCurrentWord] = useState<Word | null>(null)
    const {getWords, words, deleteWord} = useWords();

    function onShowAddModal() {
        setShowAddModal(true)
    }

    function handleEditModal(word: Word) {
        setCurrentWord(word)
        setShowEditModal(true)
    }

    function onCloseAddModal() {
        setShowAddModal(false)
    }

    function onCloseEditModal() {
        setShowEditModal(false)
        setCurrentWord(null)
        getWords()
    }

    return (
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-4">
                Palabras disponibles
            </h1>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md
               transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={onShowAddModal}
                >
                    Agregar palabra
                </button>
            </div>

            {/* modal to add word*/}
            <AddWord visible={showAddModal} onClose={onCloseAddModal} />
            {
                currentWord && (

                    <EditWord 
                        visible={showEditModal} 
                        onClose={onCloseEditModal} 
                        currentWord={currentWord}
                    />
                )
            }

            {words.length === 0 ? (
                <p className="text-center text-gray-500">No hay palabras disponibles.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {words.map(
                        (w) =>
                            w &&
                            w.letter && (
                                <div
                                    key={w.id}
                                    className="bg-gray-100 rounded-md p-3 text-sm shadow hover:shadow-md transition duration-200"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <h2 className="font-semibold text-gray-700 truncate">{w.word}</h2>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => handleEditModal(w)}
                                                className="bg-blue-200 text-blue-700 px-2 py-0.5 rounded hover:bg-blue-300 transition text-xs"
                                                type="button"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => deleteWord(w.id)}
                                                className="bg-red-200 text-red-700 px-2 py-0.5 rounded hover:bg-red-300 transition text-xs"
                                                type="button"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-xs">
                                        Letra: <span className="font-medium">{w.letter.letter}</span>
                                    </p>
                                </div>
                            )
                    )}
                </div>
            )}
        </div>
    );
};

export default Words;
