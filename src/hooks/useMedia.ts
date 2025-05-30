import { useState, useEffect, FormEvent } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { useWords } from "./useWords";
import { Video } from "types/Video";

export function useMedia() {
  const { getWords, currentPage } = useWords();
  const { token } = useAuth();

  const [videos, setVideos] = useState<Video[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number | undefined>(0);
  const [currentPageVideos, setCurrentPageVideos] = useState(0);

  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const [selectedWordId, setSelectedWordId] = useState<number | undefined>(undefined)
  
  function goToPage(current: number) {
    setCurrentPageVideos(current);
  }

  async function getVideo(id: number | undefined) {
    try {
      const response = await fetch(`http://localhost:8080/api/gifs/word/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      setCurrentVideo(data);
      await getVideos(currentPageVideos, 10)
    } catch (error) {
      console.error("Error al obtener video:", error);
    }
  }

  async function getVideos(pageIndex: number = 0, pageSize: number) {
    try {
      const res = await fetch(`http://localhost:8080/api/gifs/?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("No se pudieron obtener los videos");

      const data = await res.json();
      setTotalPages(data.totalPages);
      setVideos(data.content);
    } catch (error) {
      console.error("Error al obtener videos:", error);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file || !selectedWordId) {
      alert("Error: faltan datos");
      return;
    }

    const data = new FormData();
    data.append("file", file);

    await sendFile(selectedWordId, data);

    toast.success("Video guardado correctamente");
    setFile(null);
    getVideos(currentPageVideos, 10);
  }

  async function handleUpdate(e: FormEvent<HTMLFormElement>, onCloseEditModal: () => void) {
    e.preventDefault();

    if (!file || !selectedWordId) {
      alert("Error: faltan datos");
      return;
    }

    const data = new FormData();
    data.append("file", file);

    try {
      await updateFile(selectedWordId, data);
      await getVideo(selectedWordId);

      toast.success("Video actualizado correctamente");
      onCloseEditModal();
    } catch (error) {
      toast.error("Hubo un error al actualizar");
    }

    setFile(null);
  }

  async function sendFile(id: number, data: FormData) {
    const res = await fetch(`http://localhost:8080/api/words/${id}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    });

    if (!res.ok) throw new Error("Ocurrió un error al subir el video");
  }

  async function updateFile(id: number, data: FormData) {
    const res = await fetch(`http://localhost:8080/api/words/${id}/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    });

    if (!res.ok) throw new Error("Ocurrió un error al actualizar el video");
  }

  function handleInput(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;

    console.log(value);
    
    const video = videos.find((v) => v.word.id === Number(value));

    if (video) {
      setCurrentVideo(video);
      setSelectedWordId(video.word.id)
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files;
    if (file) {
      setFile(file[0]);
    }
  }

  useEffect(() => {
    setSelectedWordId(currentVideo?.word.id)
  }, [currentVideo])

  useEffect(() => {
    getWords(currentPage, 100);
  }, []);

  useEffect(() => {
    getVideos(currentPageVideos, 10);
  }, [token, currentPageVideos]);

  return {
    handleFile,
    handleInput,
    handleSubmit,
    handleUpdate,
    getVideo,
    currentVideo,
    videos,
    totalPages,
    goToPage,
    currentPageVideos,
    setCurrentVideo,
    selectedWordId
  };
}
