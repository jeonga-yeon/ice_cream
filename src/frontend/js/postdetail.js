const container = document.querySelector(".container");
const slideWrap = document.querySelector(".slide_wrap");
const slide = document.querySelector(".slide");
const images = document.querySelectorAll("img");
const videos = document.querySelectorAll("video");
let curPosition = 0;
let position = 0;

function clickPrev(files, prev, next) {
    if(curPosition > 0) {
        next.removeAttribute("disabled", true);
        position += files[0][curPosition-1].width;
        container.style.width = files[0][curPosition - 1].width + 'px';
        slideWrap.style.width = files[0][curPosition - 1].width + 'px';
        for(let i = 0; i <= files.length; i++) {
            files[0][i].style.transform = `translateX(${position}px)`;
        }
        curPosition = curPosition - 1;
    }
    if(curPosition == 0) {
        prev.setAttribute("disabled", true);
    }
}

function clickNext(files, prev, next) {
    if(curPosition < files.length) {
        prev.removeAttribute("disabled", true);
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
            if(files[i].className === "img") {
                files[i].style.transform = `translateX(${position}px)`;
            } else {
                files[i].style.transform = `translateX(${position}px)`;
            }
        }
        curPosition = curPosition + 1;
    }
    if(curPosition == files.length) {
        next.setAttribute("disabled", true);
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

            const prev = document.querySelector("i.prev");
            const next = document.querySelector("i.next");
            
            prev.addEventListener("click", function() {clickPrev(files, prev, next)});
            next.addEventListener("click", function() {clickNext(files, prev, next)});
        }
    }
}