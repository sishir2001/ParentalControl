import React from "react";

const Login = () => {
    // TODO : Just give a button to login and take a video of the person
    return (
        <React.Fragment>
            <button
                onClick={() => {
                    window.location.replace("http://localhost:5173/login");
                }}
            >
                Login
            </button>
        </React.Fragment>
    );
};

export default Login;
