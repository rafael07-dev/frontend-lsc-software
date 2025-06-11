import { useState } from "react";
import { User } from "types/User";

export function useUserModal() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | undefined>();

    function openUserModal(user: User) {
        setCurrentUser(user)
        setIsVisible(true)
    }

    function closeUserModal() {
        setCurrentUser(undefined)
        setIsVisible(false)
    }

    return {
        isVisible,
        setIsVisible,
        currentUser,
        openUserModal,
        closeUserModal
    }
}