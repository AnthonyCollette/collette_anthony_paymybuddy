import { useEffect, useState } from "react";

const ProfileForm = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const fetchProfileData = async () => {
        const url = import.meta.env.VITE_API_URL + "/user";
        fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUserData(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = import.meta.env.VITE_API_URL + "/user";
        fetch(url, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }).then(async (response) => {
            const res = await response.json();

            if (response.ok) {
                setSuccess(res.message);
                setError(null);
            } else {
                setError(res.message);
                setSuccess(false);
            }
        });
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <div className="inputs">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username || ""}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                username: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email || ""}
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="mot de passe"
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                password: e.target.value,
                            })
                        }
                    />
                </div>
                {success && (
                    <p className="form-message form-message--success">
                        {success}
                    </p>
                )}
                {error && (
                    <p className="form-message form-message--error">{error}</p>
                )}
            </div>
            <button type="submit" className="btn--primary">
                Modifier
            </button>
        </form>
    );
};

export default ProfileForm;
