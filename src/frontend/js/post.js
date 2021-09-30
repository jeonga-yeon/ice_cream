const contentList = document.querySelector(".content_list");
const videos = document.querySelectorAll(".video");
const images = document.querySelectorAll(".image");
const btnNext = document.querySelector(".btn_next");
const btnPrev = document.querySelector(".btn_prev");
const order = document.querySelector(".order");
const slideLength = videos.length + images.length;
const slideWidth = 400;
const slideSpeed = 300;

contentList.style.width = slideWidth * slideLength + "px";

let currentIndex = 0;



