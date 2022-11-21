/*global chrome*/
export const URL_ROOT = "http://localhost:5173";
export const URL = {
    LOGIN: `${URL_ROOT}/login`,
    LANDING_PAGE: `${URL_ROOT}`,
};
export const LOCAL_STORAGE_OAUTH = "GToken";
// export const CLIENT_ID =
//     "270047348342-81u04vv842230obkl8f44ukemj2k0alu.apps.googleusercontent.com";

export const getAndStoreEmail = () => {
    // TODO : store token in storage
    chrome.runtime.sendMessage({ message: "get_profile" }, function (response) {
        console.log(response);
        if (response.email) {
            chrome.storage.sync.set(
                {
                    EMAIL: response.email,
                },
                function (result) {
                    if (result !== undefined) {
                        console.log("Value currently is " + result);
                    } else {
                        console.log("Not storing properly");
                    }
                }
            );
        }
    });
};
