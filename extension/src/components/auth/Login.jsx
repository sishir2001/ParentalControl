/*global chrome*/
import React from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_OAUTH } from "../Constants";

const Login = () => {
    // TODO : Oauth with google
    // TODO : store the token in localStorage
    // TODO : login successful , redirect to webcamimage
    const navigate = useNavigate();
    const storeToken = async (response) => {
        const result = await chrome.storage.sync.set({
            GToken: response.token,
        });
        if (result !== undefined) {
            console.log("Value currently is " + result);
            navigate("/imagecapture");
        } else {
            console.log("Not storing properly");
        }
    };
    const onClickLogin = (e) => {
        // TODO : login with google
        chrome.runtime.sendMessage(
            { message: "get_auth_token" },
            function (response) {
                console.log("Inside Login");
                console.log(response.token);
                if (response.token) {
                    // TODO : store token in storage
                    storeToken(response);
                }
            }
        );
    };
    return (
        <React.Fragment>
            <button onClick={onClickLogin}>Login</button>
        </React.Fragment>
    );
};

export default Login;
