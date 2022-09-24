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
window.onload = function() {
    document.getElementById("printDate").innerHTML = dd + " / " + mm + " / " + yyyy;
}


//Q4
function calcArea() {
    let side1 = parseInt(document.getElementById("side1").value)
    let side2 = parseInt(document.getElementById("side2").value)
    let side3 = parseInt(document.getElementById("side3").value)
    let s = (side1 + side2 + side3) / 2
    let area = Math.sqrt(s * (s-side1) * (s-side2) * (s-side3));
    document.getElementById("printArea").innerHTML = "The area of the Triangle is " + area;
}
function q4(){
    let side1 = String(document.getElementById("side1").value)
    let side2 = String(document.getElementById("side2").value)
    let side3 = String(document.getElementById("side3").value)
    document.getElementById("printDim").innerHTML = "The sides of the Triangle are " + side1 + ", " + side2 + " and " + side3;
    calcArea();
}
function clrQ4() {
    document.getElementById("printDim").innerHTML = "";
    document.getElementById("printArea").innerHTML = "";
}

