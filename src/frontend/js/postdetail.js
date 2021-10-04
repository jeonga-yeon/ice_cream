const container = document.querySelector(".container");
const slide = document.querySelectorAll(".slide");
const btnWrap = document.querySelector(".btn_wrap");

function paintDot() {
    for(let i = 0; i < slide.length; i++) {
        const dot = document.createElement("i");
        dot.className = "fas fa-circle dot";
        dot.id = i;
        btnWrap.appendChild(dot);
    }
    dot.addEventListener("click", function() {
        
    });
}

if(slide) {
    paintDot();
}