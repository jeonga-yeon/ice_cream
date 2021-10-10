const container = document.querySelector(".container");
const slide = document.querySelectorAll(".slide");
const images = document.querySelectorAll("img");
const videos = document.querySelectorAll("video");

console.log(videos);

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

function videoResizing() {
    for(let i = 0; i < videos.length; i++) {
        const width = videos[i].videoWidth;
        const height = videos[i].videoHeight;

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

        videos[i].videoWidth = width;
        videos[i].videoHeight = height;
    }
}

if(slide) {
    if(images) {
        imgResizing();
    }
    if(videos) {
        videoResizing();
    }
}