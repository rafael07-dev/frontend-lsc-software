import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/img/logo-lsc.png";

export function Header() {

    const navigate = useNavigate();
    const { token, logOut } = useAuth();
    const isLoggedIn = !!token;

    return (
        <header className="bg-white shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center h-14 px-6">
                {/* Sección del Logo */}
                <div>
                    <img className="cursor-pointer" onClick={() => navigate("/")} src={logo} width="120" height="100" alt="Logo" />
                </div>

                {/* Sección de Navegación */}
                <nav>
                    <ul className="flex space-x-6">
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <button
                                        onClick={() => navigate("/diccionario")}
                                        className="text-gray-600 font-bold hover:text-blue-800"
                                    >
                                        Diccionario
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => navigate("/practice")}
                                        className="text-gray-600 font-bold hover:text-blue-800"
                                    >
                                        Practica la seña
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => navigate("/admin")}
                                        className="text-gray-600 font-bold hover:text-blue-800"
                                    >
                                        Admin panel
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => logOut()}
                                        className="text-gray-600 font-bold hover:text-blue-800"
                                    >
                                        Cerra sesion
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="text-gray-600 font-bold hover:text-blue-800"
                                    >
                                        Iniciar Sesión
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => navigate("/register")}
                                        className="text-gray-600 font-bold hover:text-blue-800"
                                    >
                                        Registrate
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}