import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import AddWord from "./AddWord";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    enabled: boolean;
    username: string;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
}

const AdminPanel = () => {
    const [user, setUser] = useState<User | null>(null);
    const URL: string = "http://localhost:8080/api/users/authenticated";
    const { token } = useAuth();

    async function getUserInfo() {
        try {
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("No se pudo obtener el usuario");
            }

            const data: User = await response.json();
            setUser(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [token]);

    return (
        <div className="flex h-screen bg-gray-100 text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col py-6 px-4 shadow-md">
                <h2 className="text-lg font-bold text-center mb-4">
                    Panel de Admin
                </h2>

                {user && (
                    <div className="mb-6 text-sm text-gray-300 text-center border-b border-gray-600 pb-4">
                        <p className="mb-1">Bienvenido, <span className="font-semibold text-white">{user.firstName}</span></p>
                        <p className="text-xs text-gray-400">{user.username}</p>
                    </div>
                )}

                <nav className="flex-1 space-y-2">
                    {[
                        { to: "/admin-panel", label: "Dashboard" },
                        { to: "/admin-panel/users", label: "Usuarios" },
                        { to: "/admin-panel/letters", label: "Letras" },
                        { to: "/admin-panel/words", label: "Palabras" },
                        { to: "/admin-panel/multimedia", label: "Multimedia" },
                        { to: "/admin-panel/questions", label: "Preguntas" },
                        { to: "/admin-panel/settings", label: "Configuración" },
                    ].map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="block rounded-md py-2 px-3 hover:bg-gray-700 hover:text-blue-400 transition"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
            
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;
