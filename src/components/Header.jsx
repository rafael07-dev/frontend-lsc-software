import { NavItem } from "./NavItem";

export function Header() {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center h-20 px-6">
                {/* Sección del Logo */}
                <div className="flex items-center space-x-2">
                    <img src="src/assets/img/logo.png" width="40" height="40" alt="Logo" />
                    <h1 className="text-lg font-bold text-gray-800">LCS SOFTWARE</h1>
                </div>

                {/* Sección de Navegación */}
                <nav>
                    <ul className="flex space-x-6">
                        <NavItem href="#" label="Inicio" />
                        <NavItem href="#" label="Diccionario" />
                        <NavItem href="#" label="Aprendizaje" />
                        <NavItem href="#" label="Quiz" />
                        <NavItem href="#" label="Login" />
                        <NavItem href="#" label="Sing up" />
                    </ul>
                </nav>
            </div>
        </header>
    );
}