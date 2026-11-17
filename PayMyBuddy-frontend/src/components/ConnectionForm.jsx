const ConnectionForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = import.meta.env.VITE_API_URL + "/connection";
        const email = e.target.email.value;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Handle the response data as needed
            })
            .catch((error) => {
                console.error("Error:", error);
                // Handle the error as needed
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" id="email" name="email" />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default ConnectionForm;
