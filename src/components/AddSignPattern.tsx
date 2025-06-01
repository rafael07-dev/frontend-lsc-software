import { useEffect, useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Hands, Results } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import { useAuth } from "../hooks/useAuth";
import { Landmark, normalizeLandmarks } from "./HandSignPractice";

type SignPattern = {
    id: number;
    word: string;
    sequence: number[][][]; // [frame][landmark][x,y,z]
};

const MAX_FRAMES = 60; // Límite de frames a capturar
const FRAME_RATE = 5; // Frames por segundo a capturar (evita sobrecarga)

const AddSignPattern = () => {
    const { token } = useAuth();
    const webcamRef = useRef<Webcam>(null);
    const [word, setWord] = useState("");
    const [recording, setRecording] = useState(false);
    const [frames, setFrames] = useState<Landmark[][]>([]);
    const [signPatterns, setSignPatterns] = useState<SignPattern[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const lastCaptureTime = useRef<number>(0);

    // Cargar señas existentes
    const fetchSignPatterns = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/signs", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setSignPatterns(data);
            } else {
                setMessage({ text: "Error al cargar señas", type: 'error' });
            }
        } catch (error) {
            console.error(error);
            setMessage({ text: "Error de conexión", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSignPatterns();
    }, []);

    // Manejar la captura de frames con rate limiting
    const onResults = useCallback((results: Results) => {
        const now = Date.now();
        if (recording && results.multiHandLandmarks?.[0] && now - lastCaptureTime.current > 1000 / FRAME_RATE) {
            setFrames(prev => {
                const newFrames = [...prev, results.multiHandLandmarks[0]];
                return newFrames.slice(-MAX_FRAMES); // Mantener solo los últimos MAX_FRAMES
            });
            lastCaptureTime.current = now;
        }
    }, [recording]);

    // Configurar MediaPipe Hands
    useEffect(() => {
        if (!webcamRef.current?.video) return;

        const hands = new Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
            maxNumHands: 1, // Cambiado a 1 mano para mayor consistencia
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        hands.onResults(onResults);

        const camera = new cam.Camera(webcamRef.current.video, {
            onFrame: async () => {
                if (webcamRef.current?.video?.readyState === 4) {
                    await hands.send({ image: webcamRef.current.video });
                }
            },
            width: 640,
            height: 480,
        });

        camera.start();

        return () => {
            camera.stop();
            hands.close();
        };
    }, [onResults]);

    // Guardar la seña en el backend
    const handleCapture = async () => {
        if (!word.trim()) {
            setMessage({ text: "Ingresa una palabra válida", type: 'error' });
            return;
        }

        if (frames.length < 10) { // Mínimo de frames
            setMessage({ text: "Graba al menos 2 segundos de seña", type: 'error' });
            return;
        }

        try {
            // Normalizar y simplificar frames
            const normalizedFrames = frames.map(frame => {
                const normalized = normalizeLandmarks(frame);
                return normalized.map(p => [p.x, p.y, p.z]);
            });

            const response = await fetch("http://localhost:8080/api/signs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    word: word.trim().toLowerCase(),
                    sequence: normalizedFrames
                }),
            });

            if (!response.ok) throw new Error("Error en la respuesta");

            setMessage({ text: "Seña guardada correctamente 🎉", type: 'success' });
            setWord("");
            setFrames([]);
            await fetchSignPatterns(); // Actualizar lista
        } catch (err) {
            console.error(err);
            setMessage({ text: "Error al guardar la seña", type: 'error' });
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Agregar nueva seña con movimiento</h2>

            <div className="mb-6">
                <label className="block mb-2 font-semibold text-gray-700">Palabra asociada:</label>
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    placeholder="Ejemplo: hola, gracias"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                />
            </div>

            <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                        width: 380,
                        height: 480,
                        facingMode: "user"
                    }}
                    className="w-full rounded-lg"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                    className={`flex-1 py-3 rounded-lg font-semibold transition-colors duration-200 ${recording
                            ? "bg-red-600 hover:bg-red-700 text-white"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                    onClick={() => {
                        if (!recording) {
                            setFrames([]);
                            setMessage(null);
                        }
                        setRecording(!recording);
                    }}
                >
                    {recording ? (
                        <span className="flex items-center justify-center space-x-2">
                            <span className="animate-pulse text-xl">●</span>
                            <span>Grabando... ({frames.length} frames)</span>
                        </span>
                    ) : (
                        "Iniciar grabación"
                    )}
                </button>

                <button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCapture}
                    disabled={frames.length === 0 || !word.trim()}
                >
                    Guardar seña
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg mb-6 text-center text-sm font-medium ${message.type === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                    {message.text}
                </div>
            )}

            <div className="bg-gray-50 p-5 rounded-xl shadow-inner">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Señas guardadas</h3>
                {loading ? (
                    <p className="text-center py-6 text-gray-500">Cargando...</p>
                ) : signPatterns.length === 0 ? (
                    <p className="text-center text-gray-400 italic">No hay señas guardadas aún</p>
                ) : (
                    <ul className="divide-y divide-gray-300">
                        {signPatterns.map((sign) => (
                            <li key={sign.id} className="py-3 flex justify-between items-center">
                                <span className="font-medium text-gray-800">{sign.word}</span>
                                <span className="text-sm text-gray-500">({sign.sequence.length} frames)</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );

};

export default AddSignPattern;