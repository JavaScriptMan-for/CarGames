
document.querySelector('.butt').addEventListener('click', ()=>{
    document.location.href = "main.html"
});
let rec = localStorage.getItem("best");
document.querySelector("#record").innerHTML = rec;

let date =  localStorage.getItem("yesteday");

document.querySelector('#reating').innerHTML = date;

localStorage.setItem('m', true)

