import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Transfert from "./views/Transfert";
import Connection from "./views/Connection";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Transfert />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/connection" element={<Connection />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
