import { useState } from "react";

const ConnectionForm = () => {
    const [apiResponseSuccess, setApiResponseSuccess] = useState(null);
    const [apiResponseError, setApiResponseError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = import.meta.env.VITE_API_URL + "/connection";
        const email = e.target.email.value;

        await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })
            .then(async (response) => {
                const data = await response.json();

                if (response.ok) {
                    setApiResponseSuccess(data.message);
                    setApiResponseError(null);
                } else {
                    setApiResponseError(data.message);
                    setApiResponseSuccess(null);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="connection-form">
            <div className="form-group">
                <label htmlFor="email">Chercher une relation</label>
                <input
                    type="email"
                    placeholder="Saisir une adresse email"
                    id="email"
                    name="email"
                />
                {apiResponseSuccess && (
                    <p className="form-message form-message--success">
                        {apiResponseSuccess}
                    </p>
                )}
                {apiResponseError && (
                    <p className="form-message form-message--error">
                        {apiResponseError}
                    </p>
                )}
            </div>
            <button type="submit" className="btn--primary">
                Ajouter
            </button>
        </form>
    );
};

export default ConnectionForm;
