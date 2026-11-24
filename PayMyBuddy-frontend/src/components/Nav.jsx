import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
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
