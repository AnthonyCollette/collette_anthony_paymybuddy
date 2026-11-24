import Nav from "../components/Nav";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
    return (
        <main>
            <Nav />
            <section className="profile">
                <ProfileForm />
            </section>
        </main>
    );
};

export default Profile;
