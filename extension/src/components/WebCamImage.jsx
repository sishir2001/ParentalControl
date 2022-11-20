/*global chrome*/
import { useEffect, useState, useRef } from "react";
import WebCam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WebCamImage = () => {
    const [img, setImg] = useState("");
    const [goLanding, setGoLanding] = useState(false);
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();
    const webCamRef = useRef();

    const storeAge = async (age) => {
        const result = await chrome.storage.sync.set({
            AGE: age,
        });
        if (result !== undefined) {
            console.log("Value currently is " + result);
        } else {
            console.log("Not storing age properly");
        }
    };

    const sendPicToAPI = () => {
        const headers = {
            "Content-Type": "multipart/form-data",
        };
        axios
            .post(
                "https://parentalmonitoringsystembknd.herokuapp.com/age",
                {
                    image: img,
                },
                {
                    headers: headers,
                }
            )
            .then((res, err) => {
                if (!err) {
                    console.log(res);
                    // TODO : store age in localstorage
                    storeAge(res.data.age);
                    setResponse(res.data);
                }
            });
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         navigate("/");
    //     }, 3000);
    // }, [goLanding]);

    // run only once when the page renders
    useEffect(() => {
        // run the below logic after 3 seconds
        setTimeout(() => {
            // capture atleast 50 images
            const imageSrc = webCamRef.current.getScreenshot();
            setImg(JSON.stringify(imageSrc).split(",")[1]);
        }, 3000);
    }, []);

    useEffect(() => {
        // TODO : call the api endpoint for age verification
        sendPicToAPI();
        // if (res.message === "successfully detected") {
        //     // TODO : store the age in localstorage
        // }
        // TODO : if successfull , store the response in store in the localstorage for chrome extensions
    }, [img]);

    const videoConstraints = {
        width: 640,
        height: 640,
        facingMode: "user",
    };
    const userResponseUpdate = () => {
        let res = "";
        if (img === "" && !response) {
            res = "Capturing the image ... ";
        } else if (img !== "" && !response) {
            res = "Processing the image ...";
        } else if (response.message) {
            if (response.message === "successfully detected") {
                res = response.age;
            } else {
                res = "Error occured !";
            }
        }
        return <div>{res}</div>;
    };
    const renderButton = () => {
        if (response && response.message === "successfully detected") {
            return (
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Continue Browsing
                </button>
            );
        }
    };
    const render = () => {
        return (
            <div>
                <WebCam
                    audio={false}
                    mirrored={false}
                    height={500}
                    width={500}
                    ref={webCamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
                {userResponseUpdate()}
                {renderButton()}
            </div>
        );
    };

    return render();
};

export default WebCamImage;
