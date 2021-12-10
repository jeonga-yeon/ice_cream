const postBookmark = document.querySelector(".post__bookmark");
const container = document.querySelector(".container");

const handlePostBookmark = async () => {
    const postId = container.dataset.id;
    await fetch(`/api/posts/${postId}/bookmark`, {
        method: "POST"
    });
}

postBookmark.addEventListener("click", handlePostBookmark);