import { useEffect, useState, useRef } from "react";
import WebCam from "react-webcam";

const WebCamImage = () => {
    const [ImgList, setImgList] = useState([]);
    const [response, setResponse] = useState(null);
    const webCamRef = useRef();

    const helperImgList = [];
    // run only once when the page renders
    useEffect(() => {
        // run the below logic after 3 seconds
        setTimeout(() => {
            // capture atleast 50 images
            for (let i = 0; i <= 50; i++) {
                const imageSrc = webCamRef.current.getScreenshot();
                helperImgList.push(imageSrc);
            }
            setImgList(helperImgList);
        }, 3000);
    }, []);

    useEffect(() => {
        console.log(`Inside the ImageList : `);
        console.log(ImgList);
        // TODO : call the api endpoint for age verification

        // TODO : if successfull , store the response in sessionStorage
    }, [ImgList]);

    const videoConstraints = {
        width: 640,
        height: 640,
        facingMode: "user",
    };
    const userResponseUpdate = () => {
        let res = "";
        if (ImgList.length === 0 && !response) {
            res = "Capturing the image ... ";
        } else if (ImgList.length !== 0 && !response) {
            res = "Processing the image ...";
        } else if (response) {
            res = "Analysis done ...";
        }
        return <div>{res}</div>;
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
            </div>
        );
    };

    return render();
};

export default WebCamImage;
