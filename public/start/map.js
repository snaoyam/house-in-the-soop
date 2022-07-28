// Find buttons & page
let popbutton = document.getElementById('popup');
let awaybutton = document.getElementById('close');
let popwindow = document.getElementById('popupwindow');

// Functions
let toggle = function () {
  popwindow.classList.toggle('pop-up');
  popwindow.classList.toggle('away');
  setTimeout(function () {
    popwindow.classList.toggle('out');
  }, 250);
}
// Event listeners
popbutton.addEventListener('click', toggle);
awaybutton.addEventListener('click', toggle);

document.querySelector('#card1').addEventListener('click', function (e) {
  window.location.href = '../1';
}, false)


document.querySelector('#card2').addEventListener('click', function (e) {
  window.location.href = '../3';
}, false)


document.querySelector('#card3').addEventListener('click', function (e) {
  window.location.href = '../2';
}, false)


document.querySelector('#card4').addEventListener('click', function (e) {
  window.location.href = '../4';
}, false)


document.querySelector('#card5').addEventListener('click', function (e) {
  window.location.href = '../5';
}, false)
