const treeSet1 = document.querySelectorAll('.trees .tree');
const treeSet2 = document.querySelectorAll('.trees2 .tree');
const distances = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));

//letter text 
// set up text to print, each item in array is new line
var aText = new Array(
    "Hello!",
    "Sorry for writing to you only now, but me and my lover decided to take a month-long vacation. We are kinda tired of city lights, so we decided to spend our time together in the countryside.",
    "",
    "With love, ",
    "your dear friend!"
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter() {
    sContents = '';
    iRow = Math.max(0, iIndex - iScrollAt);
    var destination = document.getElementById("typedtext");

    while (iRow < iIndex) {
        sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
    if (iTextPos++ == iArrLength) {
        iTextPos = 0;
        iIndex++;
        if (iIndex != aText.length) {
            iArrLength = aText[iIndex].length;
            setTimeout("typewriter()", 500);
        }
    } else {
        setTimeout("typewriter()", iSpeed);
    }
}


typewriter();

document.querySelector('.btn').addEventListener('click', function (e) {
    // window.location.href = 'localhost:3000/1';
    window.location.href = '/0';
}, false)


for (let tree in treeSet1) {
    treeSet1[tree].style.setProperty('--tree-distance', distances[tree] + '%');
    treeSet2[tree].style.setProperty('--tree-distance', distances[tree] + '%');
}





