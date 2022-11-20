import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // TODO : Oauth with google
    // TODO : store the token in localStorage
    // TODO : login successful , redirect to webcamimage
    const navigate = useNavigate();
    const onClickLogin = (e) => {
        // TODO : if login successful
        navigate("/imagecapture");
    };
    return (
        <React.Fragment>
            <button onClick={onClickLogin}>Login</button>
        </React.Fragment>
    );
};

export default Login;
