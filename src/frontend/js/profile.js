const myPosts = document.querySelector(".my__posts");
const myComments = document.querySelector(".my__comments");
const myBookmark = document.querySelector(".my__bookmark");
const mySubscription = document.querySelector(".my__subscription");
const componentsPosts = document.querySelector(".components__posts");
const componentsComments = document.querySelector(".components__comments");
const componentsBookmarks = document.querySelector(".components__bookmarks");
const componentsSubscriptions = document.querySelector(".components__subscriptions");

function handleMyPosts() {
    componentsPosts.style.zIndex = "2";
    componentsComments.style.zIndex = "1";
    componentsBookmarks.style.zIndex = "0";
    componentsSubscriptions.style.zIndex = "-1";
    componentsPosts.style.visibility = "visible";
    componentsComments.style.visibility = "hidden";
    componentsBookmarks.style.visibility = "hidden";
    componentsSubscriptions.style.visibility = "hidden";
}

function handleMyComments() {
    componentsPosts.style.zIndex = "1";
    componentsComments.style.zIndex = "2";
    componentsBookmarks.style.zIndex = "0";
    componentsSubscriptions.style.zIndex = "-1";
    componentsPosts.style.visibility = "hidden";
    componentsComments.style.visibility = "visible";
    componentsBookmarks.style.visibility = "hidden";
    componentsSubscriptions.style.visibility = "hidden";
}

function handleMyBookmark() {
    componentsBookmarks.style.zIndex = "3";
    componentsSubscriptions.style.zIndex = "-1";
    componentsBookmarks.style.visibility = "visible";
    componentsPosts.style.visibility = "hidden";
    componentsComments.style.visibility = "hidden";
    componentsSubscriptions.style.visibility = "hidden";
}

function handleMySubscription() {
    componentsSubscriptions.style.zIndex = "4";
    componentsSubscriptions.style.visibility = "visible";
    componentsPosts.style.visibility = "hidden";
    componentsComments.style.visibility = "hidden";
    componentsBookmarks.style.visibility = "hidden";
}

myPosts.addEventListener("click", handleMyPosts);
myComments.addEventListener("click", handleMyComments);
myBookmark.addEventListener("click", handleMyBookmark);
mySubscription.addEventListener("click", handleMySubscription);