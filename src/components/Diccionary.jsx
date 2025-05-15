import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Diccionary = () => {

    const [selectedLetter, setSelectedLetter] = useState(null)
    const [selectedWord, setSelectedWord] = useState(null)
    const [words, setWords] = useState([])
    const [letters, setLetters] = useState([])
    const [giffUrl, setGiffUrl] = useState(null)
    const { token } = useAuth();

    console.log(giffUrl)

    const fetchWords = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/words/?letter=${selectedLetter}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}`)
            }

            const data = await response.json();

            console.log(data);

            setWords(data);
            setSelectedWord(null);
            setGiffUrl(null)

        } catch (err) {
            console.log(err);
        }
    }

    const fetchLetters = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/letters/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error(`Error ${response.status}`)
            }

            const data = await response.json()
            setLetters(data)
            console.log(data);

            setSelectedLetter(null)
            setGiffUrl(null)

        } catch (err) {
            console.log(err);
        }
    }

    const fetchGif = async (wordId) => {

        try {
            const response = await fetch(`http://localhost:8080/api/gifs/word/${wordId}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            const res = await response.json();

            console.log(res);


            setGiffUrl(res.giffUrl)
            //console.log(giffUrl);
            setSelectedWord(null)

        } catch (err) {
            console.log(err);
        }
    }

    async function handleGiff(id) {
        await fetchGif(id)
    }

    useEffect(() => {

        fetchLetters()
    }, [])

    useEffect(() => {
        if (selectedLetter) {

            fetchWords()
        }
    }, [selectedLetter, selectedWord])

    return (
        <main className="min-h-screen bg-white mt-4">
            <h1 className="text-3xl font-bold text-center text-blue-800 mb-1">Diccionario en lengua de señas</h1>
            <h4 className="font-bold text-center text-gray-600 mb-4">Seleccione una letra y posteriormente una palabra para ver el lenguaje de señas</h4>
            <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_2fr] gap-1 max-w-4xl mx-auto">
                {/* Sección Letras */}
                <div className="w-fit bg-white shadow-md rounded-xl p-4 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-3">Letras</h2>
                    <ul className="space-y-2 text-gray-600">
                        {
                            letters.map((l) => (
                                <li key={l.id} onClick={() => setSelectedLetter(l.letter)} className="hover:text-blue-700 cursor-pointer text-center text-gray-600 font-semibold">{l.letter}</li>
                            ))
                        }
                    </ul>
                </div>

                {/* Sección Palabras */}
                <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
                    <h2 className="text-xl text-center font-semibold text-gray-700 mb-3">Palabras</h2>
                    <ul className="space-y-2 text-gray-600">
                        {
                            words.map((w) => (
                                <li key={w.id} onClick={() => handleGiff(w.id)} className="hover:text-blue-700 cursor-pointer text-gray-600 font-semibold">{w.word}</li>
                            ))
                        }
                    </ul>
                </div>

                {/* Sección GIFs */}
                <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
                    <h2 className="text-xl text-center font-semibold text-gray-700 mb-3">GIFs para la palabra seleccionada</h2>
                    <div className="space-y-3">
                        {
                            <video className="rounded-lg" src={giffUrl} width="320" height="240" autoPlay loop muted playsInline>
                                <source type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Diccionary;