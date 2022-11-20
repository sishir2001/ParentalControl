/*global chrome*/
const restrictedURLS = [
    "xhamster18.desi",
    "mypornbible.com",
    "www.pornhub.org",
];

const currentURL = window.location.hostname;

// TODO : retrieve the web-page url and redirect to w3school
// TODO : first check for login from localStorage and redirect accordingly
const runFirst = async () => {
    const res = await chrome.storage.sync.get(["GToken"]);
    const age = await chrome.storage.sync.get(["AGE"]);
    const email = await chrome.storage.sync.get(["EMAIL"]);

    if (res.GToken === undefined) {
        // redirect to localhost website
        if (
            currentURL !== "localhost" &&
            currentURL !== "accounts.google.com"
        ) {
            window.location.replace("http://localhost:5173/");
        }
    } else if (restrictedURLS.includes(currentURL)) {
        if (age.AGE === "Below 18") {
            // TODO : fetch the email
            window.location.replace(
                `http://localhost:5173/unauthorized?url=${currentURL}&email=${email.EMAIL}`
            );
        }
    }
};

runFirst();
