const image = document.querySelector("#image");
const video = document.querySelector("#video");
const anyfiles = document.querySelector("#anyfiles");
const write = document.querySelector("#write");
const attachedFiles = document.querySelector("#attachedfiles ul");

let attached = [];

image.addEventListener("change", handleImageFiles, false);
video.addEventListener("change", handleVideoFiles, false);
anyfiles.addEventListener("change", handleFiles, false);

function handleImageFiles() {
    const files = this.files;
    for(let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith('image/')){ continue }

        const img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        write.appendChild(img);

        const reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
    }
}

function handleVideoFiles() {
    const files = this.files;
    for(let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith('video/')){ continue }

        const video = document.createElement("video");
        video.classList.add("obj");
        video.file = file;
        write.appendChild(video);

        const reader = new FileReader();
        reader.onload = (function(aVideo) { return function(e) { aVideo.src = e.target.result; }; })(video);
        reader.readAsDataURL(file);
    }
}

function deleteFile(event) {
    const li = event.target.parentElement;
    li.remove();
    attached = attached.filter(file => file.id !== parseInt(li.id));
    // 저장
}

function showFiles(fileObj) {
    const li = document.createElement("li");
    const filename = document.createElement("span");
    const button = document.createElement("button");
    filename.classList.add("obj");
    filename.innerText = fileObj.name;
    button.innerText = "x";
    button.addEventListener("click", deleteFile);
    li.appendChild(filename);
    li.appendChild(button);
    attachedFiles.appendChild(li);
}

function handleFiles() {
    const files = this.files;
    for(let i = 0; i < files.length; i++) {
        const file = files[i];
        const filename = file.name;
        const fileObj = {
            name: filename,
            id: Date.now(),
        }
        attached.push(fileObj);
        showFiles(fileObj);
        // 저장
    }
}