import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useWords } from "../hooks/useWords";
import { toast } from "react-toastify";

interface Word {
    word: string;
    letter_id: number;
}

interface Letter {
    id: number;
    letter: string;
}

interface AddWordProps {
    visible: boolean;
    onClose: () => void
}

const AddWord = ({ visible, onClose }: AddWordProps) => {

    const [word, setWord] = useState<Word>({
        word: "",
        letter_id: 0
    })

    const [letters, setLetters] = useState<Letter[]>([])
    const {createWord} = useWords()
    const { token } = useAuth();

    useEffect(() => {

        async function getLetters() {

            try {
                const response = await fetch("http://localhost:8080/api/letters/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error("No se pudo obetener las letras")
                }

                const data = await response.json();

                setLetters(data)

            } catch (error) {
                console.log(error);

            }
        }

        getLetters()
    }, [])


    function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        console.log(e);

        const { name, value } = e.target;

        setWord((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const wordSent = {
            word: word.word,
            letter_id: word.letter_id
        }

        await createWord(wordSent);
        setWord({
            word: "",
            letter_id: 0
        })
        onClose();

        toast.success("Palabra agregada correctamente")
    }

    if (!visible) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fade-in">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Agregar palabra</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Palabra</label>
                        <input
                            type="text"
                            name="word"
                            value={word.word}
                            onChange={handleInput}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Letra</label>
                        <select
                            name="letter_id"
                            value={word.letter_id}
                            onChange={handleInput}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Selecciona una letra</option>
                            {letters.map((l) => (
                                <option key={l.id} value={l.id}>
                                    {l.letter}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddWord;