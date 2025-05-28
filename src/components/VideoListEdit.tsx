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

interface VideoListProps {
    videos: Video[]
}

const VideoListEdit = ({ videos }: VideoListProps) => {
    return (
        <>
            {videos.length === 0 ? (
                <p className="text-gray-500 text-center">No hay videos disponibles.</p>
            ) : (
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {videos.map((v) => (
                        <li
                            key={v.id}
                            className="bg-white rounded-xl shadow p-2 border border-gray-200 hover:shadow-lg transition flex flex-col gap-1 w-full min-h-[200px]"
                        >
                            <video
                                autoPlay
                                muted
                                className="rounded-md w-full h-32 object-cover"
                            >
                                <source
                                    src={`http://localhost:8080${v.giffUrl}`}
                                    type="video/mp4"
                                />
                                Tu navegador no soporta video
                            </video>
                            <h2 className="font-semibold text-gray-700 text-sm truncate"><span className="text-gray-500"></span> {v.word?.word}</h2>
                        </li>
                    ))}
                </ul>
            )}

        </>
    )
}

export default VideoListEdit;