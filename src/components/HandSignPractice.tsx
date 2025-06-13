import { useEffect, useState, useCallback, useRef } from "react";
import { useHandDetection } from "../hooks/useHandDetection";
import { drawConnectors, drawLandmarks} from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import { useAuth } from "../hooks/useAuth";

export type Landmark = { x: number; y: number; z: number };

type SignPattern = {
    word: string;
    pattern: number[][][];
};

// Función de utilidad para verificar si un array contiene un elemento
const arrayContains = (arr: number[], elem: number): boolean => {
    return arr.indexOf(elem) !== -1;
};

const convertToLandmarksSequence = (arr: number[][][]): Landmark[][] => {
    return arr.map(frame =>
        frame.map(([x, y, z]) => ({
            x: x || 0,
            y: y || 0,
            z: z || 0
        }))
    );
};

export const normalizeLandmarks = (landmarks: Landmark[]): Landmark[] => {
    if (!landmarks || landmarks.length === 0) return [];

    const center = landmarks[0];
    const centered = landmarks.map(({ x, y, z }) => ({
        x: x - center.x,
        y: y - center.y,
        z: z - center.z
    }));

    const referenceIndex = 9;
    const refPoint = centered[referenceIndex];
    const scale = Math.sqrt(refPoint.x ** 2 + refPoint.y ** 2 + refPoint.z ** 2) || 1;

    return centered.map(p => ({
        x: p.x / scale,
        y: p.y / scale,
        z: p.z / (scale * 1.5) // Mayor peso a la profundidad
    }));
};

const distance3D = (a: Landmark, b: Landmark): number => {
    const dx = (a.x - b.x) * 1.0;
    const dy = (a.y - b.y) * 1.0;
    const dz = (a.z - b.z) * 1.5; // Reducido el peso de la profundidad
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const compareLandmarks = (
    user: Landmark[],
    target: Landmark[],
    toleranceMap: Record<number, number>
): number => {
    if (!user || !target || user.length !== target.length) return 0;

    const normUser = normalizeLandmarks(user);
    const normTarget = normalizeLandmarks(target);

    let totalScore = 0;
    let totalWeight = 0;
    const importantLandmarks = [4, 8, 12, 16, 20];

    for (let i = 0; i < normUser.length; i++) {
        const dist = distance3D(normUser[i], normTarget[i]);
        const tolerance = toleranceMap[i] || 0.3; // Tolerancia aumentada
        const landmarkScore = Math.max(0, 1 - (dist / tolerance));

        const weight = arrayContains(importantLandmarks, i) ? 1.2 : 1; // Peso reducido

        totalScore += landmarkScore * weight;
        totalWeight += weight;
    }

    return +(totalScore / totalWeight * 100).toFixed(1);
};

const compareSequences = (
    userSequence: Landmark[][],
    targetSequence: Landmark[][]
): number => {
    if (userSequence.length < targetSequence.length) return 0;

    let bestMatch = 0;
    const step = Math.max(1, Math.floor(userSequence.length / targetSequence.length / 2)); // Mayor solapamiento

    for (let offset = 0; offset <= userSequence.length - targetSequence.length; offset += step) {
        const segment = userSequence.slice(offset, offset + targetSequence.length);
        let segmentScore = 0;

        for (let i = 0; i < targetSequence.length; i++) {
            segmentScore += compareLandmarks(segment[i], targetSequence[i], {
                0: 0.4,   // Muñeca - tolerancia aumentada
                4: 0.25,  // Pulgar
                8: 0.2,   // Índice
                12: 0.2,  // Medio
                16: 0.2,  // Anular
                20: 0.2   // Meñique
            });
        }

        const avgScore = segmentScore / targetSequence.length;
        bestMatch = Math.max(bestMatch, avgScore);
    }

    return bestMatch;
};

export default function HandSignPractice() {
    const { token } = useAuth();
    const [message, setMessage] = useState("Muestra tu mano para comenzar");
    const [showPattern, setShowPattern] = useState("hola");
    const [patterns, setPatterns] = useState<Record<string, Landmark[][]>>({});
    const [similarity, setSimilarity] = useState(0);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    const canvaRef = useRef<HTMLCanvasElement>(null)

    const userFramesRef = useRef<Landmark[][]>([]);

    useEffect(() => {
        const fetchPatterns = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/signs/patterns", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data: SignPattern[] = await response.json();

                const parsedPatterns: Record<string, Landmark[][]> = {};
                data.forEach(({ word, pattern }) => {
                    parsedPatterns[word] = convertToLandmarksSequence(pattern);
                });

                setPatterns(parsedPatterns);
            } catch (error) {
                console.error("Error loading patterns:", error);
                setMessage("Error cargando patrones");
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchPatterns();
    }, [token]);

    const onResults = useCallback((results: any) => {

        if (canvaRef.current == null) {
            return null;
        }

        const canvaCtx = canvaRef.current?.getContext('2d')

        canvaCtx?.save()

        canvaCtx?.clearRect(0, 0, canvaRef.current?.width, canvaRef.current?.height)

        canvaCtx?.drawImage(results.image, 0, 0, canvaRef.current?.width, canvaRef.current?.height)

        if (canvaCtx == null) {
            return null
        }

        if (results.multiHandLandmarks?.[0]) {
            for (const landmarks of results.multiHandLandmarks) {
                drawConnectors(canvaCtx, landmarks, HAND_CONNECTIONS,
                    { color: '#00FF00', lineWidth: 5 });
                drawLandmarks(canvaCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
            }
            const userLandmarks = results.multiHandLandmarks[0];
            userFramesRef.current = [...userFramesRef.current, userLandmarks].slice(-30);

            const targetPattern = patterns[showPattern];
            if (!targetPattern) {
                if (!loading) setMessage("Patrón no disponible");
                return;
            }

            const similarityScore = compareSequences(userFramesRef.current, targetPattern);
            setSimilarity(similarityScore);

            // Umbral reducido a 60%
            const isSuccess = similarityScore >= 60;
            setSuccess(isSuccess);
            setMessage(isSuccess ? "¡Correcto!" : "Ajusta tu seña");
        } else {
            setMessage("Muestra tu mano claramente");
            setSimilarity(0);
            setSuccess(false);
            canvaCtx.restore()
        }
    }, [patterns, showPattern, loading]);

    const { videoRef } = useHandDetection(onResults);

    if (loading) return <div>Cargando patrones...</div>;

    return (
        <div className="max-w-screen-sm mx-auto p-4 bg-white-400 rounded-2xl shadow-xl text-center h-auto flex flex-col justify-center">

            <h1 className="text-xl font-bold text-gray-800 mb-2">Practica la seña: {showPattern}</h1>

            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full max-w-xs rounded-xl border-4 border-gray-300 mb-3 mx-auto"
            />

            <canvas width={1280} height={720} ref={canvaRef}></canvas>

            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${similarity}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-black">
                    {similarity}%
                </span>
            </div>

            <p className={`font-bold text-base ${success ? 'text-green-600' : 'text-orange-500'}`}>
                {message}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {Object.keys(patterns).map(word => (
                    <button
                        key={word}
                        onClick={() => {
                            setShowPattern(word);
                            userFramesRef.current = [];
                            setSimilarity(0);
                            setSuccess(false);
                            setMessage("Muestra tu mano");
                        }}
                        className={`px-3 py-1.5 rounded-xl text-white text-sm font-semibold transition-colors duration-200 ${showPattern === word ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                    >
                        {word}
                    </button>
                ))}
            </div>

        </div>
    );


}