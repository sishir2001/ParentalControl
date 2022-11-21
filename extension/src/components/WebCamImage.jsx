/*global chrome*/
import { useEffect, useState, useRef } from "react";
import WebCam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WebCamImage = () => {
    const [img, setImg] = useState("");
    const [takeSS, setTakeSS] = useState(false);
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();
    const webCamRef = useRef();

    const storeAge = (age) => {
        let isFinish = true;
        chrome.storage.sync.set(
            {
                AGE: age,
            },
            function () {
                console.log("Value currently is " + age);
            }
        );
        if (!isFinish) {
            storeAge(age);
        }
    };

    const sendPicToAPI = () => {
        const headers = {
            "Content-Type": "multipart/form-data",
        };
        try {
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
        } catch (e) {
            console.log(e);
        }
    };

    const captureImage = () => {
        let isFinish = true;
        try {
            const imageSrc = webCamRef.current.getScreenshot();
            console.log("Image : ");
            console.log(imageSrc);
            setImg(JSON.stringify(imageSrc).split(",")[1]);
        } catch (e) {
            isFinish = false;
        }
        if (!isFinish) captureImage();
    };

    // take picture after few seconds
    useEffect(() => {
        setTakeSS(true);
    }, []);
    // run when face is not detected
    useEffect(() => {
        // run the below logic after 3 seconds
        setTimeout(() => {
            // capture atleast 50 images
            captureImage();
        }, 3000);
    }, [takeSS]);

    useEffect(() => {
        // TODO : call the api endpoint for age verification
        if (img !== null && img !== undefined && img !== "") {
            sendPicToAPI();
        } else {
            setTakeSS(!takeSS);
        }
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
                res = "Error occured ! , Re-capturing the image";
                setTakeSS(!takeSS);
            }
        }
        return <div>{res}</div>;
    };
    const renderButton = () => {
        if (response && response.message === "successfully detected") {
            return (
                <button
                    onClick={() => {
                        navigate("/browse");
                    }}
                >
                    Continue Browsing ... !
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
