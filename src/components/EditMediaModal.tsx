import React from "react";
import { useWords } from "../hooks/useWords";
import { Video } from "types/Video";

interface EditaModalProps {
  isVisible: boolean;
  onCloseEditModal: () => void;
  currentVideo: Video | null;
  handleInput: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: (e: React.FormEvent<HTMLFormElement>, onCloseEditModal: () => void) => void;
  selectedWordId: number | undefined;
}

const EditMediaModal = ({ isVisible, onCloseEditModal, currentVideo, handleInput, handleUpdate, handleFile, selectedWordId }: EditaModalProps) => {

  const { words } = useWords();

  //console.log(selectedWordId);
  
  
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl border border-gray-200 relative">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Editar seña
        </h1>

        {/* Vista previa del video */}
        <div className="text-center">
          <label className="block text-gray-700 font-semibold" htmlFor="video">
            Seña actual
          </label>

          {currentVideo?.giffUrl && (
            <video
              autoPlay
              loop
              muted
              className="rounded-lg w-56 h-auto mx-auto border border-gray-300 shadow"
            >
              <source src={`http://localhost:8080${currentVideo?.giffUrl}?t=${new Date().getTime()}`} type="video/mp4" />
              Tu navegador no soporta video.
            </video>
          )}

          {currentVideo?.word?.word && (
            <p className="text-gray-600">
              <span className="font-semibold">Significado:</span> {currentVideo.word.word}
            </p>
          )}
        </div>

        {/* Formulario */}
        <form onSubmit={(e) => handleUpdate(e, onCloseEditModal)} className="space-y-2">
          {/* Selector de palabra */}
          <div>
            <label htmlFor="word" className="block text-gray-700 font-medium mb-2">
              Cambiar palabra asociada
            </label>
            <select
              onChange={(e) => handleInput(e)}
              value={selectedWordId ?? ""}
              name="wordId"
              id="word"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Seleccione una palabra</option>
              {words.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.word}
                </option>
              ))}
            </select>
          </div>

          {/* Input de archivo */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Subir nuevo video
            </label>
            <input
              onChange={handleFile}
              type="file"
              name="video"
              accept="video/*"
              className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCloseEditModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMediaModal;