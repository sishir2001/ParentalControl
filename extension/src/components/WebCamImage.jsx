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
            function (result) {
                if (result !== undefined) {
                    console.log("Value currently is " + result);
                } else {
                    console.log("Not storing age properly");
                    isFinish = false;
                }
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
        if (img !== "") {
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
        } else {
            setTakeSS(!takeSS);
        }
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         navigate("/");
    //     }, 3000);
    // }, [goLanding]);

    useEffect(() => {
        setTakeSS(!takeSS);
    }, []);
    // run when face is not detected
    useEffect(() => {
        // run the below logic after 3 seconds
        setTimeout(() => {
            // capture atleast 50 images
            const imageSrc = webCamRef.current.getScreenshot();
            console.log("Image : ");
            console.log(imageSrc);
            setImg(JSON.stringify(imageSrc).split(",")[1]);
        }, 3000);
    }, [takeSS]);

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
                res = "Error occured ! , Re-capturing the image";
                setTakeSS(!takeSS);
            }
        }
        return <div>{res}</div>;
    };
    const renderButton = () => {
        if (response && response.message === "successfully detected") {
            return (
                <h1
                // onClick={() => {
                //     navigate("/");
                // }}
                >
                    Continue Browsing ... !
                </h1>
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
