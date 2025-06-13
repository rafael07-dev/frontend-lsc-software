export async function getQuestions(token: string) {
    try {
        const response = await fetch("http://localhost:8080/api/questions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("could not get the questions");   
        }

        return response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function deleteQuestions(id: number, token: string) {
    try {
        const response = await fetch(`http://localhost:8080/api/questions/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("could not delete the question");   
        }

        return response.json();
    } catch (error) {
        console.log(error);
    }
}