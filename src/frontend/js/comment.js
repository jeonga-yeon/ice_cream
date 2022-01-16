const container = document.querySelector(".container");
const form = document.getElementById("commentForm");
const loggedinTextarea = form.querySelector(".loggedin__textarea");
const deleteComments = document.querySelectorAll(".delete__comment");

const dateCreated = document.querySelectorAll(".post__comment--date span");

const dates = [];
const formattedDates = [];

function dateFormat(x) {
    const year = x.getFullYear();
    const month = x.getMonth() + 1;
    const date = x.getDate();
    const yearMonthDate = `${year}.${month}.${date}`;

    const hours = String(x.getHours()).padStart(2, "0");
    const minutes = String(x.getMinutes()).padStart(2, "0");
    const hoursMinutes = `${hours}:${minutes}`;

    const completedDate = `${yearMonthDate} ${hoursMinutes}`;

    formattedDates.push(completedDate);
}

for(let i = 0; i < dateCreated.length; i++) {
    dates[i] = new Date(dateCreated[i].innerText);
    dateFormat(dates[i]);
    dateCreated[i].innerHTML = formattedDates[i];
}

const addComment = (text, id, commentAvatar, commentOwner, commentNickname, commentDate) => {
    const postComments = document.querySelector(".post__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "post__comment";

    const postCommentAvatar = document.createElement("div");
    postCommentAvatar.className = "post__comment--avatar";

    const postCommentBox = document.createElement("div");
    postCommentBox.className = "post__comment--box";

    const postCommentBoxTop = document.createElement("div");
    postCommentBoxTop.className = "post__comment--box-top";

    const a = document.createElement("a");
    a.href = `/users/${commentOwner}`;
    if(commentAvatar === undefined) {
        const i = document.createElement("i");
        i.classList.add("fas", "fa-user-circle", ".comment__icon");
        i.style.color = "rgb(212, 211, 211)";
        i.style.fontSize = "42px";
        a.appendChild(i);
    } else if(commentAvatar === null) {
        const i = document.createElement("i");
        i.classList.add("fas", "fa-user-circle", ".comment__icon");
        i.style.color = "rgb(212, 211, 211)";
        i.style.fontSize = "42px";
        a.appendChild(i);
    } else {
        const img = document.createElement("img");
        img.className = "comment__avatar";
        img.src = `/${commentAvatar}`;
        a.appendChild(img);
    }
    const postCommentNickname = document.createElement("div");
    postCommentNickname.className = "post__comment--nickname";
    const nickname = document.createElement("span");
    nickname.innerText = commentNickname;
    postCommentNickname.appendChild(nickname);

    const postCommentDate = document.createElement("div");
    postCommentDate.className = "post__comment--date";
    const dateSpan = document.createElement("span");

    const fullDate = new Date(commentDate);
    
    const year = fullDate.getFullYear();
    const month = fullDate.getMonth() + 1;
    const date = fullDate.getDate();
    const yearMonthDate = `${year}.${month}.${date}`;

    const hours = String(fullDate.getHours()).padStart(2, "0");
    const minutes = String(fullDate.getMinutes()).padStart(2, "0");
    const hoursMinutes = `${hours}:${minutes}`;

    const completedDate = `${yearMonthDate} ${hoursMinutes}`;
    
    dateSpan.innerText = completedDate;
    postCommentDate.appendChild(dateSpan);

    const postCommentContent = document.createElement("div");
    postCommentContent.className = "post__comment--content";
    const contentSpan = document.createElement("span");
    contentSpan.innerText = text;
    postCommentContent.appendChild(contentSpan);

    const postCommentDelete = document.createElement("div");
    postCommentDelete.className = "post__comment--delete";
    const deleteSpan = document.createElement("span");
    deleteSpan.innerText = "삭제";
    postCommentDelete.appendChild(deleteSpan);

    postCommentDelete.addEventListener("click", deleteCommentBtn);

    postCommentAvatar.appendChild(a);
    newComment.appendChild(postCommentAvatar);

    postCommentBoxTop.appendChild(postCommentNickname);
    postCommentBoxTop.appendChild(postCommentDate);

    postCommentBox.appendChild(postCommentBoxTop);
    postCommentBox.appendChild(postCommentContent);
    postCommentBox.appendChild(postCommentDelete);

    newComment.appendChild(postCommentBox);
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
        const { newCommentId, newCommentAvatar, newCommentOwner, newCommentNickname, newCommentDate } = await response.json();
        addComment(text, newCommentId, newCommentAvatar, newCommentOwner, newCommentNickname, newCommentDate);
        loggedinTextarea.value = "";
    }
};

const deleteCommentBtn = async (event) => {
    const deleteButton = event.target.parentElement;
    const postCommentBox = deleteButton.parentElement;
    const li = postCommentBox.parentElement;
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