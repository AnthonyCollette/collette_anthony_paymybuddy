import { Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import LinkButton from "../components/LinkButton";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (user) return <Navigate to="/" replace />;

    return (
        <main className="login-page">
            <section className="auth-page">
                <LinkButton text="Pay My Buddy" design="btn--primary" />
                <AuthForm action="login" />
            </section>
        </main>
    );
};

export default Login;
