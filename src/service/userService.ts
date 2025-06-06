export async function getUsers(token: string) {

    try {
        const response = await fetch("http://localhost:8080/api/users/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
    
        if (!response.ok) {
            throw new Error("Could not get users");   
        }
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}