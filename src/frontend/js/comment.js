const container = document.querySelector(".container");
const form = document.getElementById("commentForm");
const loggedinTextarea = form.querySelector(".loggedin__textarea");
const button = form.querySelector("button");

const handleSubmit = (event) => {
    event.preventDefault();
    const text = loggedinTextarea.value;
    const postId = container.dataset.id;
    if(text === "") {
        return;
    }
    fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
};
    
form.addEventListener("submit", handleSubmit);