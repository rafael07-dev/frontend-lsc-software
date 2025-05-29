import { useWords } from "../hooks/useWords";
import { useMedia } from "../hooks/useMedia";

interface AddModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddMediaModal = ({ isVisible, onClose }: AddModalProps) => {
  const { words } = useWords();
  const { handleSubmit, handleInput, handleFile } = useMedia();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Agregar seña
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Selector de palabra */}
          <div>
            <label htmlFor="word" className="block text-gray-700 font-medium mb-2">
              Palabra asociada
            </label>
            <select
              onChange={handleInput}
              name="wordId"
              id="word"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label htmlFor="video" className="block text-gray-700 font-medium mb-2">
              Video (seña)
            </label>
            <input
              onChange={handleFile}
              type="file"
              name="video"
              accept="video/*"
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
            >
              Subir video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMediaModal;
