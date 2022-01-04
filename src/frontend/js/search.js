const search = window.location.search;
const params = new URLSearchParams(search);
const keyword = params.get("keyword");
const input = document.querySelector("input");
const searchResults = document.querySelector(".search__results");
const notFound = document.querySelector(".search__results .not_found");

input.value = keyword

if(!keyword) {
    notFound.remove();
    const span = document.createElement("span");
    span.className = "not_found";
    span.innerText = "검색어를 입력하세요."
    searchResults.appendChild(span);
}