const container = document.querySelector(".container");
const slide = document.querySelector(".slide");
const images = document.querySelectorAll("img");
const videos = document.querySelectorAll("video");
let curPosition = 0;
let position = 0;

function clickPrev(files, prev, next) {
    if(curPosition > 0) {
        next.removeAttribute("disabled");
        position += files[0][curPosition].width;
        files[0][curPosition].style.transform = `translateX(${position}px)`;
        curPosition = curPosition - 1;
    }
    if(curPosition == 0) {
        prev.setAttribute("disabled", "true");
    }
}

function clickNext(files, prev, next) {
    if(curPosition < files[0].length) {
        prev.removeAttribute("disabled");
        position -= files[0][curPosition].width;
        files[0][curPosition].style.transform = `translateX(${position}px)`;
        curPosition = curPosition + 1;
    }
    if(curPosition == files[0].length) {
        next.setAttribute("disabled", "true");
    }
}

function paintBtn() {
    const prev = document.createElement("i");
    prev.className = "fas fa-chevron-left button prev";
    const next = document.createElement("i");
    next.className = "fas fa-chevron-right button next";
    container.appendChild(prev);
    container.appendChild(next);
}

function showSlides() {
    
}

function imgResizing () {
    for(let i = 0; i < images.length; i++) {
        const width = images[i].width;
        const height = images[i].height;

        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 600;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        images[i].width = width;
        images[i].height = height;
    }
}

if(slide) {
    if(images || videos) {
        window.onload = function () {
            imgResizing();
            paintBtn();

            const imgs = document.querySelectorAll("img");
            const allVideos = document.querySelectorAll("video");
            const files = [];
            if(imgs) {
                files.push(imgs);
            }
            if(allVideos) {
                files.push(allVideos);
            }

            const prev = document.querySelector("i.prev");
            const next = document.querySelector("i.next");

            showSlides(files);

            prev.addEventListener("click", function() {clickPrev(files, prev, next)});
            next.addEventListener("click", function() {clickNext(files, prev, next)});
        }
    }
}