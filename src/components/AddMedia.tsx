import { FormEvent, useEffect, useState } from "react";
import { useWords } from "../hooks/useWords";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const AddMedia = () => {
  const { words, getWords } = useWords();
  const { token } = useAuth()
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    getWords();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file || !selectedWordId) {
      return;
    }

    const data = new FormData();
    data.append("file", file)

    await sendFile(selectedWordId, data)

    toast.success("Video gurdado correctamente");
    setFile(null)
    setSelectedWordId(null)
  }

  async function sendFile(id: number | null, data: FormData) {
    if (!id || !data) {
      return;
    }
    const response = await fetch(`http://localhost:8080/api/words/${id}/upload`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: data
    });

    if (!response.ok) {
      throw new Error("ocurrio un error");
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedWordId(Number(e.target.value))
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files

    if (file) {
      setFile(file[0])
    }
  }

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
