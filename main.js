const music = new Audio();
music.volume = 0.6;
music.src = "src/audio/music.mp3";
console.log("Кликните по экрану и музыка включится");
let ry = Math.random()*100+1;
function fi () {
    alert("Можно включить музыку, кликнув по экрану в любое место");
    localStorage.setItem("music", true)
}
if(ry > 80 && localStorage.getItem("music") == 'false') {
    fi ()
}
document.querySelector(".menu").addEventListener("click",()=>{document.location.href = "redact.html"})

document.addEventListener('click', pL)
document.addEventListener('scroll', pL)

function pL() {
    music.play()
}
setInterval(()=>{
    music.play()
},1000)
document.querySelector('.butt').addEventListener('click', ()=>{
    document.location.href = "main.html"
});
let rec = localStorage.getItem("best");
document.querySelector("#record").innerHTML = rec;

let date =  localStorage.getItem("yesteday");

document.querySelector('#reating').innerHTML = date;

localStorage.setItem('m', true)

