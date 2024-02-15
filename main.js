
document.querySelector('.butt').addEventListener('click', ()=>{
    document.location.href = "main.html"
});
document.querySelector("#record").innerHTML = localStorage.getItem("best");

let date =  localStorage.getItem("yesteday");

date === "" ? date = "Ничего...": document.querySelector('#reating').innerHTML = localStorage.getItem("yesteday");

localStorage.setItem('m', true)

