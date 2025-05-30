import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

interface Word {
    id: number;
    word: string;
    letter: {
        id: number;
        letter: string;
    };
}

interface WordRequest {
    word: string;
    letter_id: number;
}

export function useWords() {
    const [words, setWords] = useState<Word[]>([]);
    const [totalPages, setTotalPages] = useState<number | undefined>()
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(20)
    const { token } = useAuth()

    async function getWords(pageIndex: number, pageSize: number) {
        const URL: string = `http://localhost:8080/api/words/?pageIndex=${pageIndex}&pageSize=${pageSize}`;
        try {
            const res = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("No se pudo obtener las palabras");
            }

            const data = await res.json();
            setWords(data.content);
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error("Error al obtener palabras:", error);
        }
    }

    async function deleteWord(id: number) {
        const url = `http://localhost:8080/api/words/delete/${id}`;
        try {
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!res.ok) {
                throw new Error("No se pudo eliminar la palabra");
            }

            getWords(currentPage, pageSize)
            toast.success("Palabra eliminada correctamente")

        } catch (error) {
            console.error("Error al eliminar palabra:", error);
        }
    }

    async function updateWord(word: WordRequest, id: number) {

        try {

            const URL = `http://localhost:8080/api/words/update/${id}`;

            if (!word) {
                return;
            }

            const res = await fetch(URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(word)
            });

            if (!res.ok) {
                throw new Error("No se pudo crear la palabra")
            }

        } catch (error) {
            console.log(error);

        }
    }

    async function createWord(word: WordRequest) {

        try {

            const URL = "http://localhost:8080/api/words/create"

            if (!word) {
                return;
            }

            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(word)
            });

            if (!res.ok) {
                throw new Error("No se pudo crear la palabra")
            }

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (!token) return;

        getWords(currentPage, pageSize);
    }, [token, currentPage]);

    return { words, getWords, deleteWord, updateWord, createWord, 
                            totalPages, currentPage, setCurrentPage, pageSize }
}