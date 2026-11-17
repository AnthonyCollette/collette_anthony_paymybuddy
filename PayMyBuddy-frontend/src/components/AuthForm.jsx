import { useNavigate } from "react-router-dom";

const AuthForm = ({ action }) => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const url =
            action === "register"
                ? `${import.meta.env.VITE_API_URL}/auth/register`
                : `${import.meta.env.VITE_API_URL}/auth/login`;

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };

        fetch(url, requestOptions)
            .then((response) =>
                response.ok
                    ? navigate("/")
                    : Promise.reject("Failed to authenticate"),
            )
            .catch((error) => {
                console.error("Error:", error);
            });
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
        </form>
    );
};

export default AuthForm;
