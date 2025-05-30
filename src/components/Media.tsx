import Pagination from "./Pagination";
import { useMedia } from "../hooks/useMedia";
import VideoList from "./VideoList";
import { useState } from "react";
import EditMediaModal from "./EditMediaModal";
import AddMediaModal from "./AddMediaModal";
import { Video } from "types/Video";

const Media = () => {

    const { 
        videos, 
        totalPages, 
        goToPage, 
        currentPageVideos, 
        currentVideo, 
        setCurrentVideo, 
        handleUpdate, 
        handleInput, 
        handleFile,
        selectedWordId
    } = useMedia()

    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [showAddModal, setShowAddModal] = useState<boolean>(false)

    function onCloseEditModal() {
        setShowEditModal(false)
        setCurrentVideo(null)
    }

    function handleEditModal(video: Video) {
        setCurrentVideo(video)
        setShowEditModal(true)
    }

    function onCloseAddModal() {
        setShowAddModal(false)
    }

    function handleAddModal() {
        setShowAddModal(true)
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
                currentVideo={currentVideo}
                handleInput={handleInput}
                handleUpdate={handleUpdate}
                selectedWordId={selectedWordId}
                handleFile={handleFile} 
                onCloseEditModal={onCloseEditModal}
            />
            <VideoList videos={videos} onEdit={handleEditModal}/>
            <Pagination pages={totalPages} currentPage={currentPageVideos} goToPage={goToPage}/>
        </div>
    );
}

export default Media;