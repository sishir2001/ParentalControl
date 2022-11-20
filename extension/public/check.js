const currentURL = window.location.hostname;
console.log(`Extension : ${window.location.href}`);
console.log(currentURL);
// TODO : retrieve the web-page url and redirect to w3school
if (currentURL !== "localhost") {
    window.location.replace("http://localhost:5173");
}
