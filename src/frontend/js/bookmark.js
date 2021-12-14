const postBookmark = document.querySelector(".post__bookmark");
const postBookmarked = document.querySelector(".post__bookmarked");
const container = document.querySelector(".container");
const bookmarkContainer = document.querySelector(".bookmark__container");

const handlePostBookmarked = async (postBookmarked) => {
    const postId = container.dataset.id;
    await fetch(`/api/bookmarks/${postId}`, {
        method: "DELETE"
    });

    postBookmarked.style.display = "none";
    const makePostBookmark = document.createElement("div");
    makePostBookmark.className = "post__bookmark";
    const makeBookmarkIcon = document.createElement("i");
    makeBookmarkIcon.classList.add("far", "fa-bookmark");
    makePostBookmark.appendChild(makeBookmarkIcon);
    bookmarkContainer.appendChild(makePostBookmark);

    makePostBookmark.addEventListener("click", function(){handlePostBookmark(makePostBookmark)} );
}

const handlePostBookmark = async (postBookmark) => {
    const postId = container.dataset.id;
    await fetch(`/api/posts/${postId}/bookmark`, {
        method: "POST"
    });

    postBookmark.style.display = "none";
    const makePostBookmarked = document.createElement("div");
    makePostBookmarked.className = "post__bookmarked";
    const makeIcon = document.createElement("i");
    makeIcon.classList.add("fas", "fa-bookmark");
    makePostBookmarked.appendChild(makeIcon);
    bookmarkContainer.appendChild(makePostBookmarked);

    makePostBookmarked.addEventListener("click", function(){handlePostBookmarked(makePostBookmarked)} );
}

if(postBookmark) {
    postBookmark.addEventListener("click", function(){handlePostBookmark(postBookmark)});
} else {
    postBookmarked.addEventListener("click", function(){handlePostBookmarked(postBookmarked)});
}