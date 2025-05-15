import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();

    const loginAction = async (data) => {
        
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const res = await response.text();

            console.log(res);
            

            if (res) {
                //setUser(res.data.user);
                setToken(res)
                navigate("/");

                return;
            }

            throw new Error(res.message)
        }catch (err){
            console.error(err)
        }
    }

    const registerAction = async (data) => {
        
        try {
            const response = await fetch("http://localhost:8080/api/auth/sing-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const res = await response.json();

            console.log(res);
            

            if (response.ok && res.message) {
                toast.success("Hemos enviado un email de verificacion");

                setTimeout(() => {
                    navigate("/login");
                }, 3000);

            }else{
                toast.error("Ocurrio un error al hacer el registo");
            }

        }catch (err){
            console.error(err)
        }
    }

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        navigate("/login");
      };

    return (
        <AuthContext.Provider value={{token, user, loginAction, registerAction, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;