const container = document.querySelector(".container");
const slideWrap = document.querySelector(".slide_wrap");
const slide = document.querySelector(".slide");
const images = document.querySelectorAll(".image");
const videos = document.querySelectorAll("video");
const postCreated = document.querySelector(".post__created");
let curPosition = 0;
let position = 0;

function clickPrev(files, prev, next) {
    if(curPosition > 0) {
        next.classList.remove("stop");
        if(files[curPosition].className === "image") {
            position += files[curPosition-1].width;
        } else {
            position += files[curPosition-1].clientWidth;
        }
        if(files[curPosition - 1].className === "image") {
            container.style.width = files[curPosition - 1].width + 'px';
            slideWrap.style.width = files[curPosition - 1].width + 'px';
        } else {
            container.style.width = files[curPosition - 1].clientWidth + 'px';
            slideWrap.style.width = files[curPosition - 1].clientWidth + 'px';
        }
        for(let i = 0; i < files.length; i++) {
            files[i].style.transform = `translateX(${position}px)`;
        }
        curPosition = curPosition - 1;
    }
    if(curPosition == 0) {
        prev.classList.add("stop");
    }
}

function clickNext(files, prev, next) {
    if(curPosition < files.length - 1) {
        prev.classList.remove("stop");
        if(files[curPosition].className === "image") {
            position -= files[curPosition].width;
        } else {
            position -= files[curPosition].clientWidth;
        }
        if(files[curPosition + 1].className === "image") {
            container.style.width = files[curPosition + 1].width + 'px';
            slideWrap.style.width = files[curPosition + 1].width + 'px';
        } else {
            container.style.width = files[curPosition + 1].clientWidth + 'px';
            slideWrap.style.width = files[curPosition + 1].clientWidth + 'px';
        }
        for(let i = 0; i < files.length; i++) {
            files[i].style.transform = `translateX(${position}px)`;
        }
        curPosition = curPosition + 1;
    }
    if(curPosition == files.length - 1) {
        next.classList.add("stop");
    }
}

function paintBtn() {
    const buttonWrap = document.createElement("div");
    buttonWrap.className = "button_wrap";
    const prev = document.createElement("i");
    prev.className = "fas fa-chevron-left button prev";
    const next = document.createElement("i");
    next.className = "fas fa-chevron-right button next";
    container.appendChild(buttonWrap);
    buttonWrap.appendChild(prev);
    buttonWrap.appendChild(next);
}

function imgResizing () {
    for(let i = 0; i < images.length; i++) {
        images[i].style.height = 400;
        images[i].style.width = "auto";
    }  
}

window.onload = function () {
    if(slide) {
        if(images || videos) {
            setTimeout(function() {
                container.style.display = "block";
                imgResizing();
                if(images.length + videos.length !== 1) {
                    paintBtn();
                }
        
                const imgs = document.querySelectorAll(".image");
                const allVideos = document.querySelectorAll("video");
                let files = [];
        
                if(imgs) {
                    for(let i = 0; i < imgs.length; i++) {
                        files.push(imgs[i]);
                    }
                }
                if(allVideos) {
                    for(let i = 0; i < allVideos.length; i++) {
                        files.push(allVideos[i]);
                    }
                }

                if(files.length === 0) {
                    container.style.display = "none";
                } else {
                    if(files[0].className === "image") {
                        container.style.width = files[0].width + 'px';
                        slideWrap.style.width = files[0].width + 'px';
                    } else {
                        container.style.width = files[0].clientWidth + 'px';
                        slideWrap.style.width = files[0].clientWidth + 'px';
                    }
                }
        
                const prev = document.querySelector("i.prev");
                const next = document.querySelector("i.next");
        
                if(images.length + videos.length !== 1) {
                    prev.classList.add("stop");
                    prev.addEventListener("click", function() {clickPrev(files, prev, next)});
                    next.addEventListener("click", function() {clickNext(files, prev, next)});
                }
            }, 100);
        }
    }
}

const newDate = new Date(postCreated.innerText);

const year = newDate.getFullYear();
const month = newDate.getMonth() + 1;
const date = newDate.getDate();
const yearMonthDate = `${year}.${month}.${date}`;

const hours = String(newDate.getHours()).padStart(2, "0");
const minutes = String(newDate.getMinutes()).padStart(2, "0");
const hoursMinutes = `${hours}:${minutes}`;

const completedDate = `${yearMonthDate} ${hoursMinutes}`;

postCreated.innerHTML = completedDate;