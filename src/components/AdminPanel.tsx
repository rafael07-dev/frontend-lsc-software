import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
    Home,
    Users,
    BookOpen,
    Video,
    HelpCircle,
    Settings,
    HandMetal
} from "lucide-react";

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
    const URL = "http://localhost:8080/api/users/authenticated";
    const { token } = useAuth();

    useEffect(() => {
        async function getUserInfo() {
            try {
                const response = await fetch(URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("No se pudo obtener el usuario");

                const data: User = await response.json();
                setUser(data);
            } catch (e) {
                console.log(e);
            }
        }

        getUserInfo();
    }, [token]);

    const navItems = [
        { to: "/admin", label: "Dashboard", icon: <Home size={18} /> },
        { to: "/admin/users", label: "Usuarios", icon: <Users size={18} /> },
        { to: "/admin/words", label: "Palabras", icon: <BookOpen size={18} /> },
        { to: "/admin/media", label: "Multimedia", icon: <Video size={18} /> },
        { to: "/admin/questions", label: "Preguntas", icon: <HelpCircle size={18} /> },
        { to: "/admin/signs", label: "Señas", icon: <HandMetal size={18} /> },
        { to: "/admin/settings", label: "Configuración", icon: <Settings size={18} /> }
    ];

    return (
        <div className="flex h-screen bg-gray-100 text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col py-6 px-4 shadow-md">
                <h2 className="text-lg font-bold text-center mb-4">
                    Panel administrador
                </h2>

                {user && (
                    <div className="mb-6 text-sm text-gray-300 text-center border-b border-gray-600 pb-4">
                        <p className="mb-1">
                            Bienvenido,{" "}
                            <span className="font-semibold text-white">{user.firstName}</span>
                        </p>
                        <p className="text-xs text-gray-400">{user.username}</p>
                    </div>
                )}

                <nav className="flex-1 space-y-2">
                    {navItems.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-md py-2 px-3 transition ${isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-700 hover:text-blue-400"
                                }`
                            }
                            end={to === "/admin"}
                        >
                            {icon}
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-2 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;
