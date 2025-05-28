import { Link, Outlet, useMatch } from "react-router-dom";
import Pagination from "./Pagination";
import { useMedia } from "../hooks/useMedia";
import VideoList from "./VideoList";

const Media = () => {

    const { videos, totalPages, goToPage, currentPageVideos } = useMedia()
    const isAdding = useMatch("/admin/media/add")
    const isEditing = useMatch("/admin/media/edit/:id")

    if (isAdding || isEditing) {
        return <Outlet />;
    }

    return (
        <div>

            <div className="flex justify-start mb-4">
                <Link to="/admin/media/add" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm">
                    Agregar video
                </Link>
            </div>
            <VideoList videos={videos}/>
            <Pagination pages={totalPages} currentPage={currentPageVideos} goToPage={goToPage}/>
        </div>
    );
}

export default Media;