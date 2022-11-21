/*global chrome*/
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_OAUTH } from "./Constants";
import { getAndStoreEmail } from "./Constants";

const LandingPage = () => {
    // TODO : check for local storage and present with respective details of the user
    const navigate = useNavigate();
    const LoginCheck = async () => {
        // checking whether logged in and user
        const res = await chrome.storage.sync.get([LOCAL_STORAGE_OAUTH]);
        const age = await chrome.storage.sync.get("AGE");

        console.log("Inside LandingPage");
        console.log(res.GToken);
        console.log(age.AGE);
        if (res.GToken === undefined) {
            navigate("/login");
        } else {
            // TODO :check for email , if not store email
            // get EMAIL
            chrome.storage.sync.get(["EMAIL"], function (result) {
                console.log(result);
                if (result === undefined || result.EMAIL === undefined) {
                    // get and store email
                    getAndStoreEmail();
                }
                navigate("/imagecapture");
            });
        }
    };
    useEffect(() => {
        LoginCheck();
    }, []);

    return (
        <React.Fragment>Hello There. You Can Continue Browsing</React.Fragment>
    );
};

export default LandingPage;
