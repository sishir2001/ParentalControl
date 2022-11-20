/*global chrome*/
const restrictedURLS = [
    "xhamster18.desi",
    "mypornbible.com",
    "www.pornhub.org",
];

const currentURL = window.location.hostname;
console.log(currentURL);

// TODO : retrieve the web-page url and redirect to w3school
// TODO : first check for login from localStorage and redirect accordingly
const runFirst = async () => {
    const res = await chrome.storage.sync.get(["GToken"]);
    const age = await chrome.storage.sync.get(["AGE"]);
    console.log(res.GToken);
    console.log(currentURL);
    if (res.GToken === undefined) {
        // redirect to localhost website
        // if (currentURL !== "localhost" && currentURL !== "www.google.com") {
        //     window.location.replace("http://localhost:5173/");
        // }
    } else if (restrictedURLS.includes(currentURL)) {
        if (age.AGE === "Below 18") {
            window.location.replace(
                `http://localhost:5173/unauthorized?url=${currentURL}`
            );
        }
    }
};

runFirst();
