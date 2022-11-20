/*global chrome*/
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_OAUTH } from "./Constants";

const LandingPage = () => {
    // TODO : check for local storage and present with respective details of the user
    const navigate = useNavigate();
    const LoginCheck = async () => {
        // checking whether logged in and user
        const res = await chrome.storage.sync.get([LOCAL_STORAGE_OAUTH]);
        if (res.key === undefined) {
            navigate("/login");
        } else {
            // logged in , check for user age
            navigate("/imagecapture");
        }
    };
    useEffect(() => {
        LoginCheck();
    }, []);

    return <React.Fragment>Hello There.</React.Fragment>;
};

export default LandingPage;
