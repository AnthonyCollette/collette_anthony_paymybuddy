import AuthForm from "../components/AuthForm";
import LinkButton from "../components/LinkButton";

const Login = () => {
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
