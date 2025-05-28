import { useMedia } from "../hooks/useMedia";
import { useWords } from "../hooks/useWords";

const EditMedia = () => {

  const { words } = useWords();
  const { handleUpdate, handleInput, handleFile, video } = useMedia()

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mt-10 max-w-3xl mx-auto border border-gray-300">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Editar Video
      </h1>

      {/* Vista previa del video */}
      <div className="mb-6 text-center">
        <label className="block text-center text-gray-700 font-semibold mb-3" htmlFor="video">
          Seña actual
        </label>

        {video?.giffUrl && (
          <video
            autoPlay
            loop
            muted
            className="rounded-lg w-60 h-auto mx-auto border border-gray-300 shadow"
          >
            <source src={`${video?.giffUrl}?t=${new Date().getTime()}`} type="video/mp4" />
            Tu navegador no soporta video.
          </video>
        )}

        {video?.word?.word && (
          <p className="mt-3 text-gray-600">
            <span className="font-semibold">Significado:</span> {video.word.word}
          </p>
        )}
      </div>

      {/* Formulario */}

      <form onSubmit={handleUpdate} className="space-y-6">

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
        <input
          onChange={handleFile}
          type="file"
          name="video"
          accept="video/*"
          className="mt-4 block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700 transition"
        />

        {/* Botón de guardar */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>

  );
}

export default EditMedia;