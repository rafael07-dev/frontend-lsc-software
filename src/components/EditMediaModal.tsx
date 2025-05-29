import { useMedia } from "../hooks/useMedia";
import { useWords } from "../hooks/useWords";

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

interface EditaModalProps {
  isVisible: boolean;
  onClose: () => void;
  video: Video | null;
}

const EditMediaModal = ({ isVisible, onClose, video }: EditaModalProps) => {
  const { words } = useWords();
  const { handleUpdate, handleInput, handleFile } = useMedia();

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

          {video?.giffUrl && (
            <video
              autoPlay
              loop
              muted
              className="rounded-lg w-56 h-auto mx-auto border border-gray-300 shadow"
            >
              <source src={`http://localhost:8080${video?.giffUrl}?t=${new Date().getTime()}`} type="video/mp4" />
              Tu navegador no soporta video.
            </video>
          )}

          {video?.word?.word && (
            <p className="text-gray-600">
              <span className="font-semibold">Significado:</span> {video.word.word}
            </p>
          )}
        </div>

        {/* Formulario */}
        <form onSubmit={handleUpdate} className="space-y-2">
          {/* Selector de palabra */}
          <div>
            <label htmlFor="word" className="block text-gray-700 font-medium mb-2">
              Cambiar palabra asociada
            </label>
            <select
              onChange={handleInput}
              value={video?.word.id}
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
              onClick={onClose}
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