const dateCreated = document.querySelectorAll(".date__created");

const dates = [];
const formattedDates = [];

function dateFormat(x) {
    const year = x.getFullYear();
    const month = x.getMonth() + 1;
    const date = x.getDate();
    const yearMonthDate = `${year}.${month}.${date}`;

    formattedDates.push(yearMonthDate);
}

for(let i = 0; i < dateCreated.length; i++) {
    dates[i] = new Date(dateCreated[i].innerText);
    dateFormat(dates[i]);
    dateCreated[i].innerHTML = formattedDates[i];
}