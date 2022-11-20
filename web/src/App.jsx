import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Unauthorized from "./components/Unauthorized";
import Login from "./components/auth/Login";
import LandingPage from "./components/LandingPage";
import WebCamImage from "./components/WebCamImage";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route path="/imagecapture" element={<WebCamImage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
