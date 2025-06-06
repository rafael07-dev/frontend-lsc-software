import { useEffect, useState } from "react";
import { User } from "types/User";
import { getUsers } from "../service/userService";
import { useAuth } from "./useAuth";

export function useUsers() {

    const {token } = useAuth()
    
    const [users, setUsers] = useState<User[]>()

    async function loadUsers() {
        const data = await getUsers(token);
        setUsers(data)
    }

    useEffect(() => {
        loadUsers();
    }, [token])


    return {
        users
    }
}