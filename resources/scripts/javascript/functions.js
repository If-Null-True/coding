"use strict";
function getDateString(date) {
    let dateString;
    let today = new Date();
    let currentDate = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
    };
    if (currentDate.year === date.year && currentDate.month === date.month && currentDate.day === date.day)
        return "Today";
    let yesterday = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24);
    let yesterDate = {
        year: yesterday.getFullYear(),
        month: yesterday.getMonth() + 1,
        day: yesterday.getDate()
    };
    if (yesterDate.year === date.year && yesterDate.month === date.month && yesterDate.day === date.day)
        return "Yesterday";
    if (!date.year || !date.month || !date.day)
        return false;
    if (date.year === 0)
        return false;
    if (date.month > 12 || date.month < 1)
        return false;
    let longMonths = [1, 3, 5, 7, 8, 10, 12];
    if (date.day > ((longMonths.includes(date.month)) ? 31 : 30) || date.day < 1)
        return false;
    if (date.month === 2 && date.day > ((date.year % 4 === 0) ? 29 : 28))
        return false;
    if (date.day === 11 || date.day === 12)
        dateString = date.day + "th of ";
    else if (String(date.day).endsWith("1"))
        dateString = date.day + "st of ";
    else if (String(date.day).endsWith("2"))
        dateString = date.day + "nd of ";
    else if (String(date.day).endsWith("3"))
        dateString = date.day + "rd of ";
    else
        dateString = date.day + "th of ";
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    dateString += months[Math.floor(date.month) - 1];
    if (date.year < 1)
        dateString += ", " + -date.year + " BCE";
    else
        dateString += ", " + date.year;
    return dateString;
}
function getSessionString(session) {
    return `<span class="session">Term ${session.term}, Week ${session.week}</span>`;
}
function urlParams(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
        .exec(window.location.search);
    return (results !== null) ? results[1] || 0 : false;
}
