const container = document.querySelector(".container");
const slide = document.querySelector(".slide");
const images = document.querySelectorAll("img");

function paintBtn() {
    const prev = document.createElement("i");
    prev.className = "fas fa-chevron-left";
    const next = document.createElement("i");
    next.className = "fas fa-chevron-right";
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
    if(images) {
        window.onload = function () {
            imgResizing();
            paintBtn();
        }
    }
}