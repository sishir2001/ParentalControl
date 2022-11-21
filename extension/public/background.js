/*global chrome*/
// const API_KEY = "AIzaSyA8BqIaTMSiPdKm5cniPxgqxOnw68GGrYA";
let user_signed_in = false;
let account_id = "";

chrome.identity.onSignInChanged.addListener(function (account_id, signedIn) {
    account_id = account_id;
    if (signedIn) {
        user_signed_in = true;
    } else {
        user_signed_in = false;
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "get_auth_token") {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            sendResponse({ token: token });
        });
        return true;
    } else if (request.message === "get_profile") {
        chrome.identity.getProfileUserInfo(
            { accountStatus: "ANY" },
            function (user_info) {
                sendResponse({ email: user_info.email });
            }
        );
        return true;
    }
});
