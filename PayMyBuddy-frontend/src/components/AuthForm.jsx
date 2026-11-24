import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthForm = ({ action }) => {
    const { refreshUser } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const url =
            action === "register"
                ? `${import.meta.env.VITE_API_URL}/auth/register`
                : `${import.meta.env.VITE_API_URL}/auth/login`;

        const requestOptions = {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error("Failed to authenticate");
            }

            if (action === "register") {
                navigate("/login");
                return;
            }

            const user = await refreshUser();

            if (user) {
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.error("Error :", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {action === "register" && (
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                    autoComplete="username"
                />
            )}
            <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                autoComplete="email"
            />
            <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                autoComplete="current-password"
            />
            <button type="submit">
                {action === "register" ? "S'inscrire" : "Se connecter"}
            </button>
            {action === "login" ? (
                <Link to="/register" className="create-account-link">
                    Créer un compte
                </Link>
            ) : (
                <Link to="/login" className="create-account-link">
                    Se connecter
                </Link>
            )}
        </form>
    );
};

export default AuthForm;
