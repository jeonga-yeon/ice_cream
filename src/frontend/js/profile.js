const myPosts = document.querySelector(".my__posts");
const myComments = document.querySelector(".my__comments");
const myBookmark = document.querySelector(".my__bookmark");
const mySubscription = document.querySelector(".my__subscription");
const componentsPosts = document.querySelector(".components__posts");
const componentsComments = document.querySelector(".components__comments");
const componentsBookmarks = document.querySelector(".components__bookmarks");
const componentsSubscriptions = document.querySelector(".components__subscriptions");
const settings = document.querySelector(".settings");
const userSettings = document.querySelector(".user__settings");
const withdrawalBtn = document.querySelector(".withdrawal");
const profileData = document.querySelector(".profile__data");

function handleMyPosts() {
    myPosts.style.fontWeight = "bold";
    myComments.style.fontWeight = "normal";

    componentsPosts.style.zIndex = "2";
    componentsComments.style.zIndex = "1";
    componentsBookmarks.style.zIndex = "0";
    componentsSubscriptions.style.zIndex = "-1";
    componentsPosts.style.visibility = "visible";
    componentsComments.style.visibility = "hidden";
    componentsBookmarks.style.visibility = "hidden";
    componentsSubscriptions.style.visibility = "hidden";

    myBookmark.style.fontWeight = "normal";
    mySubscription.style.fontWeight = "normal";
}

function handleMyComments() {
    myPosts.style.fontWeight = "normal";
    myComments.style.fontWeight = "bold";

    componentsPosts.style.zIndex = "1";
    componentsComments.style.zIndex = "2";
    componentsBookmarks.style.zIndex = "0";
    componentsSubscriptions.style.zIndex = "-1";
    componentsPosts.style.visibility = "hidden";
    componentsComments.style.visibility = "visible";
    componentsBookmarks.style.visibility = "hidden";
    componentsSubscriptions.style.visibility = "hidden";

    myBookmark.style.fontWeight = "normal";
    mySubscription.style.fontWeight = "normal";
}

function handleMyBookmark() {
    myPosts.style.fontWeight = "normal";
    myComments.style.fontWeight = "normal";
    myBookmark.style.fontWeight = "bold";
    mySubscription.style.fontWeight = "normal";

    componentsBookmarks.style.zIndex = "3";
    componentsSubscriptions.style.zIndex = "-1";
    componentsBookmarks.style.visibility = "visible";
    componentsPosts.style.visibility = "hidden";
    componentsComments.style.visibility = "hidden";
    componentsSubscriptions.style.visibility = "hidden";
}

function handleMySubscription() {
    myPosts.style.fontWeight = "normal";
    myComments.style.fontWeight = "normal";
    myBookmark.style.fontWeight = "normal";
    mySubscription.style.fontWeight = "bold";

    componentsSubscriptions.style.zIndex = "4";
    componentsSubscriptions.style.visibility = "visible";
    componentsPosts.style.visibility = "hidden";
    componentsComments.style.visibility = "hidden";
    componentsBookmarks.style.visibility = "hidden";
}

function handleCloseSetting() {
    userSettings.style.display = "none";
    settings.removeEventListener("click", handleCloseSetting);
    settings.addEventListener("click", handleSettings);
}

function handleSettings() {
    userSettings.style.display = "block";
    settings.removeEventListener("click", handleSettings);
    settings.addEventListener("click", handleCloseSetting);
}

const handleWithdrawal = async () => {
    const answer = confirm("정말 탈퇴하시겠습니까?\n회원님의 모든 정보가 삭제됩니다.");
    if(answer) {
        const userId = profileData.dataset.id;
        await fetch(`/api/users/${userId}/user-delete`, {
            method: "DELETE"
        });
        window.location.replace("/");
    } else {

    }
}

function bookmarkDate() {
    const dateCreated = document.querySelectorAll(".bookmark__created");

    const dates = [];
    const formattedDates = [];

    function dateFormat(x) {
        const year = x.getFullYear();
        const month = x.getMonth();
        const date = x.getDate();
        const yearMonthDate = `${year}.${month}.${date}`;

        formattedDates.push(yearMonthDate);
    }

    for(let i = 0; i < dateCreated.length; i++) {
        dates[i] = new Date(dateCreated[i].innerText);
        dateFormat(dates[i]);
        dateCreated[i].innerHTML = formattedDates[i];
    }

    myBookmark.removeEventListener("click", bookmarkDate);
}

myPosts.addEventListener("click", handleMyPosts);
myComments.addEventListener("click", handleMyComments);
if(myBookmark) {
    myBookmark.addEventListener("click", handleMyBookmark);
    myBookmark.addEventListener("click", bookmarkDate);
}
if(mySubscription) {
    mySubscription.addEventListener("click", handleMySubscription);
}
if(settings) {
    settings.cursor = "pointer";
    settings.addEventListener("click", handleSettings);
    withdrawalBtn.addEventListener("click", handleWithdrawal);
}