import { useState } from "react"
import { useAuth } from "../hooks/useAuth";

export function Login() {

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const { loginAction } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        await loginAction(input)
    }

    function handleInput(e) {
        const {name, value} = e.target;
        
        setInput((prev) => ({...prev, [name]: value}))        
    }

    return (
        <div className="max-w-sm mx-auto mt-12 bg-white border border-gray-200 shadow-md rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Iniciar Sesión</h2>
            <form method="POST" onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Usuario
                    </label>
                    <input
                        onChange={handleInput}
                        name="email"
                        value={input.email}
                        type="text"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                    </label>
                    <input
                        onChange={handleInput}
                        name="password"
                        value={input.password}
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-2 rounded-lg"
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    )
}