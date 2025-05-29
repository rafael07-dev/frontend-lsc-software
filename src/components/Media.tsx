import { Outlet, useMatch } from "react-router-dom";
import Pagination from "./Pagination";
import { useMedia } from "../hooks/useMedia";
import VideoList from "./VideoList";
import { useState } from "react";
import EditMediaModal from "./EditMediaModal";
import AddMediaModal from "./AddMediaModal";

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

    const { videos, totalPages, goToPage, currentPageVideos } = useMedia()
    const isAdding = useMatch("/admin/media/add")
    const isEditing = useMatch("/admin/media/edit/:id")
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showAddModal, setShowAddModal] = useState<boolean>(false)
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null)

    function onCloseEditModal() {
        setShowEditModal(false)
    }

    function handleEditModal(v: Video) {
        setCurrentVideo(v)
        setShowEditModal(true)
    }

    function onCloseAddModal() {
        setShowAddModal(false)
    }

    function handleAddModal() {
        setShowAddModal(true)
    }

    if (isAdding || isEditing) {
        return <Outlet />;
    }

    return (
        <div>

            <div className="flex justify-start mb-4">
                <button 
                    onClick={handleAddModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm"
                >
                    Agregar seña
                </button>
            </div>
            <AddMediaModal
                isVisible={showAddModal}
                onClose={onCloseAddModal} 
            />
            <EditMediaModal 
                isVisible={showEditModal} 
                video={currentVideo} 
                onClose={onCloseEditModal}
            />
            <VideoList videos={videos} currentVideo={handleEditModal}/>
            <Pagination pages={totalPages} currentPage={currentPageVideos} goToPage={goToPage}/>
        </div>
    );
}

export default Media;