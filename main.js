const music = new Audio();
music.src = "src/audio/music.mp3";
console.log("Кликните по экрану и музыка включится");
let ry = Math.random()*100+1;
function fi () {
    alert("Можно включить музыку, кликнув по экрану в любое место");
    localStorage.setItem("b", true)
}
if(ry > 80 && localStorage.getItem("b") == 'false') {
    fi ()

}

document.addEventListener('click', pL)
document.addEventListener('scroll', pL)

function pL() {
    music.play()
}
document.querySelector('.butt').addEventListener('click', ()=>{
    document.location.href = "main.html"
});
let rec = localStorage.getItem("best");
document.querySelector("#record").innerHTML = rec;

let date =  localStorage.getItem("yesteday");

document.querySelector('#reating').innerHTML = date;

localStorage.setItem('m', true)

