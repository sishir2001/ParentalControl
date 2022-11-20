import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Unauthorized from "./components/Unauthorized";
import Login from "./components/auth/Login";
import LandingPage from "./components/LandingPage";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
