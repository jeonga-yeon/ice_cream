const search = window.location.search;
const params = new URLSearchParams(search);
const keyword = params.get("keyword");
const input = document.querySelector("input");

input.value = keyword