import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

const Register = () => {

    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        roles: null
    })

    const {registerAction} = useAuth();

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await registerAction(input)
    }

    return (
        <div className="max-w-md mx-auto mt-12 bg-white border border-gray-200 shadow-md rounded-2xl p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Registro</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                        onChange={handleInput}
                        name="firstName"
                        value={input.firstName}
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                    <input
                        onChange={handleInput}
                        name="lastName"
                        value={input.lastName}
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                    <input
                        onChange={handleInput}
                        name="username"
                        value={input.username}
                        type="text"
                        id="username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                    <input
                        onChange={handleInput}
                        name="email"
                        value={input.email}
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
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
                    Registrarse
                </button>
            </form>
        </div>
    )
}

export default Register;