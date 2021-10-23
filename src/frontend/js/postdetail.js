const container = document.querySelector(".container");
const slideWrap = document.querySelector(".slide_wrap");
const slide = document.querySelector(".slide");
const images = document.querySelectorAll("img");
const videos = document.querySelectorAll("video");
let curPosition = 0;
let position = 0;

function clickPrev(files, prev, next) {
    if(curPosition > 0) {
        next.classList.remove("stop");
        if(files[curPosition].className === "img") {
            position += files[curPosition-1].width;
        } else {
            position += files[curPosition-1].clientWidth;
        }
        if(files[curPosition - 1].className === "img") {
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
    if(curPosition < files.length) {
        prev.classList.remove("stop");
        if(files[curPosition].className === "img") {
            position -= files[curPosition].width;
        } else {
            position -= files[curPosition].clientWidth;
        }
        if(files[curPosition + 1].className === "img") {
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
        images[i].style.maxHeight = 500;
        images[i].style.width = "auto";
    }
}

if(slide) {
    if(images || videos) {
        window.onload = function () {
            imgResizing();
            paintBtn();

            const imgs = document.querySelectorAll("img");
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

            if(files[0].className === "img") {
                container.style.width = files[0].width + 'px';
                slideWrap.style.width = files[0].width + 'px';
            } else {
                container.style.width = files[0].clientWidth + 'px';
                slideWrap.style.width = files[0].clientWidth + 'px';
            }

            container.style.visibility = "visible";

            const prev = document.querySelector("i.prev");
            const next = document.querySelector("i.next");

            prev.classList.add("stop");
            
            prev.addEventListener("click", function() {clickPrev(files, prev, next)});
            next.addEventListener("click", function() {clickNext(files, prev, next)});
        }
    }
}