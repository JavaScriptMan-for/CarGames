var _a, _b;
var music = new Audio();
music.volume = 0.6;
music.src = "audio/music.mp3";
console.log("Кликните по экрану и музыка включится");
var ry = Math.random() * 100 + 1;
function fi() {
    alert("Можно включить музыку, кликнув по экрану в любое место");
    localStorage.setItem("music", 'true');
}
if (ry > 80 && localStorage.getItem("music") == 'false') {
    fi();
}
(_a = document.querySelector(".menu")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { document.location.href = "redact.html"; });
document.addEventListener('click', pL);
document.addEventListener('scroll', pL);
function pL() {
    music.play();
}
setInterval(function () {
    music.play();
}, 1000);
(_b = document.querySelector('.butt')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    document.location.href = "main.html";
});
var rec = localStorage.getItem("best");
var record = document.querySelector("#record");
record.innerHTML = String(rec);
var date = localStorage.getItem("yesteday");
var reating = document.querySelector('#reating');
reating.innerHTML = String(date);
localStorage.setItem('m', 'true');
