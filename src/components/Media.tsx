import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

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

const Media = () => {

    const location = useLocation();

    const isInSubroute = location.pathname !== "/admin/media"

    const [videos, setVideos] = useState<Video[]>([]);
    const { token } = useAuth()

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

        setVideos(data.content)
    }

    useEffect(() => {
        getVideos(0, 10)
    }, [token]);

    if (isInSubroute) {
        return <Outlet/>;
    }

    return (
        <div className="p-6">

            <div className="flex justify-end mb-4">
                <Link to="/admin/media/add">
                    Agregar video
                </Link>
            </div>

            {videos.length === 0 ? (
                <p className="text-gray-500 text-center">No hay videos disponibles.</p>
            ) : (
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {videos.map((v) => (
                        <li
                            key={v.id}
                            className="bg-white rounded-xl shadow p-3 border border-gray-200 hover:shadow-lg transition"
                        >
                            <video
                                width="100%"
                                height="auto"
                                controls
                                className="rounded mb-3 max-h-52 object-contain"
                            >
                                <source
                                    src={`http://localhost:8080${v.giffUrl}`}
                                    type="video/mp4"
                                />
                                Tu navegador no soporta video
                            </video>
                            <h2 className="font-semibold text-gray-800 mb-2 truncate">{v.word?.word}</h2>
                            <div className="flex gap-2">
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded text-sm">
                                    Editar
                                </button>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm">
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Media;