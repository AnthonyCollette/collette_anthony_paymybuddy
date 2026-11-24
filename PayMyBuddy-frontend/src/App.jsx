import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Transfert from "./views/Transfert";
import Connection from "./views/Connection";
import Profile from "./views/Profile";
import { AuthProvider } from "./context/AuthContext";
import AuthRoutes from "./components/AuthRoutes";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<AuthRoutes />}>
                        <Route path="/" element={<Transfert />} />
                        <Route path="/connection" element={<Connection />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
