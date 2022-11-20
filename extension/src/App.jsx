import "./App.css";
import Login from "./components/auth/Login";
import LandingPage from "./components/LandingPage";

function App() {
    // if logged in , then landing page otherwise login page

    const renderFunction = () => {
        const gauthToken = window.sessionStorage.getItem("GToken");
        if (gauthToken === undefined) {
            // login page redirected

            return (
                <div>
                    <Login />
                </div>
            );
        }

        return (
            <div>
                <LandingPage />
            </div>
        );
    };

    return renderFunction();
}

export default App;
