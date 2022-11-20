import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

function App(props) {
    // run only when the page loads
    useEffect(() => {
        console.log(`extension : `);
        console.log(window.sessionStorage);
        console.log(window.location);
        console.log(props.location);
    });

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
