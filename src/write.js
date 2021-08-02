const fileView = document.querySelector("#file-view");
let newFiles = [];

if(newFiles) {
    fileView.classList.remove("hidden");
}

for (let i = 0, numFiles = files.length; i < numFiles; i++) {
    const file = files[i];
    const newFileObj = {
        filename: file.name,
        filetype: file.type,
        id: Date.now(),
    };
    newFiles.push(newFileObj);
    paintToDo(newFileObj);
    // 파일 저장
}

function deleteFile(event) {
    const li = event.target.parentElement;
    li.remove();
    newFiles = newFiles.filter(newFile => newFile.id !== parseInt(li.id));
    // 파일 저장
}

function paintFiles(newFileObj) {
    const li = document.createElement("li");
    li.id = newFileObj.id;
    const spanfilename = document.createElement("span");
    span.innerText = newFileObj.filename;
    const spanfiletype = document.createElement("span");
    span.innerText = newFileObj.filetype;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteFile);
    li.appendChild(spanfilename);
    li.appendChild(spanfiletype);
    fileView.appendChild(li);
}