import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Unauthorized = () => {
    // gets link and email address
    const [searchParams, setSearchParams] = useSearchParams();
    const url = searchParams.get("url"),
        email = searchParams.get("email");
    const sendEmail = () => {
        try {
            axios
                .post(
                    "https://parentalmonitoringsystembknd.herokuapp.com/email",
                    {
                        subject: "ParentControl Extension !",
                        body: `Unauthorized visit to ${url} at ${Date.now()}`,
                        to: email,
                    }
                )
                .then((res, err) => {
                    if (!err) {
                        console.log(res);
                    } else {
                        console.log(err);
                    }
                });
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        // send an email
        sendEmail();
    }, []);
    // TODO : get the link
    // TODO : get access to camera and take a picture
    // TODO : retrieve the email address from google and send the above details to api
    return (
        <div>
            Your are Unauthorized to visit {url} and logged in with {email}
        </div>
    );
};

export default Unauthorized;
