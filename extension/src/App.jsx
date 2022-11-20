/*global chrome*/
import "./App.css";
import { URL } from "./components/Constants";
import React, { useEffect } from "react";

function App() {
    // if logged in , then landing page otherwise login page
    useEffect(() => {
        // window.location.replace(URL.LANDING_PAGE);
        chrome.storage.sync.set({ G1: "G1" }, function () {
            console.log("Value is set to " + "G1");
        });
    }, []);

    const renderFunction = () => {
        return <React.Fragment>Landing Page</React.Fragment>;
    };

    return renderFunction();
}

export default App;
