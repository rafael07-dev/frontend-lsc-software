import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface loginData {
    email: string;
    password: string;
}

interface registerData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

interface AuthContextType {
    token: string;
    user: any;
    loginAction: (data: loginData) => Promise<void>;
    registerAction: (data: registerData) => Promise<void>;
    logOut: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();

    const loginAction = async (data: loginData) => {
        
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const res: string = await response.text();

            console.log(res);
            

            if (res) {
                //setUser(res.data.user);
                setToken(res)
                navigate("/");

                return;
            }

            throw new Error(res)
        }catch (err){
            console.error(err)
        }
    }

    const registerAction = async (data: registerData) => {
        
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