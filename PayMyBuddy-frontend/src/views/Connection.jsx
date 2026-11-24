import ConnectionForm from "../components/ConnectionForm";
import Nav from "../components/Nav";

const Connection = () => {
    return (
        <main>
            <Nav />
            <div className="connection-page">
                <ConnectionForm />
            </div>
        </main>
    );
};

export default Connection;
