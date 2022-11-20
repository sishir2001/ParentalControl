import "./App.css";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Unauthorized from "./components/Unauthorized";
import Login from "./components/auth/Login";
import LandingPage from "./components/LandingPage";
import WebCamImage from "./components/WebCamImage";

function App() {
    return (
        <div>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route path="/imagecapture" element={<WebCamImage />} />
                </Routes>
            </MemoryRouter>
        </div>
    );
}

export default App;
