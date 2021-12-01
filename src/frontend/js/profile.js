const myPosts = document.querySelector(".my__posts");
const myComments = document.querySelector(".my__comments");
const componentsPosts = document.querySelector(".components__posts");
const componentsComments = document.querySelector(".components__comments");

function handleMyPosts() {
    componentsPosts.style.zIndex = "2";
    componentsComments.style.zIndex = "1";
    componentsPosts.style.visibility = "visible";
    componentsComments.style.visibility = "hidden";
}

function handleMyComments() {
    componentsPosts.style.zIndex = "1";
    componentsComments.style.zIndex = "2";
    componentsPosts.style.visibility = "hidden";
    componentsComments.style.visibility = "visible";
}

myPosts.addEventListener("click", handleMyPosts);
myComments.addEventListener("click", handleMyComments);
