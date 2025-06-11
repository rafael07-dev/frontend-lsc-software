import { User } from "types/User";

interface UserProps {
    user: User | undefined;
    isVisible: boolean;
    closeUserModal: () => void;
}

const UserModal = ({ user, isVisible, closeUserModal }: UserProps) => {
    
    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
                {/* Botón de cerrar en esquina */}
                <button
                    onClick={closeUserModal}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl font-bold focus:outline-none"
                    aria-label="Cerrar"
                >
                    &times;
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Detalles del Usuario</h2>

                <form action="POST" className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            name="firstName"
                            value={user?.firstName}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            readOnly
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellido</label>
                        <input
                            type="text"
                            name="lastName"
                            value={user?.lastName}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            readOnly
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
                        <input
                            type="text"
                            name="username"
                            value={user?.username}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            readOnly
                        />
                    </div>

                    <div>
                        <label htmlFor="roles" className="block text-sm font-medium text-gray-700">Rol</label>
                        <select
                            name="roles"
                            id="roles"
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            defaultValue=""
                        >
                            <option value="">Seleccionar rol</option>
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                            <option value="student">Estudiante</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={closeUserModal}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                        >
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;