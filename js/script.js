//Q1
let date = new Date();
let dayNum = date.getDay();
let dayList = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"]
let day = dayList[dayNum]
let hrs = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
if (hrs > 12) {
    amPm = "PM"
} else {
    amPm = "AM"
}
document.body.innerHTML = "<h1>Q1</h1><h2>Today is " + dayList[dayNum] + " and the time is " + (hrs-12) + ":" + min + " " + amPm + "</h2>"


//Q2
function help() {
    window.print();
}


//Q3
let dd = String(date.getDate()); 
let mm = String(date.getMonth());
let yyyy = String(date.getFullYear());
if (mm < 10) {
    mm = "0"+mm;
}
document.getElementById("printDate").innerHTML = "dd/mm/yyyy";
// console.log(dd)
// console.log(mm)
// console.log(yyyy)
