import React from "react";
import { useSearchParams } from "react-router-dom";

const Unauthorized = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // TODO : get the link
    // TODO : get access to camera and take a picture
    // TODO : retrieve the email address from google and send the above details to api
    return (
        <div>
            Your are Unauthorized to visit this link {searchParams.get("url")}
        </div>
    );
};

export default Unauthorized;
