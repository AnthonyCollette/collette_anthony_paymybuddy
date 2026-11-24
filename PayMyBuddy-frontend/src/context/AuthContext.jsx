import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext(null);

const url = `${import.meta.env.VITE_API_URL}`;

async function fetchCurrentUser() {
    try {
        const res = await fetch(url + "/user", { credentials: "include" });
        return res.ok ? await res.json() : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let initialized = false;

        fetchCurrentUser().then((data) => {
            if (!initialized) {
                setUser(data);
                setLoading(false);
            }
        });

        return () => {
            initialized = true;
        };
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const refreshUser = useCallback(async () => {
        const data = await fetchCurrentUser();
        setUser(data);
        return data;
    });

    const logout = async () => {
        await fetch(url + "/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, setUser, loading, logout, refreshUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Erreur lors de l'utilisation du contexte");
    }
    return context;
}
