/*global chrome*/
const currentURL = window.location.hostname;
console.log(currentURL);

// TODO : retrieve the web-page url and redirect to w3school
// TODO : first check for login from localStorage and redirect accordingly
const runFirst = async () => {
    const res = await chrome.storage.sync.get(["GToken"]);
    console.log(res);
    if (res.key === undefined) {
        // redirect to localhost website
        if (currentURL !== "localhost") {
            window.location.replace("http://localhost:5173/");
        }
    }
};
runFirst();
