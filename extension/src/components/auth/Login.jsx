/*global chrome*/
import React from "react";
import { useNavigate } from "react-router-dom";
import { getAndStoreEmail } from "../Constants";

const Login = () => {
    // TODO : Oauth with google
    // TODO : store the token in localStorage
    // TODO : login successful , redirect to webcamimage
    const navigate = useNavigate();
    const storeToken = (response) => {
        chrome.storage.sync.set(
            {
                GToken: response.token,
            },
            function () {
                navigate("/imagecapture");
            }
        );
    };

    const onClickLogin = (e) => {
        // TODO : login with google
        chrome.runtime.sendMessage(
            { message: "get_auth_token" },
            function (response) {
                storeToken(response);
                if (response.token) {
                    getAndStoreEmail();
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
