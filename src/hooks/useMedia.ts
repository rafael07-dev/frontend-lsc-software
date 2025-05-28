import { useState } from "react"
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { useWords } from "./useWords";
import { FormEvent, useEffect } from "react";
import { useParams } from "react-router-dom";


interface Video {
    id: number;
    giffUrl: string;
    word: {
        id: number;
        word: string;
        letter: {
            id: number;
            letter: string;
        }
    }
}

export function useMedia() {

    const { id } = useParams()
    const { getWords, currentPage } = useWords();
    const [currentPageVideos, setCurrentPageVideos] = useState(0);
    const [videos, setVideos] = useState<Video[]>([]);
    const [totalPages, setTotalPages] = useState<number | undefined>(0)
    const [selectedWordId, setSelectedWordId] = useState<number | null>(Number(id));
    const [file, setFile] = useState<File | null>(null)
    const [video, setVideo] = useState<Video | null>(null)
    const videoId = Number(id);
    const { token } = useAuth()

    function goToPage(current: number) {
        setCurrentPageVideos(current)
    }

    console.log(selectedWordId);


    async function getVideo() {
        try {
            const response = await fetch(`http://localhost:8080/api/gifs/word/${videoId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json()

            // Forzar que React vea el cambio
            setVideo(null); // limpiamos primero
            setTimeout(() => {
                setVideo(data); // luego seteamos el nuevo valor
            }, 50); // un pequeño delay para asegurar el render

            //setVideo(data)

        } catch (error) {
            console.log(error);

        }
    }

    async function getVideos(pageIndex: number = 0, pageSize: number) {
        const URL: string = `http://localhost:8080/api/gifs/?pageIndex=${pageIndex}&pageSize=${pageSize}`;

        const res = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        if (!res.ok) {
            throw new Error("No se pudieron obtener los videos");
        }

        const data = await res.json()

        setTotalPages(data.totalPages)
        setVideos(data.content)
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!file || !selectedWordId) {
            alert("Error")
            return;
        }

        const data = new FormData();
        data.append("file", file)

        console.log(file);


        await sendFile(selectedWordId, data)

        toast.success("Video gurdado correctamente");
        setFile(null)
        setSelectedWordId(null)
    }

    async function handleUpdate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!file || !selectedWordId) {
            alert("Error")
            return;
        }

        const data = new FormData();
        data.append("file", file)

        console.log(file);

        try {

            await updateFile(selectedWordId, data)

            await getVideo()
            toast.success("Video gurdado correctamente");
        } catch (error) {
            toast.error("Hubo un error")
        }

        setFile(null)
        setSelectedWordId(null)
    }

    async function sendFile(id: number | null, data: FormData) {
        if (!id || !data) {
            return;
        }
        const response = await fetch(`http://localhost:8080/api/words/${id}/upload`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: data
        });

        if (!response.ok) {
            throw new Error("ocurrio un error");
        }
    }

    async function updateFile(id: number | null, data: FormData) {
        if (!id || !data) {
            return;
        }
        const response = await fetch(`http://localhost:8080/api/words/${id}/update`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: data
        });

        if (!response.ok) {
            throw new Error("ocurrio un error");
        }
    }

    function handleInput(e: React.ChangeEvent<HTMLSelectElement>) {

        console.log(e.target.value);

        setSelectedWordId(Number(e.target.value))
    }

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files

        console.log(file);


        if (file) {
            setFile(file[0])
        }
    }

    useEffect(() => {
        getWords(currentPage, 100);
        if (videoId) {
            getVideo()
        }
    }, []);

    useEffect(() => {
        getVideos(currentPageVideos, 10)
    }, [token, currentPageVideos]);

    return { handleFile, handleInput, handleSubmit, handleUpdate, getVideo, video, videos, setVideo, totalPages, goToPage, currentPageVideos }
}