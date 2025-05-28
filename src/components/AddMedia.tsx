import { useWords } from "../hooks/useWords";
import { useMedia } from "../hooks/useMedia";

const AddMedia = () => {

  const { words } = useWords();
  const {handleSubmit, handleInput, handleFile} = useMedia()

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8 max-w-2xl mx-auto border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Subir video para una palabra
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Selector de palabra */}
        <div>
          <label htmlFor="word" className="block text-gray-700 font-medium mb-2">
            Palabra
          </label>
          <select
            onChange={handleInput}
            name="wordId"
            id="word"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Seleccione una palabra</option>
            {words.map((v) => (
              <option key={v.id} value={v.id}>
                {v.word}
              </option>
            ))}
          </select>
        </div>

        {/* Input para archivo de video */}
        <div>
          <label htmlFor="video" className="block text-gray-700 font-medium mb-2">
            Video
          </label>
          <input
            onChange={handleFile}
            type="file"
            name="video"
            accept="video/*"
            className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
          />
        </div>

        {/* Botón enviar */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
          >
            Subir video
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedia;
