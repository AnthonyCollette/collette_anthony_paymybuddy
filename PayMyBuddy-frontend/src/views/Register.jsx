import AuthForm from "../components/AuthForm";
import LinkButton from "../components/LinkButton";

const Register = () => {
    return (
        <main className="register-page">
            <section className="auth-page">
                <LinkButton text="Pay My Buddy" design="btn--primary" />
                <AuthForm action="register" />
            </section>
        </main>
    );
};

export default Register;
