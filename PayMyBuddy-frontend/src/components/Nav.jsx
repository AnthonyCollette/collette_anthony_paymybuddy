import { NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        fetch(import.meta.env.VITE_API_URL + "/auth/logout", {
            method: "POST",
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    navigate("/login");
                } else {
                    console.error("Erreur lors de la déconnexion");
                }
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la requête de déconnexion",
                    error,
                );
            });
    };

    return (
        <nav>
            <div className="container">
                <p>Pay My Buddy</p>
                <ul className="nav-items">
                    <li>
                        <NavLink to="/">Transférer</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">Profil</NavLink>
                    </li>
                    <li>
                        <NavLink to="/connection">Ajouter relation</NavLink>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Se déconnecter</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
