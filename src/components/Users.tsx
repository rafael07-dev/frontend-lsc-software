import { useUserModal } from "../hooks/useUserModal";
import { useUsers } from "../hooks/useUsers";
import UserModal from "./UserModal";

const Users = () => {
    const { users } = useUsers();
    const { isVisible, openUserModal, closeUserModal, currentUser } = useUserModal();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                Usuarios disponibles en el sistema
            </h1>


            <div className="grid gap-4">
                {users?.map(user => (
                    <>
                        <div
                            onClick={() => openUserModal(user)}
                            key={user.id}
                            className="cursor-pointer p-4 border rounded-2xl shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
                        >
                            <p className="text-lg font-semibold text-gray-900">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="text-sm text-gray-600">
                                Usuario: <span className="font-medium">{user.username}</span>
                            </p>

                            <p>
                                roles: {user.roles}
                            </p>
                            <p className="text-sm text-gray-600">
                                Estado:{" "}
                                <span
                                    className={`font-bold ${user.enabled ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {user.enabled ? "Activo" : "Inactivo"}
                                </span>
                            </p>
                        </div>
                    </>
                ))}
                <UserModal isVisible={isVisible} user={currentUser} closeUserModal={closeUserModal} />
            </div>
        </div>
    );
};

export default Users;
