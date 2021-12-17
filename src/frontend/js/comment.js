const container = document.querySelector(".container");
const form = document.getElementById("commentForm");
const loggedinTextarea = form.querySelector(".loggedin__textarea");
const button = form.querySelector("button");
const deleteComments = document.querySelectorAll(".delete__comment");

const addComment = (text, id, commentAvatar, commentOwner, commentNickname) => {
    const postComments = document.querySelector(".post__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "post__comment";
    const a = document.createElement("a");
    a.href = `/users/${commentOwner}`;
    if(commentAvatar === undefined) {
        const i = document.createElement("i");
        i.classList.add("fas", "fa-user-circle", "fa-5x");
        a.appendChild(i);
    } else {
        const img = document.createElement("img");
        img.className = "comment__avatar";
        img.src = `/${commentAvatar}`;
        a.appendChild(img);
    }
    const nickname = document.createElement("span");
    nickname.innerText = commentNickname + " ";
    const span = document.createElement("span");
    span.innerText = text + " ";
    const deleteSpan = document.createElement("span");
    deleteSpan.className = "delete__comment";
    deleteSpan.innerText = "삭제";
    deleteSpan.addEventListener("click", deleteCommentBtn);
    newComment.appendChild(a);
    newComment.appendChild(nickname);
    newComment.appendChild(span);
    newComment.appendChild(deleteSpan);
    postComments.prepend(newComment);
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const text = loggedinTextarea.value;
    const postId = container.dataset.id;
    if(text === "") {
        return;
    }
    const response = await fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    if(response.status === 201) {
        const { newCommentId, newCommentAvatar, newCommentOwner, newCommentNickname } = await response.json();
        addComment(text, newCommentId, newCommentAvatar, newCommentOwner, newCommentNickname);
        loggedinTextarea.value = "";
    }
};

const deleteCommentBtn = async (event) => {
    const li = event.target.parentElement;
    const commentId = li.dataset.id;
    await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });
    li.remove();
};
    
form.addEventListener("submit", handleSubmit);

for(let i = 0; i < deleteComments.length; i++) {
    deleteComments[i].addEventListener("click", deleteCommentBtn);
}