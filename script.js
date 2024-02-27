/*Раздел - начало*/ 
let made = true;
document.querySelector("#pauseWind").close()
if(localStorage.getItem("conf") == "true") {
    document.location.href = "index.html";
    localStorage.setItem("conf", "false")
}
let int = false; //Переменная для того, чтобы функция funct выполнялась один раз при загрузке страницы 
function funct () {
    if(int === false) {
    int = true;
    //Стили
 document.querySelector("#play").style.cssText = `opacity: 0`
document.querySelector(".flex").style.cssText = `opacity: 1`
document.querySelector('#pause').style.cssText = `opacity: 1`
document.querySelector('#pauseWind').style.cssText = `opacity: 1`
    //Получение канваса и ctx
const canvs = document.querySelector('#canvas');
const ctx = canvs.getContext("2d");
canvs.style.bottom = 0;
let isAsert = 0;

//Создание переменных для подсчёта очков, лучшего результата и скорости машины

let animCadr = 0.1;
let score = 0;
let mainScore = localStorage.getItem("best");



//Выведение счёта на экран

document.querySelector('#score').innerHTML = "Счёт: " + score;

//Объявление переменных, в которых хранятся картинки и аудиофайлы

const backround = new Image();
const car = new Image();
const zabor = new Image();
const zabor_2 = new Image();
const stone = new Image();
const spike = new Image();
const darkstone = new Image();
const tree = new Image();

const breakcar = new Audio();
const rotate = new Audio();
const run = new Audio();
const scored = new Audio();
const bib = new Audio();

let m = localStorage.getItem("m")
let sRc = "src/img/car.png";
if(m == 'false') {
    sRc = localStorage.getItem("car")
}

//Рандом препятствий

let barriers = [zabor,zabor_2,stone, spike, darkstone, tree];
let randBarr;
let rand = barriers[Math.floor(Math.random()*6)];
setInterval(()=>{
    if(isAsert % 2 == 0) {
        randBarr = barriers[Math.floor(Math.random()*6)];
    }
},10)

//Объявления пути для файлов игры

backround.src = "src/img/back.png";
car.src = sRc;
zabor.src = "src/img/zabor.png";
zabor_2.src = "src/img/zabor_2.png";
stone.src = "src/img/stone.png";
spike.src = "src/img/spike.png";
darkstone.src = "src/img/darkstone.png";
tree.src = "src/img/tree.png";

breakcar.src = "src/audio/breack.mp3";
run.src = "src/audio/run.mp3";
rotate.src = "src/audio/rotate.mp3";
scored.src = "src/audio/scored.mp3";
bib.src = "src/audio/bib.mp3";

//Проигрывание звука гуда машины

run.volume = 1;
run.play(); 
setInterval(()=> {
    run.volume = 0.8;
    run.play(); 
},500)

//Создание класса, на основе которого будут описанны координаты всех игровых объектов

class GameObject {
    constructor(x,y,name) {
        this.x = x;
        this.y = y;
        this.nane = name
    }
 get info () {
    return this.name + " - игровой объект"
 }
 set info (value) {
    console.error('Невозможно изменить данные игрового объекта. Вы изменили ' + value)
 }
}
//Для рандомизации появления препятствий

let xPos = [137,110,164].reverse();
let xPos2 = [110,136,164];

//Создание объектов на основе класса, на основе которого будут описанны их координаты 

let barrier = new GameObject(xPos[Math.floor(Math.random()*3)],20,'barrier');
let barrier_2 = new GameObject(xPos2[Math.floor(Math.random()*3)],20,'barrier_2')
let carObj = new GameObject(137,110, 'car');
let back = new GameObject(100,0,'backround');
let back_2 = new GameObject(100,0,'backround');

//Прорисовка всех картинок 

let game = setInterval(()=>{
    ctx.drawImage(backround,back.x,back.y, 100, 150);
    ctx.drawImage(backround,back_2.x,back_2.y, 100, 150);
    ctx.drawImage(car, carObj.x,carObj.y, 25,40);
    ctx.drawImage(rand, barrier.x, barrier.y, 25,20);
    ctx.drawImage(rand,barrier_2.x,barrier_2.y,25,20);
    //Если препятствие проехали, то появляется новое
    if(barrier.y > 144) {
        barrier.x =  xPos[Math.floor(Math.random()*3)];
        barrier.y = 20;
        barrier_2.y = 20;
        scored.play();
        isAsert++
        rand = randBarr;
        score++;
        localStorage.setItem("yesteday", score)
        document.querySelector('#score').innerHTML = "Счёт: " + score;
    }
},1);

/*Раздел - механика игры*/
// Для иметации движения машины
let promise = new Promise((resolve,reject)=>{
    let backAnim = setInterval(()=>{
         back_2.y+=30;
         setTimeout(()=>{
             back_2.y-=30;
         })
     },1)
    let err = new Error('Бред')
     resolve(backAnim);
     reject(err)
 }) 
  promise.then((onResolve, onReject) => {
     console.log(onReject);
     console.log(onResolve);
     return onResolve; 
 })  

  let barr =  setInterval(()=>{
        barrier.y += animCadr;
        barrier_2.y += animCadr;
        if(score % 10 === 0) {
            //Увеличение скорости по мере роста счёта.
            animCadr += 0.002
        }
        localStorage.setItem("speed", animCadr)
        if(score > mainScore || localStorage.getItem("yesteday") < score) {
            mainScore = score;
            localStorage.setItem("best",mainScore)
        }
    },10);
    
    //Добавление управления

  document.addEventListener('keydown',key);
  function key(e) {
    if(e.keyCode == 37 || e.keyCode == 65) {
            //влево
            rotate.play()
            carObj.x -= 27;
        if(carObj.x !== 110 && carObj.x !== 137 ) {gameOver()}
    }
    if(e.keyCode == 39 || e.keyCode == 68) {
        //вправо
        rotate.play()
        carObj.x += 27;
        if( carObj.x !== 137 && carObj.x !== 164) {gameOver()}
    }
    if(e.keyCode == 69) {
        bib.play()
    }
    if(e.keyCode == 27) {
        run.pause();
        pause()
    }
    if(e.keyCode == 82) {
        run.pause();
        let config = confirm("Хотите отредактировать машину? Игра перезапустится!");
        if(config === true) {
            document.location.href = "redact.html";
        } else {
            console.log("Возвращение в игру")
        }
    }
  }

  //Функция для определения умер игрок или нет

let findDead = setInterval(()=>{
    if(carObj.x === 110 && barrier.x === 110 && barrier.y >= 92) {
        gameOver();
    }
    if(carObj.x == 137 && barrier.x === 137 && barrier.y >= 92) {
        gameOver();
    }
    if(carObj.x == 164 && barrier.x === 164 && barrier.y >= 92) {
        gameOver();
    }
    if(carObj.x === 110 && barrier_2.x === 110 && barrier_2.y >= 92) {
        gameOver();
    }
    if(carObj.x === 137 && barrier_2.x === 137 && barrier_2.y >= 92) {
        gameOver();
    }
    if(carObj.x === 164 && barrier_2.x === 164 && barrier_2.y >= 92) {
        gameOver();
    }
},0.1)

    //Функция окончания игры

  function gameOver() {
    run.pause();
    rotate.pause();
    breakcar.play();
    clearInterval(game);
    clearInterval(findDead);
    localStorage.setItem("yesteday", score);
   let conf =  window.confirm("Вы проиграли! Переходите в главное меню?");
   localStorage.setItem("conf", conf);
    document.location.reload();
  }

    //Управление для телефонов

    document.querySelector('#left').addEventListener('click', left);
    document.querySelector('#right').addEventListener('click', right);
    document.querySelector('#bib').addEventListener('click', bibo);
    document.querySelector('#pause').addEventListener('click', pause);
    //Поворот влево
    function left() {
        rotate.play()
        carObj.x -= 27;
    if(carObj.x !== 110 && carObj.x !== 137 ) {gameOver()}
      }
      //Поворот вправо
      function right () {
        rotate.play();
        carObj.x += 27;
        if( carObj.x !== 137 && carObj.x !== 164) {gameOver()}
      }
      //Гудок
      function bibo() {
        bib.play();
      }
      //Поставить игру на паузу
    async   function pause() {
        document.querySelector(".flex").style.cssText = `opacity: 0`
    document.querySelector('#pause').style.cssText = `opacity: 0`
        run.pause() 
        
       await  document.querySelector('#pauseWind').show();
        document.querySelector('#pauseWind').style.cssText = `opacity: 1`
       clearInterval(barr)
       
       await setTimeout(() => {
          document.querySelector('#pauseWind').close();
          if(made) {
            setInterval(()=>{
                barrier.y += animCadr;
                barrier_2.y += animCadr;
                if(score % 10 === 0) {
                    //Увеличение скорости по мере роста счёта.
                    animCadr += 0.002
                    localStorage.setItem("speed", animCadr)
                }
                if(score > mainScore || localStorage.getItem("yesteday") < score) {
                    mainScore = score;
                    localStorage.setItem("best",mainScore)
                }
            },10);
            made = false
            document.querySelector(".flex").style.cssText = `opacity: 1`
            document.querySelector('#pause').style.cssText = `opacity: 1`
          }
       }, 3000); 

       document.querySelector("#close").addEventListener('click', ()=>{
            document.querySelector('#pauseWind').close();
       })
    
            
           
        
           
       
          
      }
   }
    }
